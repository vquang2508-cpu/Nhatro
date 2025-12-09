
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '../../');

// Load env vars
dotenv.config({ path: path.join(projectRoot, '.env.local') });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
    console.error('Missing Supabase credentials');
    console.error('URL:', supabaseUrl ? 'Set' : 'Missing');
    console.error('Key:', supabaseAnonKey ? 'Set' : 'Missing');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);
const teamImagesDir = path.join(projectRoot, 'src/Team_Images');

async function getImagesToUpload() {
    const images = [];

    // 1. Scan src/Team_Images
    if (fs.existsSync(teamImagesDir)) {
        const files = fs.readdirSync(teamImagesDir);
        files.forEach(file => {
            // Check for Invisible_Name.png pattern
            if (file.startsWith('Invisible_') && file.toLowerCase().endsWith('.png')) {
                // Extract name: Invisible_An.png -> An
                const namePart = file.slice(10, -4);
                const name = namePart.charAt(0).toUpperCase() + namePart.slice(1);

                console.log(`Found teammate image: ${name} from ${file}`);

                images.push({
                    name: name,
                    file: path.join(teamImagesDir, file),
                    mime: 'image/png'
                });
            }
        });
    } else {
        console.warn(`Directory not found: ${teamImagesDir}`);
    }

    // 2. Add Tho (Manual fallback)
    const thoFile = path.join(projectRoot, 'src/assets/team/nguyenphuoctho.png');
    if (fs.existsSync(thoFile)) {
        images.push({
            name: 'Tho',
            file: thoFile,
            mime: 'image/png'
        });
    }

    return images;
}

async function uploadImages() {
    console.log('Starting dynamic image upload...');
    const images = await getImagesToUpload();

    if (images.length === 0) {
        console.log('No images found to upload.');
        return;
    }

    for (const img of images) {
        try {
            console.log(`Processing ${img.name}...`);
            const fileBuffer = fs.readFileSync(img.file);
            const base64Data = fileBuffer.toString('base64');

            // Upsert to DB
            const { data, error } = await supabase
                .from('team_images')
                .upsert({
                    name: img.name,
                    mime_type: img.mime,
                    image_data: base64Data
                }, { onConflict: 'name' });

            if (error) {
                console.error(`Error uploading ${img.name}:`, error);
            } else {
                console.log(`Successfully uploaded ${img.name}`);
            }

        } catch (err) {
            console.error(`Unexpected error for ${img.name}:`, err);
        }
    }
    console.log('Upload complete.');
}

uploadImages();
