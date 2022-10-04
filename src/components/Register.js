import { Link } from 'react-router-dom';

export default function Register() {
    return (
<div className="registration">
    <h3 className="registration__header">Регистрация</h3>
    <form className="registration__form">
        <input className="registration__form-input" placeholder="Email" type="email"></input>
        <input className="registration__form-input" placeholder="Пароль" type="password"></input>
        <button className="registration__form-button" type="submit">Зарегистрироваться</button>
    </form>
    <p className="registration__text">Уже зарегистрированы? <Link className="registration__link">Войти</Link></p>
</div>
    );
}