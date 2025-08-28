import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/useToast';
import { updateProfile, deleteProfile } from '@/api/users.js';
import GlobalModal from '@/components/GlobalModal/GlobalModal';

import defaultAvatar from '@/assets/default-avatar.png';
import './Profile.scss';

function Profile() {
    const { user } = useAuth();
    const { addToast } = useToast();
    const [isOpen, setIsOpen] = useState(false);
    const [formData, setFormData] = useState({
        username: user.username,
        email: user.email,
        password: '',
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateProfile(formData);
            addToast('Данные обновлены!', 'success');
            setIsOpen(false);
        } catch (err) {
            addToast(`Ошибка при обновлении данных ${err}`, 'error');
        }
    };

    const handleDelete = async () => {
        if (!window.confirm('Ты точно хочешь удалить аккаунт? 😢')) return;
        try {
            await deleteProfile();
            alert('Аккаунт удалён');
            navigate('/');
        } catch (err) {
            console.error('Ошибка при удалении:', err);
        }
    };

    return (
        <section className="profile">
            <div className="container">
                <div className="profile__wrapper">
                    <div className="profile__avatar">
                        <img src={user.avatar || defaultAvatar} alt="avatar" />
                    </div>
                    <span className="profile__devider" />
                    <div className="profile__cred">
                        <div className="profile__name">{user.username}</div>
                        <div className="profile__email">{user.email}</div>
                    </div>
                    <button
                        className="profile__settings"
                        onClick={() => setIsOpen(true)}
                    >
                        ⚙️
                    </button>
                </div>
            </div>
            {isOpen && (
                <GlobalModal isOpen={isOpen} onClose={() => setIsOpen(false)}>
                    <div className="modal__content">
                        <h2>Редактировать профиль</h2>
                        <form onSubmit={handleSubmit}>
                            <input
                                type="text"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                placeholder="Имя"
                            />
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Email"
                            />
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Новый пароль"
                            />
                            <button type="submit">Сохранить</button>
                        </form>
                        <button onClick={handleDelete} className="danger">
                            Удалить аккаунт
                        </button>
                        <button onClick={() => setIsOpen(false)}>
                            Закрыть
                        </button>
                    </div>
                </GlobalModal>
            )}
        </section>
    );
}

export default Profile;
