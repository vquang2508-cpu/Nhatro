import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, requireAdmin = false }) => {
    const { user, role, loading } = useAuth();

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    if (requireAdmin && role !== 'admin') {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">403</h1>
                    <p className="text-xl text-gray-600 mb-8">Bạn không có quyền truy cập trang này.</p>
                    <Navigate to="/" className="text-blue-600 hover:underline font-medium">
                        Quay về trang chủ
                    </Navigate>
                </div>
            </div>
        );
    }

    return children;
};

export default ProtectedRoute;
