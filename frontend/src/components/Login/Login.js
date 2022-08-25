import { useEffect } from 'react';

import useForm from '../../hooks/useForm';

export default function Login({ onLogin }) {
  const { values, errors, isValid, handleChange, setValues, setIsValid } =
    useForm({ email: '', password: '' });

  function handleSubmit(event) {
    event.preventDefault();
    onLogin({ email: values.email, password: values.password });
  }

  useEffect(() => {
    setValues({ email: '', password: '' });
    setIsValid(false);
  }, [setValues, setIsValid]);

  return (
    <div className={'popup popup_type_login popup_opened popup_not-popup'}>
      <div className={'popup__container popup__container_not-popup'}>
        <h2 className={'popup__title popup__title_not-popup'}>Вход</h2>
        <form
          className={`popup__form`}
          name="login"
          onSubmit={handleSubmit}
          noValidate
        >
          <p className="popup__field">
            <label className="visually-hidden" htmlFor="place-input">
              Электронная почта
            </label>
            <input
              className="popup__input popup__input_place_up popup__input_not-popup"
              id="email-input"
              type="email"
              name="email"
              placeholder="Email"
              value={values.email}
              onChange={handleChange}
              minLength="2"
              maxLength="30"
              required
            />
            <span
              className={`popup__error ${
                errors.email && 'popup__error_active'
              } popup__error_not-popup`}
            >
              {errors.email}
            </span>
          </p>
          <p className="popup__field">
            <label className="visually-hidden" htmlFor="password-input">
              Пароль
            </label>
            <input
              className="popup__input popup__input_place_down popup__input_not-popup"
              id="password-input"
              type="password"
              name="password"
              placeholder="Пароль"
              value={values.link}
              onChange={handleChange}
              minLength="8"
              maxLength="32"
              required
            />
            <span
              className={`popup__error ${
                errors.password && 'popup__error_active'
              } popup__error_not-popup`}
            >
              {errors.password}
            </span>
          </p>
          <button
            className={`button popup__submit-button ${
              !isValid && 'popup__submit-button_disabled'
            } popup_submit-button_not-popup`}
            type="submit"
            disabled={!isValid}
          >
            Войти
          </button>
        </form>
      </div>
    </div>
  );
}
