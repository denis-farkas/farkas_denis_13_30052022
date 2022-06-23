import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../../slices/authSlice';
import { useNavigate } from 'react-router-dom';
import Alert from '../Alert';
import './update.css';

const UpdateName = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);
  const [alert, setAlert] = useState({});
  const [user, setUser] = useState({
    token: auth.token,
    firstName: auth.firstName,
    lastName: auth.lastName,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if ([user.firstName, user.lastName].includes('')) {
      setAlert({
        msg: 'Each form field is mandatory',
        error: true,
      });
      return;
    }
    setAlert({});
    if (auth.token) {
      dispatch(updateUser(user));
    }
  };

  const cancel = () => {
    navigate('/Profile');
  };

  const { msg } = alert;

  return (
    <form className="update-content">
      {msg && <Alert alert={alert} />}
      <div className="input-wrapper-content left">
        <input
          type="text"
          value={user.firstName}
          onChange={(e) =>
            setUser({ ...user, firstName: e.target.value.trim() })
          }
        />
        <button className="green-button" onClick={handleSubmit}>
          Save
        </button>
      </div>
      <div className="input-wrapper-content right">
        <input
          type="text"
          value={user.lastName}
          onChange={(e) =>
            setUser({ ...user, lastName: e.target.value.trim() })
          }
        />
        <button className="green-button" onClick={cancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default UpdateName;
