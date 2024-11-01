import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [valid, setValid] = useState(false);

  const history = useHistory();

  useEffect(() => {
    setValid(email.match(/./) && password.match(/./));
  }, [email, password]);

  const login = async () => {
    console.log('loggin');
    fetch('http://localhost:5000/api/users/login', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        password
      }),
      credentials: 'include'
    })
      .then(res => {
        if (!res.ok) throw res;
        history.push('/');
      })
      .catch(err => {
        err.text().then(text => setError(text));
      });
  };

  return (
    <div className="neu form">
      <h1 className="glow title">Login</h1>
      {error && <small>{error}</small>}
      <label className="label" htmlFor="email">
        E-mail
      </label>
      <input
        className="neu input"
        id="email"
        type="text"
        placeholder="Enter your e-mail..."
        size="1"
        autoFocus
        autoComplete="off"
        onChange={e => setEmail(e.target.value)}
        onKeyPress={e => e.key === 'Enter' && login()}
      />
      <label className="label" htmlFor="password">
        Password
      </label>
      <input
        className="neu input"
        id="password"
        type="password"
        placeholder="Enter your password..."
        size="1"
        autoComplete="off"
        onChange={e => setPassword(e.target.value)}
        onKeyPress={e => e.key === 'Enter' && login()}
      />
      <button className="neu glow btn" disabled={!valid} onClick={login}>
        Sign in
      </button>
      <small>
        <Link className="link" to="/register">
          Don't have account? Sign up
        </Link>
      </small>
    </div>
  );
}

export default Login;
