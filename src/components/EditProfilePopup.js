import PopupWithForm from "./PopupWithForm";
import { useEffect, useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { useForm } from "react-hook-form";

export default function EditProfilePopup({ isOpen, onClose, onUpdateUser, isLoading }) {
  const contextValue = useContext(CurrentUserContext);
  
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

  useEffect(() => {
    if (isOpen) {
        reset({ name: contextValue.currentUser.name, about: contextValue.currentUser.about});
      }
  }, [contextValue.currentUser, isOpen, reset]);

  function onSubmit(data) {
    onUpdateUser(data);
  }

  return (
    <PopupWithForm
      onSubmit={handleSubmit(onSubmit)}
      onClose={onClose}
      isOpen={isOpen}
      name="edit-profile"
      title="Редактировать профиль"
      buttonText={isLoading ? "Сохранение..." : "Сохранить"}
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
            
          })}
          className="popup__form-item popup__form-item_value_name"
          type="text"
          id="fullname"
          placeholder="Имя"
          minLength="2"
          maxLength="40"
         
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
            
          })}
          className="popup__form-item popup__form-item_value_about"
          type="text"
          id="about"
          placeholder="О себе"
          minLength="2"
          maxLength="200"
          
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
