import React from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({isOpen, onClose, onAddCard,handleEscClose}) {

    const [name, setName] = React.useState('');
    const [link, setLink] = React.useState('');

    React.useEffect(() => {
        setName('');
        setLink('');
    },[]);

    function handleNameChange(e) {
        setName(e.target.value);
    }

    function handleLinkChange(e) {
        setLink(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        onAddCard(
            {
                popupName: name,
                popupImg: link
            }
        )
    }

    return (
        <PopupWithForm
            title='Новое место'
            name='add-card'
            btnName='Создать'
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            handleEscClose={handleEscClose}>
            <label className="popup__form-label">
                <input name="popupName" type="text" value={name || ''} onChange={handleNameChange} placeholder="Название" id="place-input"  className="popup__input popup__input_value_name" required minLength="2" maxLength="30" />
                <span className="popup__input-error place-input-error"></span>
            </label>
            <label className="popup__form-label">
                <input name="popupImg"  type="url" value={link || ''} onChange={handleLinkChange} placeholder="Ссылка на картинку" id="url-input" className="popup__input popup__input_value_img" required />
                <span className="popup__input-error url-input-error"></span>
            </label>
        </PopupWithForm>
    )
}

export default AddPlacePopup;