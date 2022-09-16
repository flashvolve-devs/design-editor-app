import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../../components/Login/LoginForm';
import '../../components/Login/login.css'
export default function LoginPage(/* { history } */) {
  const navigate = useNavigate();

  useEffect(() => {
    const logged = localStorage.getItem('isLogged');
    if (logged) {
      // @ts-ignore
      const user = JSON.parse(localStorage.getItem('user'));
      const { user_id } = user;

      if (logged === 'true') {
        navigate(`/editor/${user_id}`, { replace: true });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="login-page-container">
      <div className="login-items-container">
        <LoginForm />
      </div>
    </div>
  );
}
