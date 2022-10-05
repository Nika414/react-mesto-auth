import successLogo from '../images/Union.svg'
import errorLogo from '../images/Error.svg'


function InfoTooltip({ name, isOpen, isClose, onClose, isSubmitSucceed }) {

    if (isSubmitSucceed) {
        return (
            <div className={`popup popup_purpose_${name} ${isOpen ? 'popup_opened' : ''} ${isClose ? 'popup__opened' : ''}`}  >
                <div className={`popup__container popup__container_purpose_${name}`}>
                    <button className="popup__close-button" onClick={onClose} type="button" aria-label="Закрыть"></button>
                    <img src={successLogo} alt="Знак успешной регистрации" className={`popup__${name}-image`} />
                    <p className={`popup__${name}-text`}>Вы успешно зарегистрировались!</p>
                </div>
            </div>
        )
    }
    else {
        return (
            <div className={`popup popup_purpose_${name} ${isOpen ? 'popup_opened' : ''} ${isClose ? 'popup__opened' : ''}`}  >
                <div className={`popup__container popup__container_purpose_${name}`}>
                    <button className="popup__close-button" onClick={onClose} type="button" aria-label="Закрыть"></button>
                    <img src={errorLogo} alt="Знак ошибки"className={`popup__${name}-image`} />
                    <p className={`popup__${name}-text`}>Что-то пошло не так! Попробуйте ещё раз.</p>
                </div>
            </div>
        ) 
    }
}

export default InfoTooltip