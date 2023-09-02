import Form from "./Form";

export default function FormWithHeader({
  title,
  className,
  name,
  textSubmit,
  children,
  onSubmit,
  loadingText,
  validity,
  theme = "",
}) {
  return (
    <>
      <h2 className="subheader">{title}</h2>
      <Form
        theme={theme}
        className={className}
        name={name}
        onSubmit={onSubmit}
        validity={validity}
        textSubmit={textSubmit}
        loadingText={loadingText}
      >
        {children /* {add labels} */}
      </Form>
    </>
  );
}
