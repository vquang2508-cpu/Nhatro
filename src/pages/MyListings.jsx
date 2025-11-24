import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import { useAuth } from '../context/AuthContext';

const MyListings = () => {
    const { user } = useAuth();
    const [listings, setListings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user) {
            fetchMyListings();
        }
    }, [user]);

    const fetchMyListings = async () => {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('listings')
                .select('*')
                .eq('user_id', user.id)
                .order('created_at', { ascending: false });

            if (error) throw error;
            setListings(data || []);
        } catch (error) {
            console.error('Error fetching my listings:', error);
        } finally {
            setLoading(false);
        }
    };

    const getThumbnail = (imageString) => {
        if (!imageString) return 'https://via.placeholder.com/100?text=No+Image';
        return imageString.split('\n')[0].trim();
    };

    return (
        <div className="min-h-screen bg-gray-50 py-10">
            <div className="container-custom">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-2xl font-bold text-gray-900">Quản lý tin đăng</h1>
                    <Link
                        to="/create-listing"
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium shadow-sm"
                    >
                        Đăng tin mới
                    </Link>
                </div>

                <div className="bg-white shadow overflow-hidden sm:rounded-md">
                    {loading ? (
                        <div className="flex justify-center py-10">
                            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-600"></div>
                        </div>
                    ) : listings.length > 0 ? (
                        <ul className="divide-y divide-gray-200">
                            {listings.map((listing) => (
                                <li key={listing.id}>
                                    <div className="px-4 py-4 sm:px-6">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center flex-1 min-w-0">
                                                <div className="flex-shrink-0 h-16 w-16">
                                                    <img
                                                        className="h-16 w-16 rounded object-cover"
                                                        src={getThumbnail(listing.image_0)}
                                                        alt=""
                                                        onError={(e) => { e.target.src = 'https://via.placeholder.com/100?text=Error'; }}
                                                    />
                                                </div>
                                                <div className="ml-4 flex-1 min-w-0">
                                                    <div className="flex items-center justify-between">
                                                        <p className="text-sm font-medium text-blue-600 truncate">{listing.title}</p>
                                                        <div className="ml-2 flex-shrink-0 flex">
                                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${listing.is_visible
                                                                ? 'bg-green-100 text-green-800'
                                                                : 'bg-yellow-100 text-yellow-800'
                                                                }`}>
                                                                {listing.is_visible ? 'Đang hiển thị' : 'Chờ duyệt / Đã ẩn'}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="mt-2 flex">
                                                        <div className="flex items-center text-sm text-gray-500">
                                                            <p className="mr-4">{listing.price}</p>
                                                            <p>{listing.area}</p>
                                                        </div>
                                                    </div>
                                                    <div className="mt-2 flex items-center space-x-4">
                                                        <Link
                                                            to={`/edit-listing/${listing.id}`}
                                                            className="text-indigo-600 hover:text-indigo-900 text-sm font-medium"
                                                        >
                                                            Sửa
                                                        </Link>
                                                        <Link
                                                            to={`/listings/${listing.id}`}
                                                            className="text-gray-600 hover:text-gray-900 text-sm font-medium"
                                                        >
                                                            Xem
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <div className="text-center py-10 bg-white rounded-lg shadow-sm">
                            <p className="text-gray-500 text-lg mb-4">Chưa đăng thông tin nhà trọ</p>
                            <Link
                                to="/create-listing"
                                className="text-blue-600 hover:text-blue-800 font-medium"
                            >
                                Đăng tin ngay
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MyListings;
