import './GlobalModal.scss';

function GlobalModal({ isOpen, onClose, children }) {
    if (!isOpen) return null;

    return (
        <div className="global-modal" onClick={onClose}>
            <div
                className="global-modal__content"
                onClick={(e) => e.stopPropagation()}
            >
                {children}
            </div>
        </div>
    );
}

export default GlobalModal;
