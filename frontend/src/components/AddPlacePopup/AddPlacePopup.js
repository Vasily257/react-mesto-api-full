import { useEffect } from 'react';
import PopupWithForm from '../PopupWithForm/PopupWithForm';

import useForm from '../../hooks/useForm';

export default function AddPlacePopup({
  isOpen,
  onClose,
  isPopup,
  onAddPlace,
}) {
  const {
    values,
    errors,
    isValid,
    handleChange,
    resetForm,
    setValues,
    setIsValid,
  } = useForm({ place: '', link: '' });

  function handleSubmit(event) {
    event.preventDefault();
    onAddPlace({ name: values.place, link: values.link });
  }

  useEffect(() => {
    setValues({ place: '', link: '' });
    setIsValid(false);
  }, [setValues, setIsValid, isOpen]);

  return (
    <PopupWithForm
      name="add"
      title="Новое место"
      submitButtonText="Создать"
      isOpen={isOpen}
      isPopup={isPopup}
      onClose={onClose}
      onSubmit={handleSubmit}
      onReset={resetForm}
      isValid={isValid}
    >
      <p className="popup__field">
        <label className="visually-hidden" htmlFor="place-input">
          Название места
        </label>
        <input
          className="popup__input popup__input_place_up"
          id="place-input"
          type="text"
          name="place"
          placeholder="Название"
          value={values.place}
          onChange={handleChange}
          minLength="2"
          maxLength="30"
          required
        />
        <span
          className={`popup__error ${errors.place && 'popup__error_active'}`}
        >
          {errors.place}
        </span>
      </p>
      <p className="popup__field">
        <label className="visually-hidden" htmlFor="link-input">
          Ссылка
        </label>
        <input
          className="popup__input popup__input_place_down"
          id="link-input"
          type="url"
          name="link"
          placeholder="Ссылка на картинку"
          value={values.link}
          onChange={handleChange}
          required
        />
        <span
          className={`popup__error ${errors.link && 'popup__error_active'}`}
        >
          {errors.link}
        </span>
      </p>
    </PopupWithForm>
  );
}
