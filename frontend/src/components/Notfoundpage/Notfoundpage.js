import { Link } from 'react-router-dom';

export default function Notfoundpage() {
  return (
    <div className={'popup popup_type_login popup_opened popup_not-popup'}>
      <div className={'popup__container popup__container_not-popup'}>
        <h2 className={'popup__title popup__title_not-popup'}>
          Здесь ничего нет
        </h2>
        <div className="popup__footer">
          <Link to="/" className="button popup__footer-button">
            Вернуться на главную
          </Link>
        </div>
      </div>
    </div>
  );
}
