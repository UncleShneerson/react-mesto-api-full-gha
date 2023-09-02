import React from "react";
import PopupWithForm from "./PopupWithForm";
import InputElement from "./InputElement";
import useForm from "../hooks/useForm";
import useValidation from "../hooks/useValidation";

export default function AddPlacePopup({
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
  } = useValidation({ name: false, link: false });

  React.useEffect(() => {
    setValues({ name: "", link: "" });
    setErrorMessages({ name: "", link: "" });
    setIsValid(false);
  }, [isOpen]);

  function handleSubmit() {
    onSubmit(values);
  }

  function handleChange(e) {
    handleInputChange(e);
    handleValidation(e);
  }

  return (
    <PopupWithForm
      name="cards"
      title="Новое место"
      textSubmit="Создать"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      loadingText={loadingText}
      validity={isValid}
    >
      <InputElement
        placeHolder="Название"
        name="name"
        errorMessages={errorMessages}
        onChange={handleChange}
        value={values}
        minLength="2"
        maxLength="30"
      />
      <InputElement
        placeHolder="Ссылка на картинку"
        name="link"
        errorMessages={errorMessages}
        onChange={handleChange}
        value={values}
        type="url"
      />
    </PopupWithForm>
  );
}
