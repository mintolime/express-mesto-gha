import logo from '../images/header-logo.svg';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

function Header({ isCorrectLogin, onLogout, userEmail }) {
  const location = useLocation();

  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="логотип шапки сайта" />
      {location.pathname === '/signin' && (
        <Link to="/signup" className="header__link-entry">
          Регистрация
        </Link>
      )}
      {location.pathname === '/signup' && (
        <Link to="/signin" className="header__link-entry">
          Вход
        </Link>
      )}

      {isCorrectLogin ? (
        <nav className="header__nav">
          <p className="header__email">{userEmail}</p>
          <button className="button button_type_logout" onClick={() => onLogout()}>
            Выйти
          </button>
        </nav>
      ) : (
        ''
      )}
    </header>
  );
}

export default Header;
