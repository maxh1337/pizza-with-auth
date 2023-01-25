import {useState} from "react";
import styles from "./register.module.scss";
import {Link, useNavigate} from "react-router-dom";
import {useMutation} from 'react-query'
import {$api} from '../../api/api'
import {useAuth} from '../../hooks/useAuth'

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const {setIsAuth} = useAuth();

    const navigate = useNavigate();

    const successLogin = (token, isAdmin) => {
        localStorage.setItem("token", token);
        localStorage.setItem("isCurrentUserAdmin", isAdmin)
        setIsAuth(true);
        setName("");
        setPassword("");
        setEmail("");

        navigate("/");
    };

    const {mutate: register} = useMutation(
        "Registration",
        () =>
            $api({
                url: "/auth/register",
                type: "POST",
                body: {name, email, password},
                auth: false,
            }),
        {
            onSuccess(data) {
                successLogin(data.token, data.user.isAdmin);
            },
        }
    );

    const handleSubmit = (e) => {
        e.preventDefault();
        register();
    };
    return (
        <div className='content'>
            <form className={styles.login} onSubmit={handleSubmit}>
                <h1>Регистрация</h1>
                <div>
                    <input
                        value={name}
                        onChange={(e) => setName(e.currentTarget.value)}
                        placeholder="Имя"
                    />
                    <input
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.currentTarget.value)}
                    />
                    <input
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.currentTarget.value)}
                    />
                </div>
                <div>
                    <button type="submit">
                        Зарегистрироваться
                    </button>
                    <div>
                        <p>Уже есть аккаунт?&nbsp;&nbsp;</p>
                        <Link to="/login">Войти</Link>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Register;

{
    /* <form onSubmit={handleSumbit} className={styles.login}> */
}
