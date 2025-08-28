import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '@/context/AuthContext';
import { ToastProvider } from '@/context/ToastContext/ToastContext';

import AuthPage from './pages/AuthPage/AuthPage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';

function App() {
    return (
        <Router>
            <ToastProvider>
                <AuthProvider>
                    <Routes>
                        <Route path="/" element={<AuthPage />} />
                        <Route
                            path="/profile"
                            element={
                                <PrivateRoute>
                                    <ProfilePage />
                                </PrivateRoute>
                            }
                        />
                    </Routes>
                </AuthProvider>
            </ToastProvider>
        </Router>
    );
}

export default App;
