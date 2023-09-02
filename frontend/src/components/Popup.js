export default function Popup({ isOpen, onClose, name, children }) {
  return (
    <div className={`popup popup_funct_${name} ${isOpen && "popup_opened"}`}>
      <div className="popup__container">
        <button
          type="button"
          className="button popup__btn-close hover-opacity"
          aria-label="Закрыть"
          onClick={onClose}
        />
        {children /* {add labels} */}
      </div>
    </div>
  );
}
