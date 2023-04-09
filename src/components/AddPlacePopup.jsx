import React from 'react';
import { CurrentUserContext } from '../context/CurrentUserContext';
import PopupWithForm from './PopupWithForm';
import useFormAndValidation from '../hooks/useFormAndValidation';

const AddPlacePopup = ({ isOpen, onClose, onAddPlace, isLoading }) => {
  const currentUser = React.useContext(CurrentUserContext);
  const { values, handleChange, errors, isValid, resetForm } = useFormAndValidation();

  React.useEffect(() => {
    currentUser ? resetForm(currentUser) : resetForm();
  }, [resetForm, currentUser, isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({
      name: values.cardName,
      link: values.cardLink,
    });
  }
  
  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      isLoading={isLoading}
      btnText="Сохранить"
      title="Новое место"
      onSubmit={handleSubmit}
      name="add-card"
      isValid={isValid}>
      <fieldset className="form__inner">
        <input
          className="form__input  form__input_text_name"
          name="cardName"
          type="text"
          id="input-name-card"
          aria-label="Наименование"
          placeholder="Название"
          minLength="2"
          maxLength="30"
          onChange={handleChange}
          value={values.cardName || ''}
          required
        />
        <span className="form__input-error input-name-card-error">{errors.cardName}</span>
        <input
          className="form__input form__input_text_about"
          name="cardLink"
          type="url"
          id="input-link"
          aria-label="подпись"
          placeholder="Ссылка на картинку"
          value={values.cardLink || ''}
          onChange={handleChange}
          required
        />
        <span className="form__input-error input-link-error">{errors.cardLink}</span>
      </fieldset>
    </PopupWithForm>
  );
};
export default AddPlacePopup;
