import React from 'react';
import Card from './Card.js';
import { CurrentUserContext} from '../contexts/CurrentUserContext.js';

function Main({onEditProfile, onAddPlace, onEditAvatar, onCardClick, onCardLike, onCardDelete, cards}) {
    const currentUser = React.useContext(CurrentUserContext);

    return (
        <main className="content">
            <section className="profile">
                <div className="profile__pack">
                    <div className="profile__avatar-container" onClick={onEditAvatar}>
                        <div className="profile__avatar-edit-button"></div>
                        <div style={{ backgroundImage: `url(${currentUser.avatar})` }} className="profile__avatar"></div>
                    </div>
                    <div className="profile__info">
                        <button type="button" aria-label="Изменить" className="profile__edit-button" onClick={onEditProfile}></button>
                        <h1 className="profile__name">{currentUser.name}</h1>
                        <p className="profile__description">{currentUser.about}</p>
                    </div>
                </div>
                <button type="button" aria-label="Добавить" className="profile__add-button" onClick={onAddPlace}></button>
            </section>
            <section className="elements">
                <ul className="elements__container">
                    {cards.map((card) => (<Card key={card._id} card = {card} onCardClick={onCardClick} onCardLike={onCardLike} onCardDelete={onCardDelete}/>))}
                </ul>
            </section>
        </main>
    );
}

export default Main;