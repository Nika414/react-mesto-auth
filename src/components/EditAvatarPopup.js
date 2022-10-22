import PopupWithForm from "./PopupWithForm";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

export default function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
 

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
      reset({ avatar: ''});
    }
  }, [isOpen]);

  function onSubmit(data) {
    onUpdateAvatar(data);
  }

  
  return (
    <PopupWithForm
      onSubmit={handleSubmit(onSubmit)}
      onClose={onClose}
      isOpen={isOpen}
      name="avatar-edit"
      title="Обновить аватар"
      buttonText="Сохранить"
      isValid={isValid}
    >
      <label className="popup__form-label_value_avatar-link popup__form-label">
        <input
          {...register("avatar", {
            required: "Поле обязательно к заполнению",
            minLength: {
              value: 2,
              message: "Минимум 2 символа",
            },
            
          })}
          className="popup__form-item popup__form-item_value_avatar-link"

          type="url"
          id="avatar"
          placeholder="Ссылка на твой новый аватар"
          minLength="2"
        />
        <span
          className={`avatar-input-error popup__form-item-error${
            errors?.name && "popup__form-item-error_active"
          }`}
        >
          {errors?.name?.message}
        </span>
      </label>
    </PopupWithForm>
  );
}
