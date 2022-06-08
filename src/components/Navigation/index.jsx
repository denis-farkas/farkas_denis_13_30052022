import { NavLink } from 'react-router-dom';

const Navigation = () => {
  return (
    <div>
      <NavLink to="/sign-in" className="main-nav-item">
        <i className="fa fa-user-circle"></i>
        Sign In
      </NavLink>
    </div>
  );
};

export default Navigation;
