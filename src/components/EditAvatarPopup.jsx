import React from 'react';
import { CurrentUserContext } from '../context/CurrentUserContext';
import PopupWithForm from './PopupWithForm';
import useFormAndValidation from '../hooks/useFormAndValidation';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, isLoading }) {
  const currentUser = React.useContext(CurrentUserContext);

  const { values, errors, isValid, handleChange, resetForm } = useFormAndValidation();

  function handleSubmit(evt) {
    evt.preventDefault();

    onUpdateAvatar({
      avatar: values.avatarLink,
    });
  }

  React.useEffect(() => {
    currentUser ? resetForm(currentUser) : resetForm();
  }, [resetForm, currentUser, isOpen]);

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      isValid={isValid}
      isLoading={isLoading}
      onSubmit={handleSubmit}
      title="Обновить аватар"
      name="avatar"
      btnText="Сохранить">
      <fieldset className="form__inner">
        <input
          className="form__input"
          name="avatarLink"
          type="url"
          id="input-avatar"
          aria-label="подпись"
          placeholder="Сcылка на аватар"
          value={values.avatarLink || ''}
          onChange={handleChange}
          required
        />
        <span className="form__input-error input-avatar-error">{errors.avatarLink}</span>
      </fieldset>
    </PopupWithForm>
  );
}
export default EditAvatarPopup;
