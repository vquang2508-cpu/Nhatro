import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
    const [listings, setListings] = useState([]);
    const [loading, setLoading] = useState(true);
    const { logout } = useAuth();

    useEffect(() => {
        fetchListings();
    }, []);

    const fetchListings = async () => {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('listings')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            setListings(data || []);
        } catch (error) {
            console.error('Error fetching listings:', error);
        } finally {
            setLoading(false);
        }
    };

    const toggleVisibility = async (id, currentStatus) => {
        try {
            const { error } = await supabase
                .from('listings')
                .update({ is_visible: !currentStatus })
                .eq('id', id);

            if (error) throw error;

            // Update local state
            setListings(listings.map(item =>
                item.id === id ? { ...item, is_visible: !currentStatus } : item
            ));
        } catch (error) {
            console.error('Error updating visibility:', error);
            alert('Có lỗi xảy ra khi cập nhật trạng thái.');
        }
    };

    const getThumbnail = (imageString) => {
        if (!imageString) return 'https://via.placeholder.com/100?text=No+Image';
        return imageString.split('\n')[0].trim();
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="bg-white shadow">
                <div className="container-custom py-6 flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-gray-900">Quản trị hệ thống</h1>
                    <div className="flex items-center space-x-4">
                        <Link to="/" className="text-gray-600 hover:text-blue-600">Xem trang chủ</Link>
                        <button
                            onClick={logout}
                            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                        >
                            Đăng xuất
                        </button>
                    </div>
                </div>
            </div>

            <div className="container-custom py-10">
                <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                    <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
                        <div>
                            <h3 className="text-lg leading-6 font-medium text-gray-900">
                                Danh sách tin đăng
                            </h3>
                            <p className="mt-1 max-w-2xl text-sm text-gray-500">
                                Quản lý hiển thị tin đăng trên hệ thống.
                            </p>
                        </div>
                        <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                            Tổng: {listings.length} tin
                        </span>
                    </div>

                    <div className="border-t border-gray-200">
                        {loading ? (
                            <div className="p-10 text-center">
                                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-600 mx-auto"></div>
                                <p className="mt-2 text-gray-500">Đang tải dữ liệu...</p>
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Tin đăng
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Giá / Diện tích
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Người đăng
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Trạng thái
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Hành động
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {listings.map((listing) => (
                                            <tr key={listing.id} className="hover:bg-gray-50">
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center">
                                                        <div className="flex-shrink-0 h-10 w-10">
                                                            <img
                                                                className="h-10 w-10 rounded object-cover"
                                                                src={getThumbnail(listing.image_0)}
                                                                alt=""
                                                                onError={(e) => { e.target.src = 'https://via.placeholder.com/100?text=Error'; }}
                                                            />
                                                        </div>
                                                        <div className="ml-4">
                                                            <div className="text-sm font-medium text-gray-900 line-clamp-1 max-w-xs" title={listing.title}>
                                                                {listing.title}
                                                            </div>
                                                            <div className="text-sm text-gray-500 line-clamp-1 max-w-xs">
                                                                {listing.address}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-900">{listing.price}</div>
                                                    <div className="text-sm text-gray-500">{listing.area}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-900">{listing['Tên chủ']}</div>
                                                    <div className="text-sm text-gray-500">{listing['SĐT']}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${listing.is_visible
                                                        ? 'bg-green-100 text-green-800'
                                                        : 'bg-gray-100 text-gray-800'
                                                        }`}>
                                                        {listing.is_visible ? 'Đang hiện' : 'Đã ẩn'}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                    <button
                                                        onClick={() => toggleVisibility(listing.id, listing.is_visible)}
                                                        className={`text-indigo-600 hover:text-indigo-900 font-medium ${listing.is_visible ? 'text-red-600 hover:text-red-900' : 'text-green-600 hover:text-green-900'
                                                            }`}
                                                    >
                                                        {listing.is_visible ? 'Ẩn tin' : 'Hiện tin'}
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
