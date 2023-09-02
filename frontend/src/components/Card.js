import iconDelete from "../images/delete-icon.svg";
import placeholder from "../images/place_holder.jpg";

import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function Card({
  name,
  link,
  likes,
  card,
  onCardClick,
  onCardLike,
  onDeleteClick,
}) {
  const currentUser = React.useContext(CurrentUserContext);

  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some((i) => i._id === currentUser._id);

  const [imageURL, setImageURL] = React.useState(link);

  function errorUrl() {
    setImageURL(placeholder);
  }

  function handleCardClick() {
    imageURL !== placeholder && onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onDeleteClick(card);
  }

  return (
    <li className="places__card">
      <img
        className="places__image"
        alt={name}
        src={imageURL}
        onError={errorUrl}
        onClick={handleCardClick}
      />
      {isOwn && (
        <img
          src={iconDelete}
          alt="Удалить"
          className="places__delete hover-opacity"
          onClick={handleDeleteClick}
        />
      )}
      <div className="places__description">
        <h2 className="places__name">{name}</h2>
        <div className="places__like-area">
          <button
            type="button"
            className={`button places__like ${
              isLiked && `places__like_active`
            } hover-opacity`}
            aria-label="Нравится"
            onClick={handleLikeClick}
          />
          <p className="places__like-number">{likes}</p>
        </div>
      </div>
    </li>
  );
}
