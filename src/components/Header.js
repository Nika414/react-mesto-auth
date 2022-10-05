import logo from "../images/Vector.svg";
import { Link } from 'react-router-dom';

function Header() {
  return (
   
      <header className="header">
        <img src={logo} alt="Лого Место" className="header__logo" />
        <div className="header__login-info">
        <p className="header__user-info">jfjfkfkf</p>
        <Link to='/sign-in' className="header__exit" >Выйти</Link>
        </div>
      </header>
      
  );
}

export default Header;
