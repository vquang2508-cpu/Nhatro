import React from 'react';

const Support = () => {
    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="container-custom">
                <h1 className="text-3xl font-bold text-gray-900 mb-6">Hỗ trợ</h1>

                {/* Video hướng dẫn */}
                <div className="bg-white p-8 rounded-xl shadow-sm mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                        Video hướng dẫn sử dụng
                    </h2>
                    <p className="text-gray-600 mb-6">
                        Xem video hướng dẫn chi tiết về cách sử dụng website Trọ đâu cũng được
                    </p>

                    {/* Responsive YouTube embed */}
                    <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                        <iframe
                            className="absolute top-0 left-0 w-full h-full rounded-lg"
                            src="https://www.youtube.com/embed/VTYV2hHk6Lg"
                            title="Hướng dẫn sử dụng website"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    </div>
                </div>

                {/* Thông tin liên hệ */}
                <div className="bg-white p-8 rounded-xl shadow-sm">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                        Cần hỗ trợ thêm?
                    </h2>
                    <p className="text-gray-600 mb-4">
                        Nếu bạn cần hỗ trợ thêm, vui lòng liên hệ với chúng em qua:
                    </p>
                    <ul className="space-y-2 text-gray-700">
                        <li>
                            <strong>Email:</strong>{' '}
                            <a href="mailto:Trodaucungduoc@gmail.com" className="text-blue-600 hover:underline">
                                Trodaucungduoc@gmail.com
                            </a>
                        </li>
                        <li>
                            <strong>Điện thoại:</strong>{' '}
                            <a href="tel:0834614307" className="text-blue-600 hover:underline">
                                0834614307
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Support;
