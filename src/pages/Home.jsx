import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import ListingCard from '../components/ListingCard';
import LoadingSkeleton from '../components/LoadingSkeleton';

const Home = () => {
    const [latestListings, setLatestListings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchLatestListings();
    }, []);

    const fetchLatestListings = async () => {
        try {
            const { data, error } = await supabase
                .from('listings')
                .select('*')
                .eq('is_visible', true)
                .order('created_at', { ascending: false })
                .limit(3);

            if (error) throw error;
            setLatestListings(data || []);
        } catch (error) {
            console.error('Error fetching latest listings:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="relative h-[500px] flex items-center justify-center text-center text-white overflow-hidden">
                <div
                    className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat filter blur-sm scale-105"
                    style={{ backgroundImage: "url('https://giaoducnghe.edu.vn/wp-content/uploads/2021/10/chat-luong-phong-tro-cho-sinh-vien_giao-duc-nghe.jpg')" }}
                >
                    <div className="absolute inset-0 bg-black/40"></div>
                </div>

                <div className="relative z-10 container-custom px-4">
                    <h1 className="text-4xl md:text-6xl font-bold mb-6 drop-shadow-lg">
                        “Hãy tìm ngôi nhà thứ hai của bạn”
                    </h1>
                    <Link
                        to="/listings"
                        className="inline-block px-8 py-3 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition-colors duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                    >
                        Khám Phá Ngay
                    </Link>
                </div>
            </section>

            {/* Blog / Latest Listings Section */}
            <section className="py-12 bg-gray-50">
                <div className="container-custom">
                    <div className="flex justify-between items-end mb-8">
                        <div>
                            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Phòng Trọ Mới Nhất</h2>
                            <p className="text-gray-600 mt-2">Những lựa chọn tốt nhất vừa được cập nhật</p>
                        </div>
                        <Link to="/listings" className="text-blue-600 hover:text-blue-700 font-medium flex items-center">
                            Xem tất cả
                            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </Link>
                    </div>

                    {loading ? (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {[...Array(3)].map((_, index) => (
                                <LoadingSkeleton key={index} />
                            ))}
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {latestListings.map((listing) => (
                                <ListingCard key={listing.id} listing={listing} />
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Video Tutorial Section */}
            <section className="py-12 bg-white">
                <div className="container-custom">
                    <div className="max-w-4xl mx-auto">
                        <div className="text-center mb-8">
                            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                                Hướng Dẫn Sử Dụng
                            </h2>
                            <p className="text-gray-600">
                                Xem video hướng dẫn chi tiết về cách sử dụng website Trọ đâu cũng được
                            </p>
                        </div>

                        {/* Responsive YouTube embed */}
                        <div className="relative w-full rounded-xl overflow-hidden shadow-lg" style={{ paddingBottom: '56.25%' }}>
                            <iframe
                                className="absolute top-0 left-0 w-full h-full"
                                src="https://www.youtube.com/embed/VTYV2hHk6Lg"
                                title="Hướng dẫn sử dụng website"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </div>
                    </div>
                </div>
            </section>

            {/* Story Section */}
            <section className="py-12 bg-gray-50">
                <div className="container-custom">
                    <div className="max-w-3xl mx-auto text-center">
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                            Kết Nối Không Gian Sống – Khởi Đầu Hành Trình Mới
                        </h2>
                        <div className="prose prose-lg mx-auto text-gray-600">
                            <p className="mb-4">
                                Chúng tôi hiểu rằng, tìm được một nơi ở ưng ý chưa bao giờ là điều dễ dàng.
                            </p>
                            <p className="mb-4">
                                Là những người đã từng là sinh viên, từng chật vật với những ngày nắng gắt đi tìm phòng, từng thất vọng trước những căn trọ "treo đầu dê bán thịt chó" hay những khoản phí mập mờ... chúng tôi thấu hiểu sâu sắc nỗi vất vả của bạn. Một căn phòng trọ không chỉ là nơi để ngủ, đó là nơi bạn học tập, nghỉ ngơi và bắt đầu xây dựng tương lai.
                            </p>
                            <p>
                                Đó chính là lý do <strong>Trọ đâu cũng được</strong> ra đời. Chúng tôi không chỉ xây dựng một website tìm kiếm, chúng tôi xây dựng giải pháp để việc thuê nhà trở nên <strong>An toàn hơn – Dễ dàng hơn – Minh bạch hơn</strong>.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Mission & Vision Section */}
            <section className="py-12 bg-blue-50">
                <div className="container-custom">
                    <div className="grid md:grid-cols-2 gap-8 items-center">
                        <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300">
                            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Sứ Mệnh Của Chúng Tôi</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Nhiệm vụ của chúng tôi là xóa bỏ rào cản thông tin giữa người thuê và chủ nhà. Chúng tôi cam kết mang lại một nền tảng nơi mọi thông tin về giá cả, tiện ích và hình ảnh đều trung thực, giúp các bạn sinh viên và người đi làm trẻ tìm được "ngôi nhà thứ hai" nhanh chóng nhất.
                            </p>
                        </div>
                        <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300">
                            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Tầm Nhìn</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Trở thành hệ sinh thái công nghệ số 1 về bất động sản cho thuê dành cho giới trẻ, nơi mà sự an toàn và tiện lợi được đặt lên hàng đầu.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Core Values Section */}
            <section className="py-12 bg-white">
                <div className="container-custom">
                    <div className="text-center mb-10">
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                            Chúng Tôi Có Gì Khác Biệt?
                        </h2>
                        <p className="text-gray-500 text-lg max-w-2xl mx-auto">
                            Những giá trị cốt lõi giúp chúng tôi mang đến trải nghiệm tốt nhất cho bạn
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            {
                                title: "Minh Bạch Là Tôn Chỉ",
                                description: "Chúng tôi nỗ lực kiểm duyệt tin đăng chặt chẽ để hạn chế tối đa tình trạng 'tin ảo', 'giá ảo'. Hình ảnh bạn thấy là hình ảnh thực tế của căn phòng.",
                                icon: (
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                ),
                                color: "bg-green-100 text-green-600"
                            },
                            {
                                title: "Tìm Kiếm Thông Minh",
                                description: "Hệ thống bộ lọc tối ưu giúp bạn tìm phòng theo: Gần trường đại học, gần khu văn phòng, mức giá, hay tiện ích đi kèm chỉ trong vài cú click chuột.",
                                icon: (
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                ),
                                color: "bg-blue-100 text-blue-600"
                            },
                            {
                                title: "Cộng Đồng Văn Minh",
                                description: "Kết nối những người thuê nhà văn minh và những chủ nhà uy tín, tạo nên môi trường sống an ninh và thân thiện.",
                                icon: (
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                ),
                                color: "bg-orange-100 text-orange-600"
                            },
                            {
                                title: "Hỗ Trợ Tận Tâm",
                                description: "Đội ngũ CSKH luôn sẵn sàng lắng nghe và hỗ trợ giải quyết các vấn đề phát sinh trong quá trình tìm kiếm và thuê phòng.",
                                icon: (
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                                    </svg>
                                ),
                                color: "bg-red-100 text-red-600"
                            }
                        ].map((item, index) => (
                            <div key={index} className="bg-gray-50 p-6 rounded-xl hover:bg-white hover:shadow-lg transition-all duration-300 border border-gray-100">
                                <div className={`w-12 h-12 ${item.color} rounded-lg flex items-center justify-center mb-4`}>
                                    {item.icon}
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    {item.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Commitment Section */}
            <section className="py-16 bg-gradient-to-br from-blue-600 to-blue-800 text-white">
                <div className="container-custom text-center">
                    <h2 className="text-2xl md:text-3xl font-bold mb-4">
                        Cam Kết Của Chúng Tôi
                    </h2>
                    <p className="text-lg text-blue-100 max-w-3xl mx-auto mb-8 leading-relaxed">
                        Chúng tôi tin rằng "An cư mới lạc nghiệp". Dù bạn là tân sinh viên bỡ ngỡ hay nhân viên văn phòng bận rộn, chúng tôi sẽ luôn đồng hành để giúp bạn tìm thấy không gian sống lý tưởng nhất với chi phí hợp lý nhất.
                    </p>
                    <Link
                        to="/listings"
                        className="inline-block px-8 py-3 bg-white text-blue-700 font-bold rounded-full hover:bg-blue-50 transition-colors duration-300 shadow-lg"
                    >
                        Tìm Phòng Ngay
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default Home;
