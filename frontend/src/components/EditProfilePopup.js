import React from "react";
import PopupWithForm from "./PopupWithForm";
import InputElement from "./InputElement";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import useForm from "../hooks/useForm";
import useValidation from "../hooks/useValidation";

export default function EditProfilePopup({
  isOpen,
  onClose,
  onSubmit,
  loadingText,
}) {
  const currentUser = React.useContext(CurrentUserContext);

  const { values, handleChange: handleInputChange, setValues } = useForm({});

  const {
    handleChange: handleValidation,
    errorMessages,
    setErrorMessages,
    isValid,
  } = useValidation({ name: true, about: true });

  React.useEffect(() => {
    setErrorMessages({ name: "", about: "" });
  }, [isOpen]);

  React.useEffect(() => {
    setValues({ name: currentUser.name, about: currentUser.about });
  }, [currentUser, isOpen]);

  function handleChange(e) {
    handleInputChange(e);
    handleValidation(e);
  }

  function handleSubmit() {
    onSubmit(values);
  }

  return (
    <PopupWithForm
      name="profile"
      title="Редактировать профиль"
      textSubmit="Сохранить"
      loadingText={loadingText}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      validity={isValid}
    >
      <InputElement
        placeHolder="Имя"
        name="name"
        errorMessages={errorMessages}
        onChange={handleChange}
        value={values}
        minLength="2"
        maxLength="40"
      />
      <InputElement
        placeHolder="О себе?"
        name="about"
        errorMessages={errorMessages}
        onChange={handleChange}
        value={values}
        minLength="2"
        maxLength="200"
      />
    </PopupWithForm>
  );
}
