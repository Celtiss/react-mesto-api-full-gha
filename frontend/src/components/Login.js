import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import * as auth from '../auth.js';
import InfoTooltip from './InfoTooltip.js';
import LogoError from '../images/fail-icon.svg'

function Login({name, handleLogin, isOpen, onClose, onSubmitDataModal}){
    const navigate = useNavigate();
    // Статус запроса
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
        auth.signIn(email, password).then((res) => {
            setStatusRequest(true);
            if(res.token){
                localStorage.setItem('jwt', res.token);
                handleLogin(true);
                navigate ('/places', {replace:true});
            }
          })
          .catch((err) => {
                setStatusRequest(false); //Устанавливаем статус false для отображения модального окна с неудачным входом
                onSubmitDataModal(); //Открываем модальное окно
                console.log(err)
          });
      }

    return (
        <section className="entry">
            <div className="entry__content">
                <h1 className="entry__title">Вход</h1>
                <form className="entry__form" onSubmit={handleSubmit}>
                    <input name="email" type="email" value={formValue.email || ''} onChange={handleChange} placeholder="Email" id="email-input" className="entry__input entry__input_value_email" minLength="2" maxLength="40" required />
                    <input name="password" type="password" value={formValue.password || ''} onChange={handleChange} placeholder="Пароль" id="password-input" className="entry__input entry__input_value_password" minLength="2" maxLength="40" required />
                    <button type="submit" className="entry__button">Войти</button>
                </form>
                {isOpen&& <InfoTooltip name={name} isOpen={isOpen} onClose={onClose} url={!statusRequest&&LogoError} title={!statusRequest&&'Что-то пошло не так! Попробуйте еще раз.'} />}
            </div>
        </section>
    );
}
export default Login;