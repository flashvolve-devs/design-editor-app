import { useContext } from 'react';
import {AppContext} from '../../contexts/AppContext';

export default function PasswordInput() {
  const { password, setPassword, visible } = useContext(AppContext);
  return (
    <div className='content-password-btn-eye'>
      <label htmlFor="password">
        <input
          id="password"
          data-testid="common_register__input-password"
          type={ !visible ? 'password' : 'text' }
          onChange={ ({ target }) => setPassword(target.value) }
          placeholder="Enter password"
          value={ password }
          required
        />
      </label>
    </div>
  );
}
