import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser, resetUser } from '../../slices/authSlice';
import './navigation.css';

const Navigation = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const firstname = auth.firstName;
  const isLogged = auth.isLogged;
  const logout = () => {
    dispatch(logoutUser());
    dispatch(resetUser());
  };

  console.log(isLogged);

  if (isLogged) {
    return (
      <div className="main-nav-item">
        <i className="fa fa-user-circle"></i>
        <p>{firstname}</p>
        <NavLink to="/">
          <div className="main-nav-item" onClick={logout}>
            <i className="fa fa-sign-out"></i>
            <p>Sign Out</p>
          </div>
        </NavLink>
      </div>
    );
  } else {
    return (
      <div>
        <NavLink to="/sign-in" className="main-nav-item">
          <i className="fa fa-user-circle"></i>
          Sign In
        </NavLink>
      </div>
    );
  }
};

export default Navigation;
