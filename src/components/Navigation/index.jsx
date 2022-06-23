import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser, resetUser } from '../../slices/authSlice';
import './navigation.css';
import { capitalize } from '../../utils/capitalize';
const Navigation = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const firstname = auth.firstName;
  const logout = () => {
    dispatch(logoutUser());
    dispatch(resetUser());
  };

  if (sessionStorage.getItem('isLogged') && sessionStorage.getItem('token')) {
    return (
      <div className="main-nav-item">
        <i className="fa fa-user-circle"></i>
        <span className="name-bold">{capitalize(firstname)}</span>
        <NavLink to="/" onClick={logout}>
          <i className="fa fa-sign-out"></i>
          <span className="under"> Sign Out </span>
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
