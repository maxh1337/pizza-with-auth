import {useState} from "react";
import styles from "./register.module.scss";
import {Link, useNavigate} from "react-router-dom";
import {useMutation} from 'react-query'
import {$api} from '../../api/api'
import {useAuth} from '../../hooks/useAuth'

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    const {setIsAuth} = useAuth();

    const navigate = useNavigate();

    const successLogin = (token, isAdmin) => {
        localStorage.setItem("token", token);
        localStorage.setItem("isCurrentUserAdmin", isAdmin)
        setIsAuth(true);
        setPassword("");
        setEmail("");

        navigate("/");
    };

    const {mutate: auth} = useMutation(
        "Auth",
        () =>
            $api({
                url: "/auth/login",
                type: "POST",
                body: {email, password},
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
        auth();
    };

    return (
        <div className='content'>
            <form className={styles.login} onSubmit={handleSubmit}>
                <h1>Авторизация</h1>
                <div>
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
                    <button type="submit">Войти</button>
                    <div>
                        <p>Еще не зарегистрированы?&nbsp;&nbsp;</p>
                        <Link to="/register"> Зарегистрироваться</Link>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Login;

{
    /* <form onSubmit={handleSumbit} className={styles.login}></form> */
}
