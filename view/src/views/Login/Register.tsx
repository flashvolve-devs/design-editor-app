import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EmailInput from '../../components/Login/EmailInput.jsx';
import PasswordInput from '../../components/Register/PasswordInput';
import NameInput from '../../components/Register/NameInput';
import { AppContext } from '../../contexts/AppContext';
import createUser from '../../services/apiCreate';
import '../../components/Register/register.css'
export default function RegisterPage() {
  const {
    name, email, password,
  } = useContext(AppContext);
  const navigate = useNavigate();
  const [invalidRegister, setInvalidRegister] = useState(false);

  function validateRegister() {
    const emailValidationRegex = /\S+@\S+\.\S+/;
    const MIN_PASSWORD = 6;
    const MIN_NAME = 12;
    const passwordValidation = password.length >= MIN_PASSWORD && password.length >= 1;
    const nameValidation = name.length >= MIN_NAME;
    const validatingEmail = emailValidationRegex.test(email);
    const inputValidation = (passwordValidation && nameValidation && validatingEmail);
    return !inputValidation;
  }

  async function onSubmitUser(e: any) {
    e.preventDefault();

    const newUser = await createUser({ name, email, password }, 'user');
    if (newUser.message) {
      setInvalidRegister(true);
    } else {
      navigate('../customer/products', { replace: true });
    }
  }

  return (
    <div className="register-page-container">
      <div className="register-items-container">
        <form className="register-form" onSubmit={ (e) => onSubmitUser(e) }>
        <div className="title-register"> <h1>Register</h1> </div>
          <NameInput />
          <EmailInput />
          <PasswordInput />
          <button
            data-testid="common_register__button-register"
            type="submit"
            disabled={ validateRegister() }
            className="register-button"
          >
            REGISTER
          </button>
        </form>
        {
          invalidRegister
            ? (
              <p
                data-testid="common_register__element-invalid_register"
              >
                Usuário já existente
              </p>
            )
            : null
        }
      </div>
    </div>
  );
}
