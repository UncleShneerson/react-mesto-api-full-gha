import logo from "../images/mesto-logo.svg";

import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

export default function Header({ signOut }) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <header className="header">
      <img src={logo} alt="Логотип. Место. Россия." className="header__logo" />
      <div className="navbar">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <li className="navbar__text">{currentUser.email}</li>
                <Link to="/sign-in" onClick={signOut} className="navbar__link">
                  <li className="navbar__text hover-opacity">Выйти</li>
                </Link>
              </>
            }
          />
          <Route
            path="/sign-in"
            element={
              <Link to="/sign-up" className="navbar__link">
                <li className="navbar__text hover-opacity">Регистрация</li>
              </Link>
            }
          />
          <Route
            path="/sign-up"
            element={
              <Link to="/sign-in" className="navbar__link">
                <li className="navbar__text hover-opacity">Вход</li>
              </Link>
            }
          />
        </Routes>
      </div>
    </header>
  );
}
