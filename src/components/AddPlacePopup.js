import PopupWithForm from "./PopupWithForm";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

export default function AddPlacePopup({
  onClose,
  isOpen,
  onAddPlace,
  isLoading,
}) {
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
      reset({ name: "", link: "" });
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
      buttonText={isLoading ? "Сохранение..." : "Создать"}
      isValid={isValid}
    >
      <label className="form__label">
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
          className={`form__item-error ${
            errors?.name && "form__item-error_active"
          }`}
        >
          {errors?.name?.message}
        </span>
      </label>
      <label className="form__label">
        <input
          {...register("link", {
            required: "Поле обязательно к заполнению",
            pattern: {
              value:
                /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/,
              message: "Введите URL",
            },
          })}
          type="url"
          className="popup__form-item popup__form-item_value_placelink"
          id="placelink"
          placeholder="Ссылка на картинку"
        />
        <span
          className={`form__item-error ${
            errors?.link && "form__item-error_active"
          }`}
        >
          {errors?.link?.message}
        </span>
      </label>
    </PopupWithForm>
  );
}
