import { useContext } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

export default function Card({
  _id,
  owner,
  name,
  link,
  likes,
  onCardClick,
  onCardLike,
  onCardDelete,
}) {
  const currentUser = useContext(CurrentUserContext);

  const isOwn = owner._id === currentUser._id;
  const cardDeleteButtonClassName = `button place__delete-button 
  ${!isOwn && 'place__delete-button_hidden'}`;

  const isLiked = likes.some((like) => like._id === currentUser._id);
  const cardLikeButtonClassName = `button place__like-button 
  ${isLiked && 'place__like-button_active'}`;

  return (
    <li className="places__item place">
      <button
        className={cardDeleteButtonClassName}
        type="button"
        aria-label="Удалить элемент"
        onClick={() => {
          onCardDelete({ _id });
        }}
      ></button>
      <div className="place__image-container">
        <button
          className="button place__enlarge-button"
          type="button"
          aria-label="Увеличить изображение"
          onClick={() => {
            onCardClick({ name, link });
          }}
        >
          <img
            className="place__image"
            src={link}
            alt={`Фотография: ${name}`}
          />
        </button>
      </div>
      <div className="place__panel">
        <p className="place__title">{name}</p>
        <div className="place__like-container">
          <button
            className={cardLikeButtonClassName}
            type="button"
            aria-label="Изменить отметку «Мне нравится»"
            onClick={() => {
              onCardLike({ likes, _id });
            }}
          ></button>
          <p className="place__like-counter">{likes.length}</p>
        </div>
      </div>
    </li>
  );
}
