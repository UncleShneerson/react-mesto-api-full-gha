import React from "react";
import { Link } from "react-router-dom";
import FormWithHeader from "./FormWithHeader";
import InputElement from "./InputElement";
import useForm from "../hooks/useForm";
import useValidation from "../hooks/useValidation";

export default function Register({ loadingText, onSubmit }) {
  const { values, handleChange: handleInputChange, setValues } = useForm({});

  const {
    handleChange: handleValidation,
    errorMessages,
    setErrorMessages,
    isValid,
  } = useValidation({ name: true, about: true });

  function handleChange(e) {
    handleInputChange(e);
    handleValidation(e);
  }

  function loginSubmit() {
    onSubmit(values);
  }

  return (
    <section className="section">
      <FormWithHeader
        theme="dark"
        title="Регистрация"
        className="white"
        name="registration"
        onSubmit={loginSubmit}
        validity={isValid}
        textSubmit="Зарегистрироваться"
        loadingText={loadingText}
      >
        <InputElement
          theme="dark"
          type="email"
          placeHolder="Email"
          name="email"
          errorMessages={errorMessages}
          onChange={handleChange}
          value={values}
        />
        <InputElement
          theme="dark"
          type="password"
          placeHolder="Пароль"
          name="password"
          errorMessages={errorMessages}
          onChange={handleChange}
          value={values}
          minLength="6"
          maxLength="20"
        />
        <p className="button-caption"></p>
      </FormWithHeader>
      <p className="button-caption">
        Уже зарегистрированы?{" "}
        <Link to="/sign-in" className="button-caption__link hover-opacity">
          Войти
        </Link>
      </p>
    </section>
  );
}
