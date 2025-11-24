import { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import { useAuth } from '../context/AuthContext';
import LoadingSkeleton from '../components/LoadingSkeleton';

const Detail = () => {
    const { id } = useParams();
    // Guard: if id is missing, show error early
    if (!id) {
        return (
            <div className="container-custom py-20 text-center">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Không tìm thấy tin đăng.</h2>
                <Link to="/" className="text-blue-600 hover:underline">← Quay lại trang chủ</Link>
            </div>
        );
    }

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [listing, setListing] = useState(null);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [rating, setRating] = useState(0);
    const [submitting, setSubmitting] = useState(false);
    const { user, isAdmin } = useAuth();

    const fetchListingDetail = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const { data, error } = await supabase
                .from('listings')
                .select('*')
                .eq('id', id)
                .single();
            if (error) throw error;
            if (!data) {
                setError('Không tìm thấy tin đăng.');
                setListing(null);
                return false;
            }

            // Check visibility
            if (!data.is_visible && !isAdmin) {
                setError('Tin đăng này đã bị ẩn.');
                setListing(null);
                return false;
            }

            setListing(data);
            return true;
        } catch (err) {
            console.error('Error fetching listing:', err);
            setError('Không tìm thấy tin đăng hoặc đã bị xóa.');
            setListing(null);
            return false;
        } finally {
            setLoading(false);
        }
    }, [id, isAdmin]);

    const fetchComments = useCallback(async () => {
        try {
            // Try fetching with profiles first
            const { data, error } = await supabase
                .from('comments')
                .select('*, profiles(full_name, email)')
                .eq('listing_id', id)
                .order('created_at', { ascending: false });

            if (error) throw error;
            if (data) setComments(data);
        } catch (err) {
            console.error('Error fetching comments with profiles:', err);
            // Fallback: Fetch comments without profiles
            try {
                const { data, error } = await supabase
                    .from('comments')
                    .select('*')
                    .eq('listing_id', id)
                    .order('created_at', { ascending: false });

                if (error) throw error;
                if (data) setComments(data);
            } catch (fallbackErr) {
                console.error('Error fetching comments (fallback):', fallbackErr);
            }
        }
    }, [id]);

    // ... (rest of the file)



    useEffect(() => {
        const loadData = async () => {
            const success = await fetchListingDetail();
            if (success) await fetchComments();
        };
        loadData();
    }, [fetchListingDetail, fetchComments]);

    const handleSubmitComment = async (e) => {
        e.preventDefault();
        if (!user) {
            alert('Vui lòng đăng nhập để gửi đánh giá!');
            return;
        }
        if (rating === 0) {
            alert('Vui lòng chọn số sao đánh giá!');
            return;
        }
        try {
            setSubmitting(true);
            const { error } = await supabase
                .from('comments')
                .insert({
                    content: newComment,
                    rating: rating,
                    listing_id: id,
                    user_id: user.id,
                });
            if (error) {
                console.error('Supabase error:', error);
                throw error;
            }
            setNewComment('');
            setRating(0);
            await fetchComments();
            alert('Đánh giá của bạn đã được gửi!');
        } catch (err) {
            console.error('Error submitting comment:', err);
            if (err.message?.includes('rating')) {
                alert('Lỗi: Bảng comments chưa có cột rating. Vui lòng chạy schema.sql trong Supabase!');
            } else {
                alert('Không thể gửi đánh giá. Vui lòng thử lại.');
            }
        } finally {
            setSubmitting(false);
        }
    };

    const handleDeleteComment = async (commentId) => {
        if (!window.confirm('Bạn có chắc chắn muốn xóa bình luận này?')) return;

        try {
            const { error } = await supabase
                .from('comments')
                .delete()
                .eq('id', commentId);

            if (error) throw error;

            // Refresh comments
            await fetchComments();
            alert('Đã xóa bình luận.');
        } catch (err) {
            console.error('Error deleting comment:', err);
            alert('Không thể xóa bình luận. Vui lòng thử lại.');
        }
    };

    const getThumbnail = (imageString) => {
        if (!imageString) return 'https://via.placeholder.com/800x500?text=No+Image';
        return imageString.split('\n')[0].trim();
    };

    if (loading) {
        return (
            <div className="container-custom py-10">
                <LoadingSkeleton />
            </div>
        );
    }

    if (error || !listing) {
        return (
            <div className="container-custom py-20 text-center">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Đã có lỗi xảy ra</h2>
                <p className="text-gray-600 mb-6">{error}</p>
                <Link to="/" className="text-blue-600 hover:underline">← Quay lại trang chủ</Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="container-custom">
                {/* Breadcrumb */}
                <div className="mb-6 flex items-center text-sm text-gray-500">
                    <Link to="/" className="hover:text-blue-600">Trang chủ</Link>
                    <span className="mx-2">/</span>
                    <Link to="/listings" className="hover:text-blue-600">Danh sách</Link>
                    <span className="mx-2">/</span>
                    <span className="text-gray-900 font-medium truncate max-w-xs">{listing?.title}</span>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Image */}
                        <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
                            <img
                                src={getThumbnail(listing?.image_0)}
                                alt={listing?.title}
                                className="w-full h-auto object-cover aspect-video"
                                onError={(e) => { e.target.src = 'https://via.placeholder.com/800x500?text=Error'; }}
                            />
                        </div>
                        {/* Info */}
                        <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm">
                            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">{listing?.title}</h1>
                            <div className="flex flex-wrap gap-4 mb-6 text-sm text-gray-600">
                                <div className="flex items-center bg-gray-100 px-3 py-1.5 rounded-lg">
                                    <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                                    {listing?.area}
                                </div>
                                <div className="flex items-center bg-gray-100 px-3 py-1.5 rounded-lg">
                                    <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
                                    {listing?.room_count}
                                </div>
                                <div className="flex items-center bg-gray-100 px-3 py-1.5 rounded-lg">
                                    <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                    Đăng ngày {listing?.['Ngày đăng'] || new Date(listing?.created_at).toLocaleDateString('vi-VN')}
                                </div>
                            </div>
                            <div className="prose max-w-none text-gray-700">
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">Mô tả chi tiết</h3>
                                <p className="whitespace-pre-line leading-relaxed">
                                    {listing?.description || 'Chưa có mô tả chi tiết cho tin đăng này.'}
                                </p>
                            </div>
                        </div>
                        {/* Comments Section */}
                        <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm">
                            <h3 className="text-xl font-bold text-gray-900 mb-6">Đánh giá &amp; Bình luận ({comments.length})</h3>
                            {user ? (
                                <form onSubmit={handleSubmitComment} className="mb-8 bg-gray-50 p-4 rounded-xl">
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Đánh giá của bạn</label>
                                        <div className="flex items-center space-x-1">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <button
                                                    key={star}
                                                    type="button"
                                                    onClick={() => setRating(star)}
                                                    className={`focus:outline-none transition-colors duration-200 ${star <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
                                                >
                                                    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                                                </button>
                                            ))}
                                            <span className="ml-2 text-sm text-gray-500">{rating > 0 ? `${rating} sao` : 'Chọn số sao'}</span>
                                        </div>
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-2">Nội dung bình luận</label>
                                        <textarea
                                            id="comment"
                                            rows="3"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                            placeholder="Chia sẻ trải nghiệm của bạn về phòng trọ này..."
                                            value={newComment}
                                            onChange={(e) => setNewComment(e.target.value)}
                                            required
                                        ></textarea>
                                    </div>
                                    <button
                                        type="submit"
                                        disabled={submitting}
                                        className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors duration-200"
                                    >
                                        {submitting ? 'Đang gửi...' : 'Gửi đánh giá'}
                                    </button>
                                </form>
                            ) : (
                                <div className="mb-8 p-4 bg-blue-50 rounded-xl text-blue-700">
                                    Vui lòng <Link to="/login" className="font-bold hover:underline">đăng nhập</Link> để viết đánh giá.
                                </div>
                            )}
                            {comments.length > 0 ? (
                                <div className="space-y-6">
                                    {comments.map((comment) => (
                                        <div key={comment.id} className="flex space-x-4 pb-6 border-b border-gray-100 last:border-0 last:pb-0 group">
                                            <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">
                                                {comment.user_id ? 'U' : 'A'}
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex items-center justify-between mb-1">
                                                    <div className="flex items-center">
                                                        <span className="font-semibold text-gray-900 mr-2">
                                                            {comment.profiles?.full_name || comment.profiles?.email?.split('@')[0] || 'Người dùng'}
                                                        </span>
                                                        <span className="text-xs text-gray-500">
                                                            {new Date(comment.created_at || Date.now()).toLocaleDateString('vi-VN')}
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <div className="flex text-yellow-400">
                                                            {[...Array(5)].map((_, i) => (
                                                                <svg key={i} className={`w-4 h-4 ${i < (comment.rating || 0) ? 'fill-current' : 'text-gray-300'}`} viewBox="0 0 20 20" fill="currentColor">
                                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 0 00.951-.69l1.07-3.292z" />
                                                                </svg>
                                                            ))}
                                                        </div>
                                                        {isAdmin && (
                                                            <button
                                                                onClick={() => handleDeleteComment(comment.id)}
                                                                className="text-red-500 hover:text-red-700 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                                                            >
                                                                Xóa
                                                            </button>
                                                        )}
                                                    </div>
                                                </div>
                                                <p className="text-gray-700">{comment.content}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-gray-500 italic text-center py-4">Chưa có đánh giá nào.</p>
                            )}
                        </div>
                    </div>
                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-24 space-y-6">
                            {/* Contact Card */}
                            <div className="bg-white rounded-2xl p-6 shadow-lg border border-blue-100">
                                <div className="mb-6">
                                    <p className="text-sm text-gray-500 mb-1">Giá thuê</p>
                                    <p className="text-3xl font-bold text-red-600">{listing?.price}</p>
                                </div>
                                <div className="flex items-center space-x-4 mb-6 p-4 bg-gray-50 rounded-xl">
                                    <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                                        {listing?.['Tên chủ'] ? listing['Tên chủ'].charAt(0).toUpperCase() : 'A'}
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Chủ nhà</p>
                                        <p className="font-bold text-gray-900">{listing?.['Tên chủ'] || 'Ẩn danh'}</p>
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <div className="w-full bg-blue-50 text-blue-900 text-center py-3 px-4 rounded-xl border border-blue-200">
                                        <p className="font-bold mb-1">📞 Số điện thoại</p>
                                        <p className="text-lg font-semibold">{listing?.['SĐT']}</p>
                                    </div>
                                    <div className="w-full bg-green-50 text-green-900 text-center py-3 px-4 rounded-xl border border-green-200">
                                        <p className="font-bold mb-1">💬 Liên hệ Zalo</p>
                                        <p className="text-lg font-semibold">{listing?.['SĐT']}</p>
                                    </div>
                                </div>
                            </div>
                            {/* Address Card */}
                            <div className="bg-white rounded-2xl p-6 shadow-sm">
                                <h3 className="font-bold text-gray-900 mb-4">Địa chỉ</h3>
                                <div className="flex items-start text-gray-600">
                                    <svg className="w-5 h-5 mr-2 mt-0.5 text-blue-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                    <p>{listing?.address}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Detail;
