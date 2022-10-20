import PopupWithForm from "./PopupWithForm";
import { useRef } from 'react';


export default function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
    const avatarRef = useRef();

    

    function onSubmit(e) {
     
        e.preventDefault();
        onUpdateAvatar({
            avatar: avatarRef.current.value,
        });
        handleClear();
    }

    function handleClear() {
        avatarRef.current.value = '';
    }

    return (
        <PopupWithForm onSubmit={onSubmit} onClose={onClose} isOpen={isOpen} name="avatar-edit" title="Обновить аватар" buttonText="Сохранить">
            <label className="popup__form-label_value_avatar-link popup__form-label">
                <input name="avatar"className="popup__form-item popup__form-item_value_avatar-link" ref={avatarRef} type="url" id="avatar"
                    placeholder="Ссылка на твой новый аватар" minLength="2" />
                <span className={`avatar-input-error popup__form-item-error'}`}></span>
            </label>
        </PopupWithForm>)
}