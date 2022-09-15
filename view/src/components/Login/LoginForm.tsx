import { FormEvent, useContext, useEffect } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import EmailInput from '../../components/Login/EmailInput';
import PasswordInput from '../../components/Login/PasswordInput';
import getToken from '../../services/getToken';
import { AppContext } from '../../contexts/AppContext';

export default function LoginForm() {
  const { invalidUser } = useContext(AppContext);
  const {
    visible, setVisible, email, setEmail,
    password, setPassword, setToken, setInvalidUser,
  } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    setInvalidUser(false);
}, []); 

  function validateLogin() {
    const emailValidationRegex = /\S+@\S+\.\S+/;
    const MIN_PASSWORD = 4;
    const validatingEmail = emailValidationRegex.test(email);
    const passwordValidation = password.length >= MIN_PASSWORD;
    const inputValidation = (validatingEmail && passwordValidation);
    return !inputValidation;
  }

  async function setProfileData(data: any) {
    const { token, user_id } = data.response;

    const userStorage = localStorage.getItem('user');
    if (!userStorage) {
      try {
        localStorage.setItem('user', JSON.stringify({ user_id, token }));
        localStorage.setItem('isLogged', 'true');
      } catch (error) {
        console.log(error);
      }
    }
  }

  async function onSubmitLogin(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = await getToken({ email, password })
    const { user_id } = data.response;

    if (!data) {
      setInvalidUser(true);
    }
    if (data.status === 'success') {
      setToken(data);
      setEmail('');
      setPassword('');
      await setProfileData(data);
      navigate(`/editor/${user_id}`, { replace: true });
    }
  }

  return (
    <form className="login-form" onSubmit={(e) => onSubmitLogin(e)}>
      <div className="title-login"> <h1>Login</h1> </div>
      <EmailInput />
      <div className="input-format">
        <PasswordInput />
        <button
          type="button"
          onClick={() => setVisible(!visible)}
          className="button-visible"
        >
          {
            !visible
              ? <AiOutlineEyeInvisible className="icon-eye" />
              : <AiOutlineEye className="icon-eye" />
          }
        </button>
      </div>
      <button
        data-testid="common_login__button-login"
        type="submit"
        disabled={validateLogin()}
        className="login-button"
      >
        LOGIN
      </button>
      <button
        className="login-register-btn"
        data-testid="common_login__button-register"
        type="button"
        onClick={() => navigate('../register', { replace: false })}
      >
        Ainda não tenho conta
      </button>
      {
        invalidUser
          ? <p
            data-testid="common_login__element-invalid-email"
            className='message-error'
          >
            Dados inválidos
          </p>
          : <p className="message-error-hide"></p>
      }
    </form>
  );
}
