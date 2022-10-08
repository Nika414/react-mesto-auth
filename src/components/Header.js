import React, { useContext } from 'react';
import logo from "../images/Vector.svg";
import { Link } from 'react-router-dom';
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Header({onLogout}) {
  const contextValue = useContext(CurrentUserContext);
  if (contextValue.loggedIn) {
    return (
      <header className="header">
        <img src={logo} alt="Лого Место" className="header__logo" />
        <div className="header__login-info">
          <p className="header__user-info">{contextValue.currentUser.email}</p>
          <Link to='/react-mesto-auth/sign-in' className="header__exit" onClick={onLogout} >Выйти</Link>
        </div>
      </header>

    );
  }
  else {
    return (
      <header className="header">
        <img src={logo} alt="Лого Место" className="header__logo" />
      </header>
    )
  }
}

export default Header;
