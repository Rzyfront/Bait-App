import { useEffect, useState } from 'react';
import './Navbar.css';
import BaitLogo from '../../assets/BaitLogo.png';
import SearchHome from './SearchHome/SearchHome';
import { Link } from 'react-router-dom';
import { Login } from '../components';
import { FaUserCircle } from 'react-icons/fa';
const Navbar = () => {
  const [toogleLogin, setToggleLogin] = useState(false);
  const [user, setUser] = useState(false);
  const data = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    if (data && data.user) {
      setUser(true);
    } else {
      setUser(false);
    }
  }, [data]);

  const close = () => {
    localStorage.clear();
    setUser(false);
  };

  return (
    <div className="all_navbar">
      {toogleLogin && <Login setToggleLogin={setToggleLogin} />}
      <Link to={'/home/1?name=&city='}>
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
          <div className="nav_login" onClick={close}>
            <FaUserCircle />
            {data.user.name}
          </div>
            )}
      </div>
    </div>
  );
};
export default Navbar;
