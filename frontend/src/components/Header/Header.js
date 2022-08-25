import headerLogo from '../../images/header/logo.svg';
import { Routes, Route, Link } from 'react-router-dom';

export default function Header({
  userEmail,
  onSignOut,
  isMenuOpen,
  setIsMenuOpen,
}) {
  return (
    <header
      className={`index-page__section header ${
        isMenuOpen && 'header_menu-opened'
      }`}
    >
      <img
        className={`header__logo ${isMenuOpen && 'header__logo_menu-opened'}`}
        src={headerLogo}
        alt="Логотип сайта «Место»"
      />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <span
                className={`header__email ${
                  isMenuOpen && 'header__email_menu-opened'
                }`}
              >
                {userEmail}
              </span>
              <Link
                to="/signin"
                className={`button header__link header__link_out ${
                  isMenuOpen && 'header__email_menu-opened'
                }`}
                onClick={onSignOut}
              >
                Выйти
              </Link>
              <button
                className={`button header__menu-button ${
                  isMenuOpen && 'header__menu-button_active'
                }`}
                type="button"
                aria-label="Меню профиля"
                onClick={() => {
                  setIsMenuOpen(!isMenuOpen);
                }}
              ></button>
            </>
          }
        />
        <Route
          path="/signup"
          element={
            <Link to="/signin" className="button header__link">
              Войти
            </Link>
          }
        />
        <Route
          path="/signin"
          element={
            <Link to="/signup" className="button header__link">
              Регистрация
            </Link>
          }
        />
      </Routes>
    </header>
  );
}
