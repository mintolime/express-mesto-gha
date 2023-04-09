import React from 'react';
import { CurrentUserContext } from '../context/CurrentUserContext';

function Card({ card, onCardClick, onCardDeleteClick, onCardLikeClick }) {
  const currentUser = React.useContext(CurrentUserContext);

  const isOwn = card.owner._id === currentUser._id;
  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = card.likes.some((i) => i._id === currentUser._id);

  // Создаём переменную, которую после зададим в `className` для кнопки лайка
  const cardLikeButtonClassName = `button button_type_like ${isLiked && 'button_type_like_active'}`;

  return (
      <li className="cards__item">
        <img
          onClick={() => onCardClick(card)}
          className="cards__image"
          src={card.link}
          alt={card.name}
        />
        <div className="cards__inner">
          <h2 className="cards__title">{card.name}</h2>
          <div className="cards__likes_items">
            <button
              className={cardLikeButtonClassName}
              type="button"
              onClick={() => onCardLikeClick(card)}></button>
            <span className="cards__likes_score">
              {card.likes.length < 1 ? '' : card.likes.length}
            </span>
          </div>
        </div>
        {isOwn && (
          <button className="button button_type_delete" onClick={() => onCardDeleteClick(card)} />
        )}
      </li>
  );
}

export default Card;
