import successLogo from '../images/Union.svg'


function InfoTooltip({ name, isOpen, isClose, onClose }) {

    return (
        <div className={`popup popup_purpose_${name} ${isOpen ? 'popup_opened' : ''} ${isClose ? 'popup__opened' : ''}`}  >
            <div className="popup__container">
                <button className="popup__close-button" onClick={onClose} type="button" aria-label="Закрыть"></button>
                <img src={successLogo} className="popup__success-image" />
                <p className="popup__text">Вы успешно зарегистрировались!</p>
            </div>
        </div>
    )
}

export default InfoTooltip