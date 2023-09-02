import React from "react";
export default function InputElement({
  theme = "",
  placeHolder = "",
  name,
  errorMessages = {},
  onChange = "",
  value = "",
  minLength = "",
  maxLength = "",
  type = "text",
}) {
  return (
    <label className="form__field">
      <input
        type={type}
        placeholder={placeHolder}
        value={value[name] || ""}
        name={name}
        minLength={minLength}
        maxLength={maxLength}
        className={`form__input ${theme && `form__input_theme_${theme}`} ${
          errorMessages[name] !== "" && "form__input_type_error"
        }`}
        onChange={onChange}
        required
      />
      <span
        className={`form__input-error ${
          errorMessages[name] !== "" && "form__input-error_visible"
        }`}
      >
        {errorMessages[name]}
      </span>
    </label>
  );
}
