import React, { useState, useEffect } from 'react';
import Header from './Header'
import Main from './Main'
import Footer from './Footer'
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import api from '../utils/api.js';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import { Route, Switch, Redirect } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import ProtectedRoute from "./ProtectedRoute";
import InfoTooltip from './InfoTooltip';

function App() {
  const [currentUser, setCurrentUser] = useState('');
  const [cards, setCards] = useState([]);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [loggedIn, setLoggedIn] = useState(true);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [isSubmitSucceed, setIsSubmitSucceed] = useState(false)

  useEffect(() => {
    Promise.all([api.getProfileInfo(), api.getCardsInfo()])
      .then(([dataUser, dataCards]) => {
        setCurrentUser(dataUser);
        setCards(dataCards);
        console.log(dataUser);
      })
      .catch((err) => { console.log(err) })
  }, [])

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);

  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true)
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleSetIsInfoTooltipOpen(isSubmitSucceed) {
    setIsInfoTooltipOpen(true);
    setIsSubmitSucceed(isSubmitSucceed)
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsInfoTooltipOpen(false)
    setSelectedCard({});
  }

  function handleUpdateUser(data) {
    api.changeInfo(data)
      .then((res) => { setCurrentUser(res); closeAllPopups(); })
      .catch((err) => { console.log(err) })

  }

  function handleUpdateAvatar(data) {
    api.changeAvatar(data)
      .then((res) => { setCurrentUser(res); closeAllPopups(); })
      .catch((err) => { console.log(err) })

  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    if (isLiked) {
      api.deleteLike(card._id)
        .then((res) => {
          setCards((state) => state.map((c) => c._id === card._id ? res : c))
        })
        .catch((err) => { console.log(err) })

    }
    else {
      api.putLike(card._id)
        .then((res) => {
          setCards((state) => state.map((c) => c._id === card._id ? res : c))
        })
        .catch((err) => { console.log(err) })
    }

  }

  function handleCardDelete(card) {
    api.deleteCardById(card._id)
      .then(() => {
        const newCards = cards.filter((item) => {
          return item._id !== card._id;
        })
        setCards(newCards)
      })
      .catch((err) => { console.log(err) })

  }

  function handleAddPlaceSubmit(newCard) {
    api.createCard(newCard)
      .then((res) => { setCards([res, ...cards]); closeAllPopups(); })
      .catch((err) => { console.log(err) })

  }

  return (
    <CurrentUserContext.Provider value={{ currentUser, loggedIn }}>
      <div className="App">
        <Header />
        <Switch>
          <ProtectedRoute exact path="/" loggedIn={loggedIn}>
            <Main cards={cards} onCardLike={handleCardLike} onCardDelete={handleCardDelete}
              onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick} onCardClick={handleCardClick} />
          </ProtectedRoute>
          <Route path="/sign-up">
            <Register onSubmit={handleSetIsInfoTooltipOpen} />
            <InfoTooltip name="info-tooltip" isSubmitSucceed={isSubmitSucceed} isOpen={isInfoTooltipOpen} isClose={!isInfoTooltipOpen} onClose={closeAllPopups} />
          </Route>
          <Route path="/sign-in">
            <Login />
          </Route>
        </Switch>
        <Footer />
        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
        <AddPlacePopup onAddPlace={handleAddPlaceSubmit} onClose={closeAllPopups} isOpen={isAddPlacePopupOpen} isClose={!isAddPlacePopupOpen} />
        <PopupWithForm name="delete-card" title="Вы уверены?" buttonText="Да" />
        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
        <ImagePopup onClose={closeAllPopups} card={selectedCard} />

      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
