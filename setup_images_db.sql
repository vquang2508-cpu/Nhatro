-- Create the table for storing base64 images
CREATE TABLE IF NOT EXISTS team_images (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL UNIQUE, -- 'An', 'Quang', 'Linh', 'Triet', 'Tho'
    mime_type TEXT NOT NULL,
    image_data TEXT NOT NULL
);

-- Enable RLS
ALTER TABLE team_images ENABLE ROW LEVEL SECURITY;

-- Allow public read access (so anyone can see the About page)
CREATE POLICY "Allow public read access" ON team_images FOR SELECT USING (true);

-- Allow public insert access (TEMPORARY: for the migration script to work)
-- You can disable this after the migration is complete.
CREATE POLICY "Allow public insert/update access" ON team_images FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update access" ON team_images FOR UPDATE USING (true);
