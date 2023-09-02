import React from "react";
import PopupWithForm from "./PopupWithForm";
import useForm from "../hooks/useForm";
import useValidation from "../hooks/useValidation";
import InputElement from "./InputElement";

export default function EditAvatarPopup({
  isOpen,
  onClose,
  onSubmit,
  loadingText,
}) {
  const { values, handleChange: handleInputChange, setValues } = useForm({});

  const {
    handleChange: handleValidation,
    errorMessages,
    setErrorMessages,
    isValid,
    setIsValid,
  } = useValidation({});

  React.useEffect(() => {
    setErrorMessages({ avatar: "" });
    setValues({ avatar: "" });
    setIsValid(false);
  }, [isOpen]);

  function handleSubmit() {
    onSubmit(values);
  }

  function handleChange(e) {
    handleValidation(e);
    handleInputChange(e);
  }

  return (
    <PopupWithForm
      name="avatar"
      title="Обновить аватар"
      textSubmit="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      loadingText={loadingText}
      validity={isValid}
    >
      <InputElement
        placeHolder="Ссылка на картинку"
        name="avatar"
        value={values}
        errorMessages={errorMessages}
        onChange={handleChange}
        type="url"
      />
    </PopupWithForm>
  );
}
