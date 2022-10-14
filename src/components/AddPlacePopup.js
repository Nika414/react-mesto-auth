import PopupWithForm from "./PopupWithForm";
import { useEffect, useState } from 'react';

export default function AddPlacePopup({ onClose, isOpen, onAddPlace }) {
    const [name, setName] = useState('');
    const [link, setLink] = useState('');

    useEffect(() => {
        setName('');
        setLink('');
    }, [isOpen]);

    function handleNameChange(e) {
        setName(e.target.value);
    }

    function handleLinkChange(e) {
        setLink(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        onAddPlace({
            name,
            link,
        });

    }

    return (<PopupWithForm onSubmit={handleSubmit} onClose={onClose} isOpen={isOpen} name="add-place" title="Новое место" buttonText="Создать">

        <label className="popup__form-label">
            <input onChange={handleNameChange} className="popup__form-item popup__form-item_value_placename" type="text" value={name} name="name" id="placename"
                placeholder="Название" minLength="2" maxLength="30" required />
            <span className="placename-input-error popup__form-item-error"></span>
        </label>
        <label className="popup__form-label">
            <input onChange={handleLinkChange} value={link} type="url" className="popup__form-item popup__form-item_value_placelink" name="link" id="placelink"
                placeholder="Ссылка на картинку" required />
            <span className="placelink-input-error popup__form-item-error"></span>
        </label>
        </PopupWithForm>)
}