import { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../../components/Login/LoginForm';
import { AppContext } from '../../contexts/AppContext';

export default function LoginPage(/* { history } */) {
  const { invalidUser } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    const logged = localStorage.getItem('isLogged');

    if (logged === 'true') {
      navigate('/editor', { replace: true });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="login-page-container">
      <div className="login-items-container">
        <LoginForm />
        {
          invalidUser
            ? <p data-testid="common_login__element-invalid-email">Usuário inválido</p>
            : null
        }
      </div>
    </div>
  );
}
