import { useState } from 'react';
import './Navbar.css';
import BaitLogo from '../../assets/BaitLogo.png';
import SearchHome from './SearchHome/SearchHome';
import { Link } from 'react-router-dom';
import { Login } from '../components';
import { FaUserCircle } from 'react-icons/fa';
const Navbar = () => {
  const [toogleLogin, setToggleLogin] = useState(false);
  const [user, setUser] = useState(false);
  return (
    <div className="all_navbar">
      {toogleLogin && <Login setToggleLogin={setToggleLogin} />}
      <Link to="/home">
        <img
          src={BaitLogo}
          alt="Bait"
          className="Logo"
          width="40px"
          height="45px"
        />
      </Link>

      <div className="SearchBar">
        <SearchHome />
      </div>

      <div className="UserGroup">
        {user === false
          ? (
          <div
            className="nav_login"
            onClick={() => {
              setToggleLogin(true);
            }}
          >
            <FaUserCircle className="UserIcon" />
            <h4 className="LogIn">Inicia sesión </h4>
          </div>
            )
          : (
          <div className="nav_login">
            <FaUserCircle />
            Mi perfil
          </div>
            )}
      </div>
    </div>
  );
};
export default Navbar;
