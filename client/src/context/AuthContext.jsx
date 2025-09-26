import { createContext, useState, useEffect } from 'react';
import api from '../http';
import { useUsersApi } from '@/api/users';
import { refreshAccessToken, register, login, logout } from '@/api/auth';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const { getProfile } = useUsersApi();

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [accessToken, setAccessToken] = useState(
        localStorage.getItem('accessToken')
    );

    const registerUser = async (username, email, password) => {
        const res = await register(username, email, password);
        localStorage.setItem('accessToken', res.data.accessToken);
        setAccessToken(res.data.accessToken);
        setUser(res.data.user);
        return res.data;
    };

    const loginUser = async (email, password) => {
        const res = await login(email, password);
        localStorage.setItem('accessToken', res.data.accessToken);
        setAccessToken(res.data.accessToken);
        setUser(res.data.user);
        return res.data;
    };

    const logoutUser = async () => {
        await logout();
        localStorage.removeItem('accessToken');
        setAccessToken(null);
        setUser(null);
    };

    // подставляем токен в хедеры при изменении
    useEffect(() => {
        if (accessToken) {
            api.defaults.headers.common[
                'Authorization'
            ] = `Bearer ${accessToken}`;
        } else {
            delete api.defaults.headers.common['Authorization'];
        }
    }, [accessToken]);

    // авто-загрузка профиля при старте
    useEffect(() => {
        const initAuth = async () => {
            try {
                if (accessToken) {
                    const profile = await getProfile();
                    setUser(profile);
                } else {
                    // пробуем обновить токен через refresh
                    const newToken = await refreshAccessToken();
                    localStorage.setItem('accessToken', newToken);
                    setAccessToken(newToken);

                    const profile = await getProfile();
                    setUser(profile);
                }
            } catch (err) {
                console.error('[AuthProvider] авто-логин не удался:', err);
                localStorage.removeItem('accessToken');
                setUser(null);
                setAccessToken(null);
            } finally {
                setLoading(false);
            }
        };

        initAuth();
    }, []);

    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
                accessToken,
                setAccessToken,
                loading,
                setLoading,
                registerUser,
                loginUser,
                logoutUser,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
