import Popup from "./Popup";
import FormWithHeader from "./FormWithHeader";

export default function PopupWithForm({
  isOpen,
  onClose,
  name,
  title,
  textSubmit,
  children,
  onSubmit,
  loadingText,
  validity,
}) {
  return (
    <Popup isOpen={isOpen} onClose={onClose} name={name} children={children}>
      <FormWithHeader
        title={title}
        className="form"
        name={`form-${name}`}
        onSubmit={onSubmit}
        validity={validity}
        textSubmit={textSubmit}
        loadingText={loadingText}
      >
        {children /* {add labels} */}
      </FormWithHeader>
    </Popup>
  );
}
