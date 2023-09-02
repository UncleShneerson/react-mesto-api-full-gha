export default function Form({
  className,
  name,
  textSubmit,
  children,
  onSubmit,
  loadingText,
  validity,
  theme = "",
}) {
  function handleSubmit(event) {
    event.preventDefault();
    onSubmit();
  }

  return (
    <form
      className={`form ${theme && `form_theme_${theme}`} form_${className}`}
      name={`form-${name}`}
      onSubmit={handleSubmit}
      noValidate
    >
      <div>{children /* {add labels} */}</div>
      <button
        type="submit"
        className={`button button_type_submit button_style_fill-m ${
          theme && `button_style_fill-m-${theme}`
        } ${!validity && `button_disabled`}
        } `}
        disabled={!validity}
      >
        {loadingText === "" ? textSubmit : loadingText}
      </button>
    </form>
  );
}
