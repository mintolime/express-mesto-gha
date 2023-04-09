import successIcon from '../images/icon/icon-success-login.png';
import errorIcon from '../images/icon/icon-error-login.png';

function InfoTooltip({ isOpen, onClose, isCorrectLogin }) {

  return (
    <section
      className={`popup  ${isOpen ? 'popup_opened' : ''}`}
      aria-label="Уведомление при регистрации в приложение">
      <div className="popup__container popup__container_login">
        <button type="button" className=" button button_type_close" onClick={onClose}></button>
        <img
          src={isCorrectLogin ? successIcon : errorIcon}
          alt={isCorrectLogin ? 'Регистрация прошла успешно' : 'Регистрация не прошла'}
          className="popup__container_login-icon"
        />
        <h3 className="popup__container_login-title">
          {isCorrectLogin
            ? 'Вы успешно зарегистрировались!'
            : 'Что-то пошло не так! Попробуйте ещё раз.'}
        </h3>
      </div>
    </section>
  );
}

export default InfoTooltip;
