import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import { useAuth } from '../context/AuthContext';
import LoadingSkeleton from '../components/LoadingSkeleton';

const EditListing = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        price_num: '',
        area_num: '',
        city: 'Hồ Chí Minh',
        district: '',
        address: '',
        room_count: '',
        description: '',
        image_0: '',
        image_1: '',
        image_2: '',
        image_3: '',
        contact_name: '',
        contact_phone: ''
    });

    useEffect(() => {
        fetchListing();
    }, [id, user]);

    const fetchListing = async () => {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('listings')
                .select('*')
                .eq('id', id)
                .single();

            if (error) throw error;

            // Verify ownership
            if (data.user_id !== user.id) {
                alert('Bạn không có quyền chỉnh sửa tin này.');
                navigate('/my-listings');
                return;
            }

            // Parse images
            const images = (data.image_0 || '').split('\n');

            setFormData({
                title: data.title || '',
                price_num: data.price_num || '',
                area_num: data.area_num || '',
                city: data.city || 'Hồ Chí Minh',
                district: data.district || '',
                address: data.address || '',
                room_count: data.room_count ? data.room_count.replace(' phòng', '') : '',
                description: data.description || '',
                image_0: images[0] || '',
                image_1: images[1] || '',
                image_2: images[2] || '',
                image_3: images[3] || '',
                contact_name: data['Tên chủ'] || '',
                contact_phone: data['SĐT'] || ''
            });
        } catch (error) {
            console.error('Error fetching listing:', error);
            alert('Không tìm thấy tin đăng.');
            navigate('/my-listings');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const formatPrice = (price) => {
        if (!price) return '';
        if (price >= 1000000) {
            return `${(price / 1000000).toFixed(1).replace('.0', '')} triệu/tháng`;
        }
        return `${(price / 1000).toFixed(0)}k/tháng`;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            // Auto-format fields
            const priceText = formatPrice(parseFloat(formData.price_num));
            const areaText = `${formData.area_num}m2`;

            // Combine images into one string (newline separated)
            const images = [
                formData.image_0,
                formData.image_1,
                formData.image_2,
                formData.image_3
            ].filter(Boolean).join('\n');

            // Prepare data for update
            const listingData = {
                title: formData.title,
                price: priceText,
                price_num: parseFloat(formData.price_num),
                area: areaText,
                area_num: parseFloat(formData.area_num),
                city: formData.city,
                district: formData.district,
                address: formData.address,
                room_count: `${formData.room_count} phòng`,
                description: formData.description,
                image_0: images,
                'Tên chủ': formData.contact_name,
                'SĐT': formData.contact_phone,
                is_visible: false, // Reset to hidden on update
                updated_at: new Date().toISOString()
            };

            const { error } = await supabase
                .from('listings')
                .update(listingData)
                .eq('id', id);

            if (error) throw error;

            alert('Tin đăng đã được cập nhật và đang chờ duyệt lại!');
            navigate('/my-listings');
        } catch (error) {
            console.error('Error updating listing:', error);
            alert('Có lỗi xảy ra khi cập nhật. Vui lòng thử lại.');
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="container-custom py-10">
                <LoadingSkeleton />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-10">
            <div className="container-custom max-w-3xl">
                <div className="bg-white rounded-2xl shadow-sm p-8">
                    <h1 className="text-2xl font-bold text-gray-900 mb-6">Chỉnh sửa tin đăng</h1>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Basic Info */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Thông tin cơ bản</h3>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Tiêu đề tin *</label>
                                <input
                                    type="text"
                                    name="title"
                                    required
                                    value={formData.title}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Giá (VNĐ) *</label>
                                    <input
                                        type="number"
                                        name="price_num"
                                        required
                                        value={formData.price_num}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Diện tích (m2) *</label>
                                    <input
                                        type="number"
                                        name="area_num"
                                        required
                                        value={formData.area_num}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Số phòng trống *</label>
                                    <input
                                        type="number"
                                        name="room_count"
                                        required
                                        value={formData.room_count}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Location */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Địa chỉ</h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Thành phố</label>
                                    <input
                                        type="text"
                                        name="city"
                                        value={formData.city}
                                        readOnly
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Quận / Huyện *</label>
                                    <input
                                        type="text"
                                        name="district"
                                        required
                                        value={formData.district}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Địa chỉ chi tiết *</label>
                                <input
                                    type="text"
                                    name="address"
                                    required
                                    value={formData.address}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                        </div>

                        {/* Description & Images */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Hình ảnh & Mô tả</h3>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Mô tả chi tiết</label>
                                <textarea
                                    name="description"
                                    rows="5"
                                    value={formData.description}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                ></textarea>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Link hình ảnh (URL) *</label>
                                <div className="space-y-2">
                                    <input
                                        type="text"
                                        name="image_0"
                                        required
                                        value={formData.image_0}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="Link hình ảnh chính..."
                                    />
                                    <input
                                        type="text"
                                        name="image_1"
                                        value={formData.image_1}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                    />
                                    <input
                                        type="text"
                                        name="image_2"
                                        value={formData.image_2}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                    />
                                    <input
                                        type="text"
                                        name="image_3"
                                        value={formData.image_3}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Contact Info */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Thông tin liên hệ</h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Tên liên hệ *</label>
                                    <input
                                        type="text"
                                        name="contact_name"
                                        required
                                        value={formData.contact_name}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Số điện thoại *</label>
                                    <input
                                        type="text"
                                        name="contact_phone"
                                        required
                                        value={formData.contact_phone}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="pt-4">
                            <button
                                type="submit"
                                disabled={submitting}
                                className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition-colors duration-200 shadow-lg disabled:opacity-50"
                            >
                                {submitting ? 'Đang xử lý...' : 'Cập Nhật Tin'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditListing;
