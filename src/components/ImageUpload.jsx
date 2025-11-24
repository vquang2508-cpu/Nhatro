import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useAuth } from '../context/AuthContext';

const ImageUpload = ({ value, onChange, label, required = false }) => {
    const { user } = useAuth();
    const [uploading, setUploading] = useState(false);
    const [uploadMethod, setUploadMethod] = useState('url'); // 'url' or 'file'
    const [urlInput, setUrlInput] = useState(value || '');
    const [preview, setPreview] = useState(value || '');

    const handleFileUpload = async (e) => {
        try {
            const file = e.target.files?.[0];
            if (!file) return;

            // Validate file type
            if (!file.type.startsWith('image/')) {
                alert('Vui lòng chọn file hình ảnh!');
                return;
            }

            // Validate file size (max 5MB)
            if (file.size > 5 * 1024 * 1024) {
                alert('Kích thước file không được vượt quá 5MB!');
                return;
            }

            setUploading(true);

            // Create unique filename
            const fileExt = file.name.split('.').pop();
            const fileName = `${user.id}/${Date.now()}.${fileExt}`;

            // Upload to Supabase Storage
            const { data, error } = await supabase.storage
                .from('listing-images')
                .upload(fileName, file);

            if (error) throw error;

            // Get public URL
            const { data: { publicUrl } } = supabase.storage
                .from('listing-images')
                .getPublicUrl(data.path);

            setPreview(publicUrl);
            onChange(publicUrl);
        } catch (error) {
            console.error('Error uploading file:', error);
            alert(`Lỗi tải lên: ${error.message}`);
        } finally {
            setUploading(false);
        }
    };

    const handleUrlChange = (e) => {
        const url = e.target.value;
        setUrlInput(url);
        setPreview(url);
        onChange(url);
    };

    const handleClear = () => {
        setUrlInput('');
        setPreview('');
        onChange('');
    };

    return (
        <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
                {label} {required && <span className="text-red-500">*</span>}
            </label>

            {/* Upload Method Toggle */}
            <div className="flex gap-2 mb-2">
                <button
                    type="button"
                    onClick={() => setUploadMethod('url')}
                    className={`px-3 py-1 text-sm rounded ${uploadMethod === 'url'
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-200 text-gray-700'
                        }`}
                >
                    URL
                </button>
                <button
                    type="button"
                    onClick={() => setUploadMethod('file')}
                    className={`px-3 py-1 text-sm rounded ${uploadMethod === 'file'
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-200 text-gray-700'
                        }`}
                >
                    Tải lên file
                </button>
            </div>

            {/* URL Input */}
            {uploadMethod === 'url' && (
                <input
                    type="text"
                    value={urlInput}
                    onChange={handleUrlChange}
                    required={required && !preview}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Nhập URL hình ảnh..."
                />
            )}

            {/* File Upload */}
            {uploadMethod === 'file' && (
                <div className="flex items-center gap-2">
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileUpload}
                        disabled={uploading}
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    />
                    {uploading && (
                        <span className="text-sm text-gray-500">Đang tải...</span>
                    )}
                </div>
            )}

            {/* Preview */}
            {preview && (
                <div className="relative mt-2">
                    <img
                        src={preview}
                        alt="Preview"
                        className="w-full h-32 object-cover rounded-lg border border-gray-300"
                        onError={(e) => {
                            e.target.src = 'https://via.placeholder.com/400x200?text=Invalid+Image';
                        }}
                    />
                    <button
                        type="button"
                        onClick={handleClear}
                        className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-xs hover:bg-red-600"
                    >
                        Xóa
                    </button>
                </div>
            )}
        </div>
    );
};

export default ImageUpload;
