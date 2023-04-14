function InfoTooltip(props) {
    function closePopup(e) {
        if (e.target.classList.contains('popup_is-opened') || e.target.classList.contains('popup__close'))
        {
            props.onClose();
        }
    }
    return (
        <div className={`popup popup_type_${props.name} ${props.isOpen ? 'popup_is-opened' : ''}`} onClick={closePopup}>
            <div className="popup__container">
                <button type="button" className="popup__close"></button>
                <div className="popup__content">
                    <div className="popup__modal-img" style={{backgroundImage: `url(${props.url})`}}></div>
                    <h2 className="popup__modal-title">{props.title}</h2>
                </div>
            </div>
        </div>
    );
}

export default InfoTooltip;