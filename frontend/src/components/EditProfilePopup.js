import React, { useState } from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext} from '../contexts/CurrentUserContext.js';

function EditProfilePopup({isOpen, onClose, onUpdateUser,handleEscClose}) {
    const currentUser = React.useContext(CurrentUserContext);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    React.useEffect(() => {
        setName(currentUser?.name ?? '');
        setDescription(currentUser?.about ?? '');
      }, [currentUser, isOpen]); 

    function handleNameChange(e) {
        setName(e.target.value);
    }

    function handleDescChange(e) {
        setDescription(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateUser({
            name: name,
            about: description,
          });
    }

    return (
        <PopupWithForm
            title='Редактировать профиль'
            name='edit-profile'
            btnName='Сохранить'
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            handleEscClose={handleEscClose}>
            <label className="popup__form-label">
                <input name="popupName" type="text" value={name || ''} onChange={handleNameChange} placeholder="Имя" id="name-input" className="popup__input popup__input_value_name" minLength="2" maxLength="40" required />
                <span className="popup__input-error name-input-error"></span>
            </label>
            <label className="popup__form-label">
                <input name="popupJob" type="text" value={description || ''} onChange={handleDescChange} placeholder="Работа" id="job-input" className="popup__input popup__input_value_job" minLength="2" maxLength="200" required />
                <span className="popup__input-error job-input-error"></span>
            </label>
        </PopupWithForm>
    )
}
export default EditProfilePopup;