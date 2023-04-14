import React from 'react';
import { CurrentUserContext} from '../contexts/CurrentUserContext.js';

function Card ({card, onCardClick, onCardLike, onCardDelete}) {
    const currentUser = React.useContext(CurrentUserContext);
    const isOwn = card.owner._id === currentUser._id;
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    // Создаём переменную, которую после зададим в `className` для кнопки лайка
    const cardLikeButtonClassName = ( 
        `elements__like-icon ${isLiked && 'elements__like-icon_active'}` 
      );
    function handleClick() {
        onCardClick(card);
    }

    function handleCardLike() {
        onCardLike(card);
    }

    function handleDeleteClick(){
        onCardDelete(card._id);
    }

    return (
            <li className="elements__item" key = {card._id}>
                {isOwn && <button type="button" aria-label="Удалить" className='elements__trash-button' onClick={handleDeleteClick} />} 
                <div style={{ backgroundImage: `url(${card.link})` }} className="elements__image" onClick={handleClick}></div>
                <div className="elements__item-description">
                    <h3 className="elements__title">{card.name}</h3>
                    <div className="elements__like-container">
                        <button type="button" aria-label="Лайк" className={cardLikeButtonClassName} onClick={handleCardLike}></button>
                        <p className="elements__like-count">{card.likes.length}</p>
                    </div>
                </div>
            </li>
    );
}

export default Card;