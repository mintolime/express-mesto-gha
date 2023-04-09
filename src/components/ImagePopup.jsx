function ImagePopup({card,onClose,isOpen}) {
  return (
      <section className={`popup popup_image  ${isOpen ? 'popup_opened' : ''}`} aria-label="фотографии карточек">
        <div className="popup__container popup__container_image ">
          <figure className="figure">
            <img className="figure__image" src={card.link} alt={card.name} />
            <figcaption className="figure__info">{card.name}</figcaption>
          </figure>
          <button type="button" className=" button button_type_close" onClick={onClose}></button>
        </div>
      </section>
    )
}

export default ImagePopup;
