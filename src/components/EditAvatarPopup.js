import PopupWithForm from "./PopupWithForm";
import { useEffect, useRef } from 'react';


export default function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
    const avatarRef = useRef();

    function handleSubmit(e) {
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
        <PopupWithForm onSubmit={handleSubmit} onClose={onClose} isOpen={isOpen} isClose={!isOpen} name="avatar-edit" title="Обновить аватар" buttonText="Сохранить">
            <label className="popup__form-label_value_avatar-link popup__form-label">
                <input ref={avatarRef} className="popup__form-item popup__form-item_value_avatar-link" type="url" name="avatar" id="avatar"
                    placeholder="Ссылка на твой новый аватар" minLength="2" required />
                <span className="avatar-input-error popup__form-item-error"></span>
            </label>
        </PopupWithForm>)
}