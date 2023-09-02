import React from "react";

import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import Card from "./Card.js";

export default function Main({
  onEditAvatar,
  onEditProfile,
  onAddPlace,
  cards,
  onCardClick,
  onDeleteClick,
  onCardLike,
}) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar-info" onClick={onEditAvatar}>
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="profile__avatar"
          />
        </div>
        <div className="profile__column-info">
          <div className="profile__name-row">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button
              type="button"
              className="button button_func_edit button_style_line-xs button_place_profile-info hover-opacity"
              name="btn-edit"
              aria-label="Редактировать"
              onClick={onEditProfile}
            />
          </div>
          <p className="profile__description">{currentUser.about}</p>
        </div>
        <button
          type="button"
          className="button button_func_add button_style_line-m button_place_profile hover-opacity"
          name="btn-add"
          aria-label="Добавить"
          onClick={onAddPlace}
        />
      </section>

      <section className="places" aria-label="Список мест">
        <ul className="places__grid">
          {cards.map((item) => (
            <Card
              key={item._id}
              name={item.name}
              link={item.link}
              likes={item.likes.length}
              card={item}
              onCardClick={onCardClick}
              onDeleteClick={onDeleteClick}
              onCardLike={onCardLike}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}
