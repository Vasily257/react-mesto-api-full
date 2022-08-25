import { useState, useEffect, useContext } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { CardsContext } from '../../contexts/CardsContext';
import { SpinnerContext } from '../../contexts/SpinnerContext';

import Main from '../Main/Main';
import Footer from '../Footer/Footer';

import EditProfilePopup from '../EditProfilePopup/EditProfilePopup';
import EditAvatarPopup from '../EditAvatarPopup/EditAvatarPopup';
import AddPlacePopup from '../AddPlacePopup/AddPlacePopup';
import ImagePopup from '../ImagePopup/ImagePopup';
import ConfirmActionPopup from '../СonfirmActionPopup/ConfirmActionPopup';

import { api } from '../../utils/api';

export default function Home() {
  const { cards, setCards } = useContext(CardsContext);
  const { setIsSpinnerShown } = useContext(SpinnerContext);

  const [currentUser, setCurrentUser] = useState({
    name: 'Загрузка...',
    about: 'Загрузка...',
    avatar: 'https://dummyimage.com/120',
  });

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);

  const [isConfirmActionPopupOpen, setIsConfirmActionPopupOpen] =
    useState(false);

  const [selectedCard, setSelectedCard] = useState(null);
  const [deletedCard, setDeletedCard] = useState(null);

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleCardClick(currentCard) {
    setSelectedCard(currentCard);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((like) => like._id === currentUser._id);

    api
      .changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((prevState) =>
          prevState.map((prevCard) => {
            return prevCard._id === card._id
              ? { ...newCard, key: card._id }
              : { ...prevCard, key: prevCard._id };
          })
        );
      })
      .catch((error) => console.log(`Ошибка: ${error}`));
  }

  function deleteCard(card) {
    setIsSpinnerShown(true);

    api
      .deleteCard(card._id)
      .then(() => {
        setCards((prevState) => {
          return prevState.filter((prevCard) => prevCard._id !== card._id);
        });
        closeAllPopups();
      })
      .catch((error) => console.log(`Ошибка: ${error}`))
      .finally(() => {
        setIsSpinnerShown(false);
      });
  }

  function handleCardDelete(deletedCard) {
    setIsConfirmActionPopupOpen(true);
    setDeletedCard(deletedCard);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsConfirmActionPopupOpen(false);

    setSelectedCard(null);
    setDeletedCard(null);
  }

  function handleUpdateUser(userInfo) {
    setIsSpinnerShown(true);

    api
      .editUserInfo(userInfo)
      .then((resWithUserInfo) => {
        setCurrentUser(resWithUserInfo);
        closeAllPopups();
      })
      .catch((error) => console.log(`Ошибка: ${error}`))
      .finally(() => {
        setIsSpinnerShown(false);
      });
  }

  function handleUpdateAvatar(avatar) {
    setIsSpinnerShown(true);

    api
      .updateAvatar(avatar)
      .then((resWithAvatar) => {
        setCurrentUser(resWithAvatar);
        closeAllPopups();
      })
      .catch((error) => console.log(`Ошибка: ${error}`))
      .finally(() => {
        setIsSpinnerShown(false);
      });
  }

  function handleAddPlaceSubmit(popupData) {
    setIsSpinnerShown(true);

    api
      .addNewCard(popupData)
      .then((newCard) => {
        setCards([{ ...newCard, key: newCard._id }, ...cards]);
        closeAllPopups();
      })
      .catch((error) => console.log(`Ошибка: ${error}`))
      .finally(() => {
        setIsSpinnerShown(false);
      });
  }

  useEffect(() => {
    setIsSpinnerShown(true);

    api
      .getInitialData()
      .then((initialData) => {
        const [userData, initialCardsData] = initialData;

        setCurrentUser(userData);

        setCards(
          initialCardsData.map((item) => ({
            name: item.name,
            link: item.link,
            likes: item.likes,
            owner: item.owner,
            _id: item._id,
          }))
        );
      })
      .catch((error) => console.log(`Ошибка: ${error}`))
      .finally(() => setIsSpinnerShown(false));
  }, [setIsSpinnerShown, setCards]);

  return (
    <>
      <CurrentUserContext.Provider value={currentUser}>
        <Main
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          cards={cards}
          onCardClick={handleCardClick}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
        />
      </CurrentUserContext.Provider>

      <Footer />

      <CurrentUserContext.Provider value={currentUser}>
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          isPopup={true}
          onUpdateUser={handleUpdateUser}
        />
      </CurrentUserContext.Provider>

      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        isPopup={true}
        onAddPlace={handleAddPlaceSubmit}
      />

      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        isPopup={true}
        onUpdateAvatar={handleUpdateAvatar}
      />

      <ConfirmActionPopup
        isOpen={isConfirmActionPopupOpen}
        onClose={closeAllPopups}
        isPopup={true}
        card={deletedCard}
        onConfirmAction={deleteCard}
      />

      <ImagePopup card={selectedCard} onClose={closeAllPopups} />
    </>
  );
}
