import React from "react";

export default function useForm(inputValues = {}) {
  const [values, setValues] = React.useState(inputValues);

  function handleChange(e) {
    const { value, name } = e.target;
    setValues({ ...values, [name]: value });
  }

  return { values, handleChange, setValues };
}
