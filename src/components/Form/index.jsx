import { useState } from 'react';
import Alert from '../Alert';
import axios from 'axios';
import './form.css';

const Form = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [checked, setChecked] = useState(true);
  const [alert, setAlert] = useState({});

  function isEmail(email) {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      email
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if ([email, password].includes('')) {
      setAlert({
        msg: 'Each form field is mandatory',
        error: true,
      });
      return;
    }
    if (!isEmail(email)) {
      setAlert({
        msg: 'Email have a wrong format',
        error: true,
      });
      return;
    }
    setAlert({});

    //verify user in api
    try {
      const { data } = await axios.post(
        'http://localhost:3001/api/v1/user/login',
        {
          email: email,
          password: password,
        }
      );
      localStorage.setItem('token', data.body.token);
    } catch (error) {
      setAlert({
        msg: 'Error: user not found !',
        error: true,
      });
    }
  };

  const { msg } = alert;

  return (
    <form onSubmit={handleSubmit}>
      {msg && <Alert alert={alert} />}
      <div className="input-wrapper">
        <label htmlFor="email">Email</label>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="input-wrapper">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="input-remember">
        <input
          type="checkbox"
          id="remember-me"
          checked={checked}
          onChange={(e) => setChecked(!checked)}
        />
        <label htmlFor="remember-me">Remember me</label>
      </div>
      <button className="sign-in-button">Sign In</button>
    </form>
  );
};

export default Form;
