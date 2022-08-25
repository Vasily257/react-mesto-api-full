export default function ImagePopup({ card, onClose }) {
  return (
    <div
      className={`popup popup_darker popup_type_enlarge ${
        card && 'popup_opened'
      }`}
      onClick={(event) => {
        event.target === event.currentTarget && onClose();
      }}
    >
      <figure className="popup__image-container">
        <button
          className="button popup__close-button"
          type="button"
          aria-label="Закрыть форму"
          onClick={() => {
            onClose();
          }}
        ></button>
        <img
          className="popup__image"
          src={card && card.link}
          alt={`Фотография: ${card && card.name}`}
        />
        <figcaption className="popup__image-caption">
          {card && card.name}
        </figcaption>
      </figure>
    </div>
  );
}
