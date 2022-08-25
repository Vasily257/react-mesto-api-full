import PopupWithForm from '../PopupWithForm/PopupWithForm';

export default function ConfirmActionPopup({
  isOpen,
  onClose,
  card,
  onConfirmAction,
}) {
  function handleSubmit(event) {
    event.preventDefault();
    onConfirmAction(card);
  }

  return (
    <PopupWithForm
      name="confirm"
      title="Вы уверены?"
      submitButtonText="Да"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    />
  );
}
