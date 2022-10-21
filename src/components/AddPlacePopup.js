import PopupWithForm from "./PopupWithForm";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export default function AddPlacePopup({ onClose, isOpen, onAddPlace }) {
  const {
    register,
    reset,
    formState,
    formState: { errors, isValid},
    handleSubmit,
  } = useForm({
    mode: "onTouched",
    reValidateMode: "onChange",
  });

  useEffect(() => {
    if (isOpen) {
      reset({ name: '', link:''});
    }
  }, [isOpen]);

  function onSubmit(data) {
    onAddPlace(data);
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
              message: "Минимум 2 символа",
            },
            maxLength: {
              value: 30,
              message: "Максимум 30 символов",
            },
          })}
          className="popup__form-item popup__form-item_value_placename"
          type="text"
          id="placename"
          placeholder="Название"
          maxLength="30"
        />
        <span
          className={`placename-input-error popup__form-item-error ${
            errors?.name && "popup__form-item-error_active"
          }`}
        >
          {errors?.name?.message}
        </span>
      </label>
      <label className="popup__form-label">
        <input
          {...register("link", {
            required: "Поле обязательно к заполнению",
          })}
          type="url"
          className="popup__form-item popup__form-item_value_placelink"
          id="placelink"
          placeholder="Ссылка на картинку"
        />
        <span
          className={`placelink-input-error popup__form-item-error ${
            errors?.link && "popup__form-item-error_active"
          }`}
        >
          {errors?.link?.message}
        </span>
      </label>
    </PopupWithForm>
  );
}
