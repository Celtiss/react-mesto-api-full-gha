import React from 'react';
import {Routes, Route, NavLink, useNavigate} from 'react-router-dom';
function Header({email, handleLogin}) {
    const navigate = useNavigate();
    const signOut = () => {
        localStorage.removeItem('jwt');
        navigate ('/sign-in', {replace: true});
        handleLogin(false);
    }
    return(
        <header className="header"> 
            <div className="header__logo"></div>
            <Routes>
                <Route path="sign-in" element={<NavLink to="/sign-up" className="header__link">Регистрация</NavLink>} />
                <Route path="sign-up" element={<NavLink to="/sign-in" className="header__link">Войти</NavLink>} />
                <Route path="places" element={
                <div className="header__info">
                    <div className="header__user-login">{email}</div>
                    <button onClick={signOut} className="header__link header__link_type_exit">Выйти</button>
                </div>} />
            </Routes>
        </header>
    );
}

export default Header;