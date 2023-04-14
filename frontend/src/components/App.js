import React, { useEffect, useState } from 'react';
import {Routes, Route, Navigate, useNavigate} from 'react-router-dom';
import Header from './Header.js';
import Main from './Main.js';
import Register from './Register.js';
import Login from './Login.js';
import Footer from './Footer.js';
import ImagePopup from './ImagePopup.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import ProtectedRoute from "./ProtectedRoute";
import * as auth from '../auth.js';
import { api } from '../utils/Api.js';
import { CurrentUserContext} from '../contexts/CurrentUserContext.js';

function App() {
    const navigate = useNavigate();
    //Контекст данные пользователя
    const [currentUser, setCurrentUser] = useState({_id: '', name: '', about: '', description:'', avatar: ''});

    //Проверка на авторизацию пользователя
    const [loggedIn, setLoggedIn] = useState(null);

    //Email
    const [email, setEmail] = useState('');

    //POPUP
    const [isEditAvatarPopupOpen, setEditAvatarPopupState] = useState(false);
    const [isEditProfilePopupOpen, setEditProfilePopupState] = useState(false);
    const [isAddPlacePopupOpen, setAddPlacePopupState] = useState(false);
    const [isInfoTooltipOpen, setInfoTooltipState] = useState(false);

    //CARDS
    const [cards, setCardsState] = useState([]);
    const [selectedCard, setSelectedCard] = useState(null);

    useEffect(() => {
        checkToken();
    },[])

    //Получаем данные пользователя и карточки с сервера
    useEffect(() => {
        Promise.all([api.getUserInfo(), api.getInitialCards()])
            .then(([userData, cardsData]) => {
                setCurrentUser(userData);
                setCardsState(cardsData);
            })
            .catch((err) => { //попадаем сюда если один из промисов завершаться ошибкой
                console.log(err);
            })
    }, [])

    //Закрытие попапов на esc
    function handleEscClose(event) {
        if (event.key === 'Escape') {
            closeAllPopups();
        }
    }

    // Проверка токена при заходе на страницу
    function checkToken (){
        console.log(document.cookie);
        if(localStorage.getItem('jwt')){
            const jwt = localStorage.getItem('jwt');
            auth.checkToken(jwt).then((data) => {
                if(data){
                    setLoggedIn(true);
                    setEmail(data.data.email);
                    navigate("/places", {replace:true});
                }
            }).catch((err) => {
                console.log(err);
          });
        }
    }

    // Установка статуса авторизации пользователя
    function handleLogin(status){
        setLoggedIn(status);
    }
    // Закрытие попапов
    function closeAllPopups() {
        isEditAvatarPopupOpen && setEditAvatarPopupState(false);
        isEditProfilePopupOpen && setEditProfilePopupState(false);
        isAddPlacePopupOpen && setAddPlacePopupState(false);
        isInfoTooltipOpen&& setInfoTooltipState(false);
        selectedCard && setSelectedCard(null);
    }

    // Управление лайками на карточке
    function handleCardLike(card) {
        // Снова проверяем, есть ли уже лайк на этой карточке
        const isLiked = card.likes.some(i => i._id === currentUser._id);
        // Отправляем запрос в API и получаем обновлённые данные карточки
        if(isLiked) {
            api.deleteCardLike(card._id).then((newCard) => {
                setCardsState((cards) => cards.map((c) => c._id === card._id ? newCard : c));
            })
            .catch((err) => {
                console.log(err);
            })
        }
        else {
            api.setCardLikes(card._id).then((newCard) => {
                setCardsState((cards) => cards.map((c) => c._id === card._id ? newCard : c));
            })
            .catch((err) => {
                console.log(err);
            })
        }
    }

    // Удаление карточки
    function handleCardDelete(cardId) {
        api.deleteCard(cardId).then(() => {
            setCardsState((cards) => cards.filter((card) => card._id !== cardId));
        })
        .catch((err) => {
            console.log(err);
        })
    }

    //Изменение профиля
    function handleUpdateUser(userData) {
        api.updateUserInfo(userData.name, userData.about).then((userInfo) => {
            setCurrentUser(userInfo);
            closeAllPopups();
            
        })
        .catch((err) => {
            console.log(err);
        })
    }

    // Изменение аватара
    function handleUpdateAvatar (avatarLink) {
        api.editAvatar(avatarLink.avatar).then((userAvatar) => {
            setCurrentUser(userAvatar);
            closeAllPopups();
        })
        .catch((err) => {
            console.log(err);
        })
    }
    //Добавление новой карточки
    function handleAddPlaceSubmit (cardData) {
        api.addNewCard(cardData).then((newCard) => {
            setCardsState([newCard, ...cards]);
            closeAllPopups();
        })
        .catch((err) => {
            console.log(err);
        })
    }

    function handleEditAvatarClick() {
        setEditAvatarPopupState(true);
    }

    function handleEditProfileClick() {
        setEditProfilePopupState(true);
    }

    function handleAddPlaceClick() {
        setAddPlacePopupState(true);
    }

    function handleModalWindowState() {
        setInfoTooltipState(true);
    }

    function handleCardClick(card) {
        setSelectedCard(card);
    }

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className='page'>
                <div className='page__content'>
                    <Header email={email} handleLogin={handleLogin} />
                    <Routes>
                        <Route path="/" element={loggedIn ? <Navigate to="/places" replace /> : <Navigate to="/sign-in" replace />} />
                        <Route path="/sign-up" element={<Register name={'modal-window'} isOpen={isInfoTooltipOpen} onClose={closeAllPopups} onSubmitDataModal={handleModalWindowState}/>} />
                        <Route path="/sign-in" element ={<Login name={'modal-window'} handleLogin={handleLogin} isOpen={isInfoTooltipOpen} onClose={closeAllPopups} onSubmitDataModal={handleModalWindowState} />} />
                        <Route path="/places" element= 
                            {<ProtectedRoute element={Main} loggedIn={loggedIn}
                                onEditProfile={handleEditProfileClick}
                                onAddPlace={handleAddPlaceClick}
                                onEditAvatar={handleEditAvatarClick}
                                onCardClick={handleCardClick}
                                onCardLike={handleCardLike}
                                onCardDelete={handleCardDelete}
                                cards={cards}
                            />}
                        />
                    </Routes>
                    {loggedIn&&<Footer />}
                    <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} handleEscClose={handleEscClose} />
                    <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} handleEscClose={handleEscClose} />
                    <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddCard={handleAddPlaceSubmit} handleEscClose={handleEscClose} />
                    <ImagePopup card={selectedCard} onClose={closeAllPopups} handleEscClose={handleEscClose} />
                </div>
            </div>
        </CurrentUserContext.Provider>
    );
}

export default App;
