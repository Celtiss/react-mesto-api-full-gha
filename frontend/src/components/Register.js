import React, {useState} from 'react';
import {NavLink} from "react-router-dom";
import * as auth from '../auth.js';
import InfoTooltip from './InfoTooltip.js';
import LogoSuccess from '../images/success-icon.svg';
import LogoError from '../images/fail-icon.svg'

function Register({name, isOpen, onClose, onSubmitDataModal}){
    const[statusRequest, setStatusRequest] = useState(null);
    const [formValue, setFormValue] = useState({
        email:'',
        password: ''
    });

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormValue({
        ...formValue,
        [name]: value
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const { email, password } = formValue;
        auth.signUp(email, password).then((res) => {
            setFormValue({email: '', password: ''});
            setStatusRequest(true); //Устанавливаем статус true для отображения модального окна с успешной регистрацией
            onSubmitDataModal();// Открываем модальное окно
            
          })
          .catch((err) => {
                setStatusRequest(false);//Устанавливаем статус false для отображения модального окна с неудачной регистрацией
                onSubmitDataModal(); 
                console.log(err)
          });
      }

    return (
        <section className="entry">
            <div className="entry__content">
                <h1 className="entry__title">Регистрация</h1>
                <form className="entry__form" onSubmit={handleSubmit}>
                    <input name="email" type="email" value={formValue.email || ''} onChange={handleChange} placeholder="Email" id="email-input" className="entry__input entry__input_value_email" minLength="2" maxLength="40" required />
                    <input name="password" type="password" value={formValue.password || ''} onChange={handleChange} placeholder="Пароль" id="password-input" className="entry__input entry__input_value_password" minLength="2" maxLength="40" required />
                    <button type="submit" className="entry__button">Зарегистрироваться</button>
                </form>
                <p className="entry__text">Уже зарегистрированны? <NavLink to="/sign-in" className="entry__link">Войти</NavLink></p>
                {isOpen&& <InfoTooltip name={name} isOpen={isOpen} onClose={onClose} url={statusRequest?LogoSuccess:LogoError} title={statusRequest?'Вы успешно зарегистрировались!':'Что-то пошло не так! Попробуйте еще раз.'} />}
            </div>
        </section>
    )
}
export default Register;