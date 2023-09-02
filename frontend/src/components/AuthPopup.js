import React from "react";
import Popup from "./Popup";
import imageOk from "../images/auth-ok.svg";
import imageErr from "../images/auth-err.svg";

export default function AuthPopup({ isOpen, onClose, isItOk }) {
  return (
    <Popup isOpen={isOpen} onClose={onClose} name="auth">
      {isItOk ? (
        <div className="auth">
          <img src={imageOk} alt="Все ок!" className="auth__image" />
          <h2 className="subheader">Вы успешно зарегистрировались!</h2>
        </div>
      ) : (
        <div className="auth">
          <img src={imageErr} alt="Что-то не так!" className="auth__image" />
          <h2 className="subheader">{`Что-то пошло не так!
        Попробуйте ещё раз.`}</h2>
        </div>
      )}
    </Popup>
  );
}
