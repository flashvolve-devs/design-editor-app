import { useContext } from 'react';
import { AppContext } from '../../contexts/AppContext';

export default function EmailInput() {
  const { email, setEmail } = useContext(AppContext);
  return (
    <div>
      <label htmlFor="email">
        <input
          id="email"
          data-testid="common_register__input-email"
          onChange={ ({ target }) => setEmail(target.value) }
          placeholder="Enter e-mail"
          type="email"
          value={ email }
          required
        />
      </label>
    </div>
  );
}
