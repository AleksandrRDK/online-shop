import { Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth.js';
import LoadingSpinner from '@/components/LoadingSpinner/LoadingSpinner';

const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth();

    if (loading) return <LoadingSpinner size={160} color="#3aaed8" />;

    if (!user) return <Navigate to="/" replace />;

    return children;
};

export default PrivateRoute;
