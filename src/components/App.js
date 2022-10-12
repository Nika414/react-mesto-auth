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
import { Route, Switch, useHistory, useLocation } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import ProtectedRoute from "./ProtectedRoute";
import InfoTooltip from './InfoTooltip';
import { registerApi, loginApi, getContent } from '../utils/Auth';

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [isSubmitSucceed, setIsSubmitSucceed] = useState(true)
  const history = useHistory();
  const location = useLocation()


  useEffect(() => {
    
    Promise.all([api.getProfileInfo(), api.getCardsInfo()])
      .then(([dataUser, dataCards]) => {
        setCurrentUser(dataUser)
        setCards(dataCards);
      })
      .catch((err) => { console.log(err) })
      tokenCheck();
  }, [])


  function handleLogin(password, email) {
    loginApi(password, email)
      .then(res => res.json())
      .then((res) => {
        if (!res.token) throw new Error('Missing jwt');
        localStorage.setItem('jwt', res.token);
        setLoggedIn(true);
        setCurrentUser({
          ...currentUser,
          email: email
        });
        history.push('/')
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const tokenCheck = () => {

    const jwt = localStorage.getItem('jwt');

    if (!jwt) return;
    getContent(jwt)
      .then(res => res.json())
      .then((data) => {
        console.log(data);
        setLoggedIn(true);
        history.push('/');
        setCurrentUser({
          ...currentUser,
          email: data.data.email
        });
        console.log(currentUser);
        
      })
      .catch((error) => {
        console.log(error);
      });
  };

function handleLogout() {
  localStorage.removeItem('jwt');
  setLoggedIn(false);
  history.push('/sign-in');
};

  function handleRegister(password, email) {
    registerApi(password, email)
      .then((res) => {
        if (res.status === 201) {
          handleSetIsInfoTooltipOpen(true);
        }
        else {
          handleSetIsInfoTooltipOpen(false)
        }
      })
      .catch((error) => {
        console.log(error);
      });

  }
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
    setIsSubmitSucceed(isSubmitSucceed);
    setIsInfoTooltipOpen(true);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard({});
  }

  function closeInfoToolTip() {
    setIsInfoTooltipOpen(false);
    history.push('/sign-in');
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
          setCardsLike(res, card);
        })
        .catch((err) => { console.log(err) })

    }
    else {
      api.putLike(card._id)
        .then((res) => {
          setCardsLike(res, card);
        })
        .catch((err) => { console.log(err) })
    }
  }

  function setCardsLike(res, card) {
    setCards((state) => state.map((c) => c._id === card._id ? res : c))
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
    <CurrentUserContext.Provider value={{ currentUser }}>
      <div className="App">
        <Header loggedIn={loggedIn} location={location.pathname} onLogout={handleLogout} />
        <Switch>
          <ProtectedRoute exact path="/" loggedIn={loggedIn}>
            <Main cards={cards} onCardLike={handleCardLike} onCardDelete={handleCardDelete}
              onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick} onCardClick={handleCardClick} />
          </ProtectedRoute>
          <Route path="/sign-up">
            <Register onRegister={handleRegister} />
            <InfoTooltip name="info-tooltip" isSubmitSucceed={isSubmitSucceed} isOpen={isInfoTooltipOpen} isClose={!isInfoTooltipOpen} onClose={closeInfoToolTip} />
          </Route>
          <Route path="/sign-in">
            <Login onLogin={handleLogin} />
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
