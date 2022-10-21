import PopupWithForm from "./PopupWithForm";
import { useEffect, useState, useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { useForm } from "react-hook-form";

export default function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const contextValue = useContext(CurrentUserContext);
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");

  useEffect(() => {
    setName(contextValue.currentUser.name);
    setBio(contextValue.currentUser.about);
  }, [contextValue.currentUser, isOpen]);

  const {
    register,
    reset,
    formState: { errors, isValid },
    handleSubmit,
   
  } = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
    criteriaMode: "all",
  });

 

  function onSubmit(data) {
    onUpdateUser({
      name: data.name,
      about: data.about,
    });
  }

  return (
    <PopupWithForm
      onSubmit={handleSubmit(onSubmit)}
      onClose={onClose}
      isOpen={isOpen}
      name="edit-profile"
      title="Редактировать профиль"
      buttonText="Сохранить"
      isValid={isValid}
    >
      <label className="popup__form-label">
        <input
          {...register("name", {
            required: "Поле обязательно к заполнению",
            minLength: {
              value: 2,
              message: "Минимум 2 символа",
            },
            maxLength: {
              value: 40,
              message: "Максимум 40 символов",
            },
            onChange: (e) => setName(e.target.value)
          })}
        
          className="popup__form-item popup__form-item_value_name"
          type="text"
          id="fullname"
          placeholder="Имя"
          minLength="2"
          maxLength="40"
          value={name || ''}
        />
        <span
          className={`fullname-input-error popup__form-item-error ${
            errors?.name && "popup__form-item-error_active"
          }`}
        >
          {errors?.name?.message}
        </span>
      </label>
      <label className="popup__form-label">
        <input
          {...register("about", {
            required: "Поле обязательно к заполнению",
            minLength: {
              value: 2,
              message: "Минимум 2 символа",
            },
            maxLength: {
              value: 200,
              message: "Максимум 200 символов",
            },
            onChange: (e) => setBio(e.target.value)
          })}
          
          className="popup__form-item popup__form-item_value_about"
          type="text"
          id="about"
          placeholder="О себе"
          minLength="2"
          maxLength="200"
          value={bio || ''}
        />
        <span
          className={`about-input-error popup__form-item-error ${
            errors?.about && "popup__form-item-error_active"
          }`}
        >
          {errors?.about?.message}
        </span>
      </label>
    </PopupWithForm>
  );
}
