import PopupWithForm from "./PopupWithForm";
import { useEffect, useState, useContext } from 'react';
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
    const contextValue = useContext(CurrentUserContext);
    const [name, setName] = useState('');
    const [bio, setBio] = useState('');

    useEffect(() => {
        setName(contextValue.currentUser.name);
        setBio(contextValue.currentUser.about);
    }, [contextValue.currentUser, isOpen]);

    function handleNameChange(e) {
        setName(e.target.value);
    }

    function handleBioChange(e) {
        setBio(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateUser({
            name,
            about: bio,
        });
    }

    return (
        <PopupWithForm onClose={onClose} isOpen={isOpen} isClose={!isOpen} onSubmit={handleSubmit}
            name="edit-profile" title="Редактировать профиль" buttonText="Сохранить">
            <label className="popup__form-label">
                <input onChange={handleNameChange} className="popup__form-item popup__form-item_value_name" type="text" name="name" id="fullname"
                    placeholder="Имя" required minLength="2" maxLength="40" value={name || ''} />
                <span className="fullname-input-error popup__form-item-error"></span>
            </label>,
            <label className="popup__form-label">
                <input onChange={handleBioChange} className="popup__form-item popup__form-item_value_about" type="text" name="about" id="about"
                    placeholder="О себе" required minLength="2" maxLength="200" value={bio || ''} />
                <span className="about-input-error popup__form-item-error"></span>
            </label>
        </PopupWithForm >
    )
}