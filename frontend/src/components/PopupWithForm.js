import React, {useEffect} from "react";
function PopupWithForm(props) {
    function closePopup(e) {
        if (e.target.classList.contains('popup_is-opened') || e.target.classList.contains('popup__close'))
        {
            props.onClose();
        }
    }

    useEffect(() => {
        document.addEventListener('keydown', props.handleEscClose);
        console.log('start');
        return () => {
            document.removeEventListener('keydown', props.handleEscClose);
            console.log('end');
        }
    });

    return (
        <div className={`popup popup_type_${props.name} ${props.isOpen ? 'popup_is-opened' : ''}`} onClick={closePopup}>
            <div className="popup__container">
                <button type="button" className="popup__close"></button>
                <div className="popup__content">
                    <h2 className="popup__title">{props.title}</h2>
                    <form action="#" name={props.name} className="popup__form popup__form_type_edit-profile" onSubmit={props.onSubmit}>
                        {props.children}
                        <button type="submit" className="popup__save">{props.btnName}</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default PopupWithForm;   