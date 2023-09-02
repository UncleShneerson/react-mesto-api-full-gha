import React from "react";

export default function useValidation(startingValid = {}) {
  // const [values, setValues] = React.useState(inputValues);
  const [errorMessages, setErrorMessages] = React.useState({});
  const [isValid, setIsValid] = React.useState(false);
  const [validationData, setValidationData] = React.useState({});

  React.useEffect(() => {
    setValidationData(startingValid);
  }, []);

  function handleChange(e) {
    const { name, validationMessage, validity } = e.target;
    setErrorMessages({
      ...errorMessages,
      [name]: validationMessage,
    });

    setValidationData({
      ...validationData,
      [name]: validity.valid,
    });

    checkValidity();
  }

  function checkValidity() {
    const allInputValidity = Object.keys(validationData).every((i) => {
      return validationData[i] === true;
    });

    setIsValid(allInputValidity);
  }

  return {
    handleChange,
    errorMessages,
    setErrorMessages,
    isValid,
    setIsValid,
  };
}
