import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { useContext, useEffect } from 'react';
import PopupWithForm from '../PopupWithForm/PopupWithForm';

import useForm from '../../hooks/useForm';

export default function EditProfilePopup({ isOpen, onClose, isPopup, onUpdateUser }) {
  const currentUser = useContext(CurrentUserContext);

  const {
    values,
    errors,
    isValid,
    handleChange,
    resetForm,
    setValues,

    setIsValid,
  } = useForm({ name: '', about: '' });

  function handleSubmit(event) {
    event.preventDefault();
    onUpdateUser({ name: values.name, about: values.about });
  }

  useEffect(() => {
    setValues({ name: currentUser.name, about: currentUser.about });
    setIsValid(true);
  }, [currentUser, setValues, setIsValid, isOpen]);

  return (
    <PopupWithForm
      name="edit"
      title="Редактировать профиль"
      submitButtonText="Сохранить"
      isOpen={isOpen}
      isPopup={isPopup}
      onClose={onClose}
      onSubmit={handleSubmit}
      onReset={resetForm}
      isValid={isValid}
    >
      <p className="popup__field">
        <label className="visually-hidden" htmlFor="name-input">
          Имя
        </label>
        <input
          className="popup__input popup__input_place_up"
          id="name-input"
          type="text"
          name="name"
          value={values.name}
          onChange={handleChange}
          minLength="2"
          maxLength="40"
          required
        />
        <span className={`popup__error ${!isValid && 'popup__error_active'}`}>
          {!isValid && errors.name}
        </span>
      </p>
      <p className="popup__field">
        <label className="visually-hidden" htmlFor="about-input">
          Вид деятельности
        </label>
        <input
          className="popup__input popup__input_place_down"
          id="about-input"
          type="text"
          name="about"
          value={values.about}
          onChange={handleChange}
          minLength="2"
          maxLength="200"
          required
        />
        <span
          className={`popup__error ${errors.about && 'popup__error_active'}`}
        >
          {errors.about}
        </span>
      </p>
    </PopupWithForm>
  );
}
