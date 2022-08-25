import { useEffect, useRef } from 'react';
import PopupWithForm from '../PopupWithForm/PopupWithForm';

import useForm from '../../hooks/useForm';

export default function EditAvatarPopup({ isOpen, onClose, isPopup, onUpdateAvatar }) {
  const avatarRef = useRef();

  const { errors, isValid, handleChange, resetForm, setValues, setIsValid } =
    useForm({ avatar: '' });

  function clearInput() {
    avatarRef.current.value = '';
  }

  function handleSubmit(event) {
    event.preventDefault();
    onUpdateAvatar({ avatar: avatarRef.current.value });
    clearInput();
  }

  useEffect(() => {
    setValues({ avatar: '' });
    setIsValid(false);
  }, [setValues, setIsValid, isOpen]);

  return (
    <PopupWithForm
      name="update-avatar"
      title="Обновить аватар"
      submitButtonText="Сохранить"
      isOpen={isOpen}
      isPopup={isPopup}
      onClose={onClose}
      onSubmit={handleSubmit}
      onReset={() => {
        resetForm();
        clearInput();
      }}
      isValid={isValid}
    >
      <p className="popup__field">
        <label className="visually-hidden" htmlFor="avatar-input">
          Ссылка
        </label>
        <input
          className="popup__input popup__input_place_up"
          id="avatar-input"
          type="url"
          name="avatar"
          placeholder="Ссылка на новый аватар"
          ref={avatarRef}
          onChange={handleChange}
          required
        />
        <span
          className={`popup__error ${errors.avatar && 'popup__error_active'}`}
        >
          {errors.avatar}
        </span>
      </p>
    </PopupWithForm>
  );
}
