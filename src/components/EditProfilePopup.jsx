import React from 'react';

import { CurrentUserContext } from '../context/CurrentUserContext';
import useFormAndValidation from '../hooks/useFormAndValidation';
import PopupWithForm from './PopupWithForm';

function EditProfilePopup({ isOpen, onClose, onUpdateUser, isLoading }) {
  const currentUser = React.useContext(CurrentUserContext);

  const { values, handleChange, errors, isValid, resetForm } = useFormAndValidation();
  // После загрузки текущего пользователя из API
  // его данные будут использованы в управляемых компонентах.
  React.useEffect(() => {
    currentUser ? resetForm(currentUser) : resetForm();
  }, [resetForm, currentUser, isOpen]);

  function handleSubmit(evt) {
    // Запрещаем браузеру переходить по адресу формы
    evt.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateUser({
      name: values.name,
      about: values.about,
    });
  }

  return (
    <PopupWithForm
      title="Редактировать профиль"
      name="edit-profile"
      isOpen={isOpen}
      onClose={onClose}
      isLoading={isLoading}
      onSubmit={handleSubmit}
      isValid={isValid}
      btnText="Сохранить"
    >
      <fieldset className="form__inner">
        <input
          onChange={handleChange}
          className="form__input  form__input_text_name "
          name="name"
          value={values.name || ''}
          type="text"
          id="input-name"
          aria-label="имя"
          placeholder="Ваше имя"
          minLength="2"
          maxLength="40"
          required
        />
        <span className="form__input-error input-name-error">{errors.name}</span>
        <input
          onChange={handleChange}
          className="form__input form__input_text_about "
          name="about"
          value={values.about || ''}
          type="text"
          id="input-about"
          aria-label="подпись"
          placeholder="О себе"
          minLength="2"
          maxLength="200"
          required
        />
        <span className="form__input-error input-about-error">{errors.about}</span>
      </fieldset>
    </PopupWithForm>
  );
}
export default EditProfilePopup;
