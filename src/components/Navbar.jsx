import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { user, logout, isAdmin } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/');
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    // Get user's name from metadata or email
    const getUserName = () => {
        if (user?.user_metadata?.full_name) {
            return user.user_metadata.full_name;
        }
        // Fallback to email username
        return user?.email?.split('@')[0] || 'User';
    };

    return (
        <nav className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-100">
            <div className="container-custom">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center space-x-2 group">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center transform group-hover:scale-105 transition-transform duration-200">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                            </svg>
                        </div>
                        <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
                            Trọ đâu cũng được
                        </span>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-6">
                        {/* User Greeting */}
                        {user && (
                            <span className="text-gray-700 font-medium">
                                Xin chào, {getUserName()}
                            </span>
                        )}

                        <Link to="/" className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200">
                            Trang chủ
                        </Link>

                        <Link to="/listings" className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200">
                            Danh sách trọ
                        </Link>

                        {/* User Links */}
                        {user && (
                            <Link to="/my-listings" className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200">
                                Tin của tôi
                            </Link>
                        )}

                        {/* Support Link */}
                        <Link to="/support" className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200">
                            Hỗ trợ
                        </Link>

                        {/* About Us */}
                        <Link to="/about" className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200">
                            About Us
                        </Link>

                        {/* Auth Buttons */}
                        {user ? (
                            <button
                                onClick={handleLogout}
                                className="px-4 py-2 text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200"
                            >
                                Đăng xuất
                            </button>
                        ) : (
                            <Link
                                to="/login"
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium shadow-sm hover:shadow-md"
                            >
                                Đăng nhập
                            </Link>
                        )}

                        {/* Admin Link (Only for Admin) */}
                        {user && isAdmin && (
                            <Link
                                to="/admin"
                                className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors duration-200 font-medium shadow-sm hover:shadow-md"
                            >
                                Quản lý
                            </Link>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                    >
                        <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {isMenuOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="md:hidden py-4 border-t border-gray-100 animate-fadeIn">
                        <div className="flex flex-col space-y-3">
                            {user && (
                                <div className="px-4 py-2 text-gray-700 font-medium">
                                    Xin chào, {getUserName()}
                                </div>
                            )}

                            <Link
                                to="/"
                                className="px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors duration-200"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Trang chủ
                            </Link>
                            <Link
                                to="/listings"
                                className="px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors duration-200"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Danh sách trọ
                            </Link>

                            {user && (
                                <Link
                                    to="/my-listings"
                                    className="px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors duration-200"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Tin của tôi
                                </Link>
                            )}

                            <Link
                                to="/about"
                                className="px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors duration-200"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                About Us
                            </Link>

                            {user ? (
                                <>
                                    <button
                                        onClick={() => {
                                            handleLogout();
                                            setIsMenuOpen(false);
                                        }}
                                        className="px-4 py-2 text-left text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors duration-200"
                                    >
                                        Đăng xuất
                                    </button>
                                    {isAdmin && (
                                        <Link
                                            to="/admin"
                                            className="px-4 py-2 text-left text-gray-800 font-bold hover:bg-gray-100 rounded-lg transition-colors duration-200"
                                            onClick={() => setIsMenuOpen(false)}
                                        >
                                            Quản lý
                                        </Link>
                                    )}
                                </>
                            ) : (
                                <Link
                                    to="/login"
                                    className="px-4 py-2 text-blue-600 font-medium hover:bg-blue-50 rounded-lg transition-colors duration-200"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Đăng nhập
                                </Link>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
