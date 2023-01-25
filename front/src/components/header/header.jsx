import {Link, useLocation} from "react-router-dom";
import Search from "./search";
import {useEffect, useState} from "react";
import {useAuth} from "../../hooks/useAuth";


const Header = ({refetch, summ, totalPrice}) => {
    const location = useLocation();
    const {isAuth, setIsAuth} = useAuth()


    const handleLogout = () => {
        localStorage.removeItem('token')
        setIsAuth(false)
    }


    return (
        <div className="header">
            <div className='container'>
                <Link to="/">
                    <div className='header__logo'>
                        <div>
                            <h1>Vasya Pizza</h1>
                            <p>самая вкусная пицца во вселенной</p>
                        </div>
                    </div>
                </Link>
                {(location.pathname !== '/login' && location.pathname !== '/register') &&
                    <Search refetch={refetch}/>}
                <div className='header__cart'>
                    {!isAuth ? (
                            <div style={{display: 'flex'}}>
                                <Link to="/login" className="button button--cart"
                                      style={{marginRight: '15px'}}>
                                    <span>Sign In</span>
                                </Link>
                                <Link to="/register" className="button button--cart">
                                    <span>Sign Up</span>
                                </Link>
                            </div>
                        ) :
                        <button className="button button--cart" onClick={handleLogout}>
                            <span>Logout</span>
                        </button>
                    }
                </div>
            </div>
        </div>
    );
};

export default Header;