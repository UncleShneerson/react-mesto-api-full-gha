import React from "react";
import { Link } from "react-router-dom";
import FormWithHeader from "./FormWithHeader";
import InputElement from "./InputElement";
import useForm from "../hooks/useForm";
import useValidation from "../hooks/useValidation";

export default function Login({ loadingText, onSubmit }) {
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
        title="Вход"
        className="white"
        name="autorisation"
        onSubmit={loginSubmit}
        validity={isValid}
        textSubmit="Войти"
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
      </FormWithHeader>
      <p className="button-caption">
        Нет аккаунта?{" "}
        <Link to="/sign-up" className="button-caption__link hover-opacity">
          Регистрация
        </Link>
      </p>
    </section>
  );
}
