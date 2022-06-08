import Logo from '../../assets/img/argentBankLogo.png';
import './header.css';
import { NavLink } from 'react-router-dom';
import Navigation from '../Navigation';

const Header = () => {
  return (
    <>
      <nav className="main-nav">
        <NavLink to="/" className="main-nav-logo">
          <img
            className="main-nav-logo-image"
            src={Logo}
            alt="Argent Bank Logo"
          />
          <h1 className="sr-only">Argent Bank</h1>
        </NavLink>
        <Navigation />
      </nav>
    </>
  );
};

export default Header;
