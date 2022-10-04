function PopupWithForm({ name, isOpen, isClose, onClose, buttonText, title, children, onSubmit }) {

    return (
        <div className={`popup popup_purpose_${name} ${isOpen ? 'popup_opened' : ''} ${isClose ? 'popup__opened' : ''}`}  >
            <div className="popup__container">
                <button className="popup__close-button" onClick={onClose} type="button" aria-label="Закрыть"></button>
                <h2 className="popup__title">{title}</h2>
                <form onSubmit={onSubmit} className={`popup__form popup__${name}-form`} name={`popup__${name}-form`} method="post" noValidate>
                    {children}
                    <button className="popup__form-button" type="submit">{buttonText}</button>
                </form>
            </div>
        </div>
    )
}

export default PopupWithForm