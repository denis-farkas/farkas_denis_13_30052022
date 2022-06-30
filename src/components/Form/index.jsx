import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../slices/authSlice';
import { useNavigate } from 'react-router-dom';
import Alert from '../Alert';
import isEmail from '../../utils/email';
import './form.css';

const Form = () => {
  const remember = localStorage.getItem('email');
  const [alert, setAlert] = useState({});
  const [user, setUser] = useState({
    email: remember,
    password: '',
    checked: '',
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    if (auth.token) {
      navigate('/Profile');
    }
  }, [auth.token, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if ([user.email, user.password].includes('')) {
      setAlert({
        msg: 'Each form field is mandatory',
        error: true,
      });
      return;
    }
    if (!isEmail(user.email)) {
      setAlert({
        msg: 'Email have a wrong format',
        error: true,
      });
      return;
    }
    setAlert({});
    dispatch(loginUser(user));
  };

  const { msg } = alert;

  return (
    <form onSubmit={handleSubmit}>
      {msg && <Alert alert={alert} />}
      <div className="input-wrapper">
        <label htmlFor="email">Email</label>
        <input
          type="text"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
      </div>
      <div className="input-wrapper">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />
      </div>
      <div className="input-remember">
        <input
          type="checkbox"
          id="remember-me"
          checked={user.checked}
          onChange={(e) => setUser({ ...user, checked: !user.checked })}
        />
        <label htmlFor="remember-me">Remember me</label>
      </div>
      <button className="sign-in-button">
        {auth.loginStatus === 'pending' ? 'Submitting...' : 'Sign In'}
      </button>
      {auth.loginStatus === 'rejected' ? (
        <p className="error-msg">{auth.loginError}</p>
      ) : null}
    </form>
  );
};

export default Form;
