// К сожалению не успел реализовать мобильную версию, но добавил валидацию

import React from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";

import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import { api } from "../utils/api.js";
import { auth } from "../utils/auth.js";

import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup.js";
import EditAvatarPopup from "./EditAvatarPopup.js";
import AddPlacePopup from "./AddPlacePopup.js";
import AuthPopup from "./AuthPopup.js";
import Login from "./Login.js";
import Register from "./Register.js";
import ProtectedRoute from "./ProtectedRoute.js";

export default function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isAuthPopupOpen, setIsAuthPopupOpen] = React.useState(false);
  const [isAuthOk, setIsAuthOk] = React.useState(false);
  const [unnessesaryCard, setUnnessesaryCard] = React.useState(undefined);
  const [cards, setCards] = React.useState([]);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState({
    name: "",
    about: "",
    avatar: "",
    email: "",
    _id: "",
    loggedIn: false,
  });
  const [loadingText, setLoadingText] = React.useState("");

  const navigate = useNavigate();

  // Проверяем токен
  React.useEffect(() => {
    auth
      .checkToken()
      .then((userData) => {
        if (userData) {
          const { email } = userData;
          setCurrentUser((prevState) => ({
            ...prevState,
            loggedIn: true,
            email: email,
          }));
          navigate("/", { replace: true });
        }
      })
      .catch(console.error);
    }, []);

  // // Запрашиваем данные пользователя и карточек
  React.useEffect(() => {
    if (currentUser.loggedIn) {
      Promise.all([api.getUserInfo(), api.getInitialCards()])
        .then(([info, initialCards]) => {
          const {about, avatar, name, _id} = info;
          setCurrentUser((prevState) => ({
            ...prevState,
            name: name,
            about: about,
            avatar: avatar,
            _id: _id,
          }));
          setCards(initialCards);
        })
        .catch(console.error);
    } else {
      return;
    }
  }, [currentUser.loggedIn]);

  // Сабмиты
  function handleUpdateUser(userData) {
    setLoadingText("Подождите...");

    api
      .editUserInfo(userData)
      .then((res) => {
        setCurrentUser((prevState) => ({
          ...prevState,
          name: res.name,
          about: res.about,
        }));
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setLoadingText("");
      });
  }

  function handleUpdateAvatar(data) {
    setLoadingText("Подождите...");

    api
      .editUserAvatar(data)
      .then((res) => {
        setCurrentUser((prevState) => ({
          ...prevState,
          avatar: res.avatar,
        }));
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setLoadingText("");
      });
  }

  function handleAddPlace(cardData) {
    setLoadingText("Подождите...");

    api
      .postCard(cardData)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setLoadingText("");
      });
  }

  function handleDeleteSubmit() {
    const newCards = cards.filter((item) => item._id !== unnessesaryCard._id);

    setLoadingText("Подождите...");

    api
      .deleteCard(unnessesaryCard._id)
      .then(() => {
        setCards(newCards);
        closeAllPopups();
      })
      .catch(console.error)
      .finally(() => {
        setLoadingText("");
      });
  }

  function handleLogIn(values) {
    setLoadingText("Подождите...");
    auth
      .signIn(values)
      .then((res) => {
        localStorage.setItem("token", res.token);
        setCurrentUser((prevState) => ({
          ...prevState,
          loggedIn: true,
          email: values.email,
        }));
        navigate("/");
      })
      .catch((err) => {
        let message;
        switch (err) {
          case 401:
            message = "Неверное имя пользователя или пароль";
            break;
          case 400:
            message = "Не передано одно из полей";
            break;
          default:
            message = "Что-то пошло не так. Попробуйте снова.";
        }
        alert(`Ошибка: ${err} - ${message}`);
      })
      .finally(() => {
        setLoadingText("");
      });
  }

  function handleSignUp(values) {
    setLoadingText("Подождите...");
    auth
      .signUp(values)
      .then(() => {
        setIsAuthOk(true);
        setIsAuthPopupOpen(true);
        navigate("/sign-in");
      })
      .catch((err) => {
        console.log(err);
        setIsAuthOk(false);
        setIsAuthPopupOpen(true);
      })
      .finally(() => {
        setLoadingText("");
      });
  }

  // Обработчики
  function closeAllPopups() {
    unnessesaryCard && setUnnessesaryCard(undefined);
    isAddPlacePopupOpen && setIsAddPlacePopupOpen(false);
    isEditAvatarPopupOpen && setIsEditAvatarPopupOpen(false);
    isEditProfilePopupOpen && setIsEditProfilePopupOpen(false);
    isAuthPopupOpen && setIsAuthPopupOpen(false);
    selectedCard.link && setSelectedCard({});
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleDeleteClick(card) {
    setUnnessesaryCard(card);
  }

  function handleCardClick(cardData) {
    setSelectedCard(cardData);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => {
      return i === currentUser._id;
    });
    console.log(isLiked);
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        console.log(newCard);
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => console.log(err));
  }

  function handleSignOut() {
    auth.signOut();
    navigate("/sign-in");
    setCurrentUser((prevState) => ({
      ...prevState,
      loggedIn: false,
      email: "",
    }));
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header loggedIn={currentUser.loggedIn} signOut={handleSignOut} />
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute
              element={Main}
              loggedIn={currentUser.loggedIn}
              cards={cards}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              onCardClick={handleCardClick}
              onCardLike={handleCardLike}
              onDeleteClick={handleDeleteClick}
            />
          }
        />
        <Route
          path="/sign-in"
          element={
            currentUser.loggedIn ? (
              <Navigate to="/" replace />
            ) : (
              <Login loadingText={loadingText} onSubmit={handleLogIn} />
            )
          }
        />
        <Route
          path="/sign-up"
          element={
            <Register loadingText={loadingText} onSubmit={handleSignUp} />
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Footer />
      <AuthPopup
        isOpen={isAuthPopupOpen}
        onClose={closeAllPopups}
        isItOk={isAuthOk}
      />
      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onSubmit={handleUpdateAvatar}
        loadingText={loadingText}
      />
      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onSubmit={handleUpdateUser}
        loadingText={loadingText}
      />
      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onSubmit={handleAddPlace}
        loadingText={loadingText}
      />
      <PopupWithForm
        name="deleteCard"
        title="Вы уверены?"
        textSubmit="Да"
        isOpen={unnessesaryCard}
        onClose={closeAllPopups}
        onSubmit={handleDeleteSubmit}
        loadingText={loadingText}
        validity={true}
      />
      <ImagePopup card={selectedCard} onClose={closeAllPopups} />
    </CurrentUserContext.Provider>
  );
}
