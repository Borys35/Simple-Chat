import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';

function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [valid, setValid] = useState(false);

  const history = useHistory();

  useEffect(() => {
    setValid(username.match(/./) && email.match(/./) && password.match(/./));
  }, [username, email, password]);

  const register = async () => {
    fetch('http://localhost:5000/api/users/register', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username,
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
      <h1 className="glow title">Register</h1>
      {error && <small>{error}</small>}
      <label className="label" htmlFor="username">
        Username
      </label>
      <input
        className="neu input"
        id="username"
        type="text"
        onChange={e => setUsername(e.target.value)}
        placeholder="Enter a username..."
        size="1"
        onKeyPress={e => e.key === 'Enter' && register()}
      />
      <label className="label" htmlFor="email">
        E-mail
      </label>
      <input
        className="neu input"
        id="email"
        type="text"
        onChange={e => setEmail(e.target.value)}
        placeholder="Enter an e-mail..."
        size="1"
        onKeyPress={e => e.key === 'Enter' && register()}
      />
      <label className="label" htmlFor="password">
        Password
      </label>
      <input
        className="neu input"
        id="password"
        type="password"
        onChange={e => setPassword(e.target.value)}
        placeholder="Enter a password..."
        size="1"
        onKeyPress={e => e.key === 'Enter' && register()}
      />
      <button className="neu glow btn" disabled={!valid} onClick={register}>
        Sign up
      </button>
      <small>
        <Link className="link" to="/login">
          Do you have account? Sign in
        </Link>
      </small>
    </div>
  );
}

export default Register;
