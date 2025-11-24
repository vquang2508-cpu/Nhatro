import React from 'react';
import { Card, CardContent } from "@/components/ui/card";

const About = () => {
    const teamMembers = [
        {
            name: "Nguyễn Dương An",
            email: "nguyenduongan2007@gmail.com",
            facebook: "https://www.facebook.com/an.nguyen.813337",
            role: "Developer",
            image: "https://media.discordapp.net/attachments/1425092456533459112/1442556550735724775/04072a389dbf009f526b95bc4d6d2813.png?ex=6925dcfb&is=69248b7b&hm=800e46232375c6706e8e2f00cafed6992b8868a49759a3cf4ef4b3aba29160c3&=&format=webp&quality=lossless"
        },
        {
            name: "Lư Gia Linh",
            email: "711819lugialinh@gmail.com",
            facebook: "https://www.facebook.com/potatochipslover",
            role: "Developer",
            image: "https://media.discordapp.net/attachments/1425092456533459112/1442554119167545374/516383077_1536344640662284_5961486254025736101_n.png?ex=6925dab7&is=69248937&hm=ff394a266e2623be48e0818d3267f0ec016b75e7d580b9ad0dbf657718bc99bc&=&format=webp&quality=lossless"
        },
        {
            name: "Nguyễn Phước Thọ",
            email: "ptho3214@gmail.com",
            facebook: "https://www.facebook.com/tho.phuoc.10297",
            role: "Developer",
            image: "https://media.discordapp.net/attachments/1425092456533459112/1442554718206296074/20250103_1031551.jpg?ex=6925db46&is=692489c6&hm=e908c871480bd9d80dab86afd8776862b28b0c7c1a24c588853414d931a8dff8&=&format=webp"
        },
        {
            name: "Vũ Quang",
            email: "91vuquang@gmail.com",
            facebook: "https://www.facebook.com/quang.vu.657734",
            role: "Developer",
            image: "https://scontent.fsgn5-5.fna.fbcdn.net/v/t1.6435-9/123725209_118323726745299_6682006222652791081_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=0O4-aFHRzJUQ7kNvwGi1_R5&_nc_oc=AdlFlk-5xe_zZkxi2ZnLYVPQzuxjooGUSB5DnR8Syi4nkGKf8JqdyIXW88YqU9vRbYs&_nc_zt=23&_nc_ht=scontent.fsgn5-5.fna&_nc_gid=xDu-5Xgf5zXhZ6JPC_1uDg&oh=00_AfhHPQMenHLcg1moAyO0NNcWJayINwz3nUl7wOwLJvMMyA&oe=694BEA1B"
        },
        {
            name: "Võ Minh Triết",
            email: "vominhtriet2k7@gmail.com",
            facebook: "https://www.facebook.com/triet.vo.144690",
            role: "Developer",
            image: "https://media.discordapp.net/attachments/1425092456533459112/1442562253625757796/70a50cf9-462b-4410-9b5d-1ad2f6acf44e.png?ex=6925e24a&is=692490ca&hm=e6857652f74c9eacc37f6393d712e27ed4d525935f2cb15272c5f0d1cbacc85e&=&format=webp&quality=lossless&width=720&height=960"
        }
    ];

    return (
        <div className="min-h-screen bg-background">
            {/* 1. Hero Section */}
            <section className="relative bg-slate-900 text-white py-20 lg:py-32 overflow-hidden">
                <div className="absolute inset-0 z-0 opacity-40">
                    <img
                        src="https://scontent.fsgn5-9.fna.fbcdn.net/v/t39.30808-6/583901955_1263159542506417_9120507689823449605_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=127cfc&_nc_ohc=MqM11rAQo-4Q7kNvwGue9Rf&_nc_oc=AdmdR6giSIozzqtuW-Od4UVUuqD1_5lMtP8cz6P6dips8c9y4Pm7SdyZZLexF2nC7sA&_nc_zt=23&_nc_ht=scontent.fsgn5-9.fna&_nc_gid=aa5IG1EDCa4-f-CvAMydMQ&oh=00_AfipjtZiczR7fZqkJJJ84pzpZx7OGYwt1PDO4OxXsbblwA&oe=6928E953"
                        alt="Hero Background"
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="container mx-auto px-4 relative z-10 text-center">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                        Hành trình tìm trọ, bắt đầu từ sự thấu hiểu.
                    </h1>
                    <p className="text-xl md:text-2xl text-slate-200 max-w-3xl mx-auto">
                        Không chỉ là một nơi để ở, chúng tôi giúp bạn tìm thấy một không gian để sống, học tập và phát triển tại TP.HCM.
                    </p>
                </div>
            </section>

            {/* 2. Our Story */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto text-center">
                        <h2 className="text-3xl font-bold mb-8 text-slate-800">Tại sao Web Thuê Nhà TPHCM ra đời?</h2>
                        <div className="prose prose-lg mx-auto text-slate-600">
                            <p className="mb-6">
                                "Là những sinh viên đang sống và học tập tại TP.HCM, chúng tôi hiểu rõ nỗi vất vả của việc tìm kiếm một nơi ở ưng ý. Từ việc đối mặt với tin đăng ảo, giá cả thiếu minh bạch, cho đến những lo ngại về an ninh khu vực.
                            </p>
                            <p>
                                Web Thuê Nhà TPHCM được xây dựng không chỉ là một đồ án công nghệ, mà là giải pháp thực tế nhằm kết nối người đi thuê với những căn hộ, phòng trọ uy tín, giá cả hợp lý và minh bạch. Chúng tôi mong muốn xóa bỏ rào cản thông tin, giúp các bạn sinh viên và người đi làm tìm được 'ngôi nhà thứ hai' một cách nhanh chóng và an toàn nhất."
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. Core Values */}
            <section className="py-16 bg-slate-50">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold mb-12 text-center text-slate-800">Điều chúng tôi cam kết</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        <Card className="border-none shadow-lg hover:shadow-xl transition-shadow">
                            <CardContent className="p-8 text-center">
                                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold mb-4 text-slate-800">Minh Bạch (Transparency)</h3>
                                <p className="text-slate-600">
                                    Mọi thông tin về giá phòng, chi phí điện nước và dịch vụ đi kèm đều được công khai rõ ràng. Nói không với chi phí ẩn.
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="border-none shadow-lg hover:shadow-xl transition-shadow">
                            <CardContent className="p-8 text-center">
                                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold mb-4 text-slate-800">Chính Xác (Accuracy)</h3>
                                <p className="text-slate-600">
                                    Dữ liệu được thu thập và sàng lọc kỹ lưỡng bằng công nghệ web scraper hiện đại để đảm bảo tình trạng phòng luôn được cập nhật mới nhất.
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="border-none shadow-lg hover:shadow-xl transition-shadow">
                            <CardContent className="p-8 text-center">
                                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold mb-4 text-slate-800">Tiện Lợi (Convenience)</h3>
                                <p className="text-slate-600">
                                    Giao diện thân thiện, tối ưu hóa tìm kiếm theo khu vực, trường đại học và mức giá phù hợp với túi tiền sinh viên.
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* 4. Meet The Team */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold mb-12 text-center text-slate-800">Đội Ngũ Phát Triển</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        {teamMembers.map((member, index) => (
                            <div key={index} className="bg-slate-50 rounded-xl p-6 text-center hover:shadow-md transition-shadow">
                                {member.image ? (
                                    <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden border-4 border-slate-200">
                                        <img
                                            src={member.image}
                                            alt={member.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                ) : (
                                    <div className="w-32 h-32 bg-slate-200 rounded-full mx-auto mb-4 flex items-center justify-center text-3xl font-bold text-slate-500">
                                        {member.name.split(' ').pop()[0]}
                                    </div>
                                )}
                                <h3 className="text-lg font-bold text-slate-800 mb-2">{member.name}</h3>
                                <p className="text-sm text-slate-500 mb-4">{member.email}</p>
                                <a
                                    href={member.facebook}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
                                >
                                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                    </svg>
                                    Facebook
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 5. Project Context */}
            <section className="py-16 bg-slate-900 text-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto border border-slate-700 rounded-xl p-8 bg-slate-800/50">
                        <h2 className="text-2xl font-bold mb-6 text-center text-blue-400">
                            Tìm hiểu và ứng dụng hệ thống thông tin, mạng máy tính, công nghệ phần mềm
                        </h2>
                        <div className="space-y-4 text-slate-300">
                            <div className="flex flex-col sm:flex-row sm:justify-between border-b border-slate-700 pb-2">
                                <span className="font-semibold text-slate-400">Trường:</span>
                                <span>Đại học Khoa học Tự nhiên, ĐHQG-HCM</span>
                            </div>
                            <div className="flex flex-col sm:flex-row sm:justify-between border-b border-slate-700 pb-2">
                                <span className="font-semibold text-slate-400">Lớp:</span>
                                <span>25C02</span>
                            </div>
                            <div className="flex flex-col sm:flex-row sm:justify-between border-b border-slate-700 pb-2">
                                <span className="font-semibold text-slate-400">Giảng viên hướng dẫn thực hành:</span>
                                <span>Lê Nguyễn Tường Nhi</span>
                            </div>
                            <div className="flex flex-col sm:flex-row sm:justify-between border-b border-slate-700 pb-2">
                                <span className="font-semibold text-slate-400">Giảng viên hướng dẫn lý thuyết:</span>
                                <span>Huỳnh Thụy Bảo Trân</span>
                            </div>
                            <div className="flex flex-col sm:flex-row sm:justify-between border-b border-slate-700 pb-2">
                                <span className="font-semibold text-slate-400">Môn học:</span>
                                <span>Nhập môn công nghệ thông tin</span>
                            </div>
                            <div className="flex flex-col sm:flex-row sm:justify-between">
                                <span className="font-semibold text-slate-400">Công nghệ sử dụng:</span>
                                <span className="text-right">Antigravity của Google, Supabase, ChatGPT, Web scraper extensions</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 6. Footer Section */}
            <footer className="bg-slate-950 text-slate-400 py-12 border-t border-slate-900">
                <div className="container mx-auto px-4 text-center">
                    <p className="mb-6 text-lg">
                        Chúng tôi xin gửi lời cảm ơn chân thành đến Giảng viên <span className="text-white font-semibold">Lê Nguyễn Tường Nhi</span> và <span className="text-white font-semibold">Huỳnh Thụy Bảo Trân</span> đã tận tình hướng dẫn chúng em.
                    </p>
                    <div className="flex flex-col items-center justify-center space-y-2">
                        <h4 className="text-white font-bold mb-2">Liên hệ:</h4>
                        <a href="mailto:vominhtriet2k7@gmail.com" className="hover:text-blue-400 transition-colors">
                            vominhtriet2k7@gmail.com
                        </a>
                        <a
                            href="https://www.facebook.com/triet.vo.144690"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-blue-400 transition-colors"
                        >
                            facebook.com/triet.vo.144690
                        </a>
                    </div>
                    <div className="mt-12 text-sm text-slate-600">
                        &copy; {new Date().getFullYear()} Web Thuê Nhà TPHCM. All rights reserved.
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default About;
