import { Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth.js';

const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth();

    if (loading) return <div>Загрузка...</div>;

    if (!user) return <Navigate to="/" replace />;

    return children;
};

export default PrivateRoute;
