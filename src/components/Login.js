
export default function Login() {
    return (
        <div className="login auth">
            <h3 className="login__header auth__header">Вход</h3>
            <form className="login__form auth__form">
                <input className="login__form-input auth__form-input" placeholder="Email" type="email"></input>
                <input className="login__form-input auth__form-input" placeholder="Пароль" type="password"></input>
                <button className="login__form-button auth__form-button" type="submit">Войти</button>
            </form>
        </div>
            );
}