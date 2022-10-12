import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Register({ onRegister }) {
    const [state, setState] = useState({
        email: '',
        password: ''
    });

    function handleChange(e) {
        const { name, value } = e.target;
        setState({
            ...state,
            [name]: value
        });
    };

    function handleSubmit(e) {
        e.preventDefault();
        onRegister(state.password, state.email);
    }

    return (
        <div className="registration auth">
            <h3 className="registration__header auth__header">Регистрация</h3>
            <form className="registration__form auth__form" onSubmit={handleSubmit}>
                <input name="email" className="registration__form-input auth__form-input" onChange={handleChange} placeholder="Email" type="email"></input>
                <input name="password" className="registration__form-input auth__form-input" onChange={handleChange} placeholder="Пароль" type="password"></input>
                <button className="registration__form-button auth__form-button" type="submit">Зарегистрироваться</button>
            </form>
            <p className="registration__text">Уже зарегистрированы? <Link to='/sign-in' className="registration__link">Войти</Link></p>
        </div>
    );
}