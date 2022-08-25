import success from '../../images/infoTooltip/success.svg';
import failure from '../../images/infoTooltip/failure.svg';

export default function InfoTooltip({
  isOpen,
  isRegistered,
  infoText,
  setInfoTooltipOpen,
}) {
  return (
    <div
      className={`popup popup_type_info ${isOpen && 'popup_opened'} `}
      onClick={(event) => {
        event.target === event.currentTarget && setInfoTooltipOpen(false);
      }}
    >
      <div className="popup__container popup__container_info-tooltip">
        <img
          className="popup__info-tooltip-image"
          src={`${isRegistered ? success : failure}`}
          alt="Статус регистрации"
        />
        <h2 className="popup__title popup__title_info-tooltip">{`${
          isRegistered ? infoText.success : infoText.failure
        }`}</h2>
        <button
          className="button popup__close-button"
          type="button"
          aria-label="Закрыть информационное окно"
          onClick={() => {
            setInfoTooltipOpen(false);
          }}
        ></button>
      </div>
    </div>
  );
}
