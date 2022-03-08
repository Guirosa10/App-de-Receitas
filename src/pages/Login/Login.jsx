// LoginPage
import React from 'react';

export default function Login() {
  return (
    <div>

      <h1>App de receitas Login</h1>
      <form>
        <input type="email" data-testid="email-input" />
        <input type="password" data-testid="password-input" />
        <button
          type="button"
          data-testid="login-submit-btn"
          id="login-submit-btn"
        >
          Enter
        </button>
      </form>
    </div>
  );
}
