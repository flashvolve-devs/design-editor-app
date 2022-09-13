import { useContext } from 'react';
import { AppContext } from '../../contexts/AppContext';

export default function NameInput() {
  const { name, setName } = useContext(AppContext);
  return (
    <div className='input-name'>
      <label htmlFor="name">
        <input
          id="name"
          data-testid="common_register__input-name"
          onChange={ ({ target }) => setName(target.value) }
          placeholder="Enter name"
          type="name"
          value={ name }
          required
        />
      </label>
    </div>
  );
}
