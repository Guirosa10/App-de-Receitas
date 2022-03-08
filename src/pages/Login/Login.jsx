import React, { useContext, useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import rockGlass from '../../images/rockGlass.svg';
import AppContext from '../../context/Context/AppContext';
import PASSWORD_LENGTH from '../../helpers/constants';

export default function Login() {
  const { login, setLogin } = useContext(AppContext);
  const [disabled, setDisabled] = useState(true);
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    const loginCheck = login.includes('@');
    const emailCheck = login.includes('.com');
    const passwordCheck = password.length > PASSWORD_LENGTH;
    if (loginCheck && emailCheck && passwordCheck) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [login, password]);

  const saveOnStorage = () => {
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
    localStorage.setItem('user', JSON.stringify({ email: login }));
    setRedirect(true);
  };
  if (redirect) {
    return (<Redirect to="/foods" />);
  }

  return (
    <div className="meals">
      <span className="logo">TRYBE</span>
      <object
        className="rocksGlass"
        type="image/svg+xml"
        data={ rockGlass }
      >
        Glass
      </object>
      <h1>App de receitas Login</h1>
      <form>
        <input
          type="email"
          data-testid="email-input"
          name="email"
          value={ login }
          onChange={ ({ target: { value } }) => setLogin(value) }
        />
        <input
          type="password"
          data-testid="password-input"
          name="password"
          onChange={ ({ target: { value } }) => setPassword(value) }
        />
        <button
          type="button"
          data-testid="login-submit-btn"
          id="login-submit-btn"
          disabled={ disabled }
          onClick={ saveOnStorage }
        >
          Enter
        </button>
      </form>
    </div>
  );
}
