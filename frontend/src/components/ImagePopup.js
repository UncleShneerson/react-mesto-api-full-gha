import clearPixel from "../images/1x1.png"; //чтобы при схлопывании не было ошибочного фрейма
export default function ImagePopup(props) {
  return (
    <div
      className={`popup popup_funct_image ${props.card.name && "popup_opened"}`}
    >
      <figure className="gallery">
        <button
          type="button"
          className="button button_type_submit popup__btn-close hover-opacity"
          aria-label="Закрыть"
          onClick={props.onClose}
        ></button>
        <img
          className="gallery__photo"
          src={props.card.link ? props.card.link : clearPixel}
          alt={props.card.name}
        />
        <figcaption className="gallery__caption">{props.card.name}</figcaption>
      </figure>
    </div>
  );
}
