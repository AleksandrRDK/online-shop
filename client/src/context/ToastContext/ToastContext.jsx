import { createContext, useState } from 'react';
import './ToastContext.scss';

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
    const [toasts, setToasts] = useState([]);

    const addToast = (message, type) => {
        const id = Date.now();
        setToasts((prev) => [...prev, { id, message, type }]);
        setTimeout(() => {
            setToasts((prev) => prev.filter((t) => t.id !== id));
        }, 5000);
    };

    const removeToast = (id) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    };

    return (
        <ToastContext.Provider value={{ addToast }}>
            {children}
            <div className="toast-container">
                {toasts.map((t) => (
                    <div key={t.id} className={`toast toast--${t.type}`}>
                        <span>{t.message}</span>
                        <button onClick={() => removeToast(t.id)}>×</button>
                    </div>
                ))}
            </div>
        </ToastContext.Provider>
    );
};

export default ToastContext;
