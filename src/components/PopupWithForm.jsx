function PopupWithForm({ name, title, children, isOpen, onClose, onSubmit, isValid, isLoading, btnText }) {
  return (
    isOpen && <section
      className={` popup popup_type_${name} popup_opened `}
      aria-label={title}>
      <div className="popup__container">
        <h3 className="popup__title">{title}</h3>
        <form name={name} className="form" onSubmit={onSubmit}>
          {children}
          <button
            className={`button button_type_save ${isValid ? '' : 'button_type_disable'}`}
            type="submit">
            {`${isLoading ? "Сохранение..." : btnText}`}
          </button>
        </form>
        <button type="button" className=" button button_type_close" onClick={onClose}></button>
      </div>
    </section>
  );
}

export default PopupWithForm;
