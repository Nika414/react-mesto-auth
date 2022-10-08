import {useState} from 'react'

export default function Login({onLogin}) {
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
        onLogin(state.password, state.email);
    }


    return (
        <div className="login auth">
            <h3 className="login__header auth__header">Вход</h3>
            <form className="login__form auth__form" onSubmit={handleSubmit}>
                <input onChange={handleChange} name='email' className="login__form-input auth__form-input" placeholder="Email" type="email"></input>
                <input onChange={handleChange} name='password' className="login__form-input auth__form-input" placeholder="Пароль" type="password"></input>
                <button className="login__form-button auth__form-button" type="submit">Войти</button>
            </form>
        </div>
            );
}