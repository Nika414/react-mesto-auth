import PopupWithForm from "./PopupWithForm";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export default function AddPlacePopup({ onClose, isOpen, onAddPlace }) {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");

  useEffect(() => {
    setName("");
    setLink("");
  }, [isOpen]);

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm({
    mode: 'onBlur',
    reValidateMode: 'onChange'
    
  })


  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleLinkChange(e) {
    setLink(e.target.value);
  }

  function onSubmit() {
    onAddPlace({
      name,
      link,
    });
   
  }
  
  return (
    
    <PopupWithForm
      onSubmit={handleSubmit(onSubmit)}
      onClose={onClose}
      isOpen={isOpen}
      name="add-place"
      title="Новое место"
      buttonText="Создать"
      isValid={isValid}
    >
      <label className="popup__form-label">
        <input
        {...register("name", {
            required: "Поле обязательно к заполнению",
            minLength: {
                value: 2,
                message: "Минимум 2 символа"
            },
            maxLength: {
                value:30,
                message:"Максимум 30 символов"
            }
        })}
          onChange={handleNameChange}
          className="popup__form-item popup__form-item_value_placename"
          type="text"
          value={name}
          id="placename"
          placeholder="Название"
          maxLength="30"
        
        />
        <span className={`placename-input-error popup__form-item-error ${errors?.name && 'popup__form-item-error_active'}`}>{errors?.name?.message}</span>
      </label>
      <label className="popup__form-label">
        <input
        {...register("link", {
            required: "Поле обязательно к заполнению"
        })}
          onChange={handleLinkChange}
          value={link}
          type="url"
          className="popup__form-item popup__form-item_value_placelink"
          id="placelink"
          placeholder="Ссылка на картинку"
        
        />
        <span className={`placelink-input-error popup__form-item-error ${errors?.link && 'popup__form-item-error_active'}`}>{errors?.link?.message}</span>
      </label>
    </PopupWithForm>
  );
}
