import './Header.scss';

function Header() {
    return (
        <header className="header__section">
            <div className="container">
                <div className="header">
                    <div className="header__logo">shop</div>
                    <nav className="header__nav">
                        <ul className="header__list">
                            <li className="header__item">
                                <a href="#" className="header__link">
                                    Каталог
                                </a>
                            </li>
                            <li className="header__item">
                                <a href="#" className="header__link">
                                    Корзина
                                </a>
                            </li>
                            <li className="header__item">
                                <a href="#" className="header__link">
                                    Профиль
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    );
}

export default Header;
