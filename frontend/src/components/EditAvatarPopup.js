import React, { useRef, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({isOpen, onClose, onUpdateAvatar, handleEscClose}) {
    const avatar = useRef();

    useEffect(() => {
        avatar.current.value = '';
      }, [isOpen]); 

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateAvatar({
          avatar: avatar.current.value
        });
      }
    return (
        <PopupWithForm
            title='Обновить аватар'
            name='edit-avatar'
            btnName='Сохранить'
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            handleEscClose={handleEscClose}>
            <label className="popup__form-label">
                <input name="popupAvatar" type="url" ref={avatar} placeholder="Ссылка на аватарку" id="avatar-input" className="popup__input popup__input_value_avatar" required />
                <span className="popup__input-error avatar-input-error"></span>
            </label>
        </PopupWithForm>
    )
}

export default EditAvatarPopup;