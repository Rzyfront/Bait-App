import { useEffect, useState } from 'react';
import './Navbar.css';
import BaitLogo from '../../assets/LogoBait.svg';
import SearchHome from './SearchHome/SearchHome';
import { Link } from 'react-router-dom';
import { Login, DropdownUser } from '../components';
import { FaUserCircle } from 'react-icons/fa';

const Navbar = () => {
  const [toogleLogin, setToggleLogin] = useState(false);
  const [user, setUser] = useState(false);
  const data = JSON.parse(localStorage.getItem('user'));
  const [dropDownUser, setDropDownUser] = useState(false);

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
    <div className="all_navbar animated-element">
      {toogleLogin && <Login setToggleLogin={setToggleLogin} />}
      <Link to={'/home/1?name=&city='}>
        <img
          src={BaitLogo}
          alt="Bait"
          className="Logo"
        />
      </Link>
      <div className="SearchBar">
        <SearchHome />
      </div>
      <div className="UserGroup">
        {user === false
          ? (
          <div
            className="nav_login LogInGroup"
            onClick={() => {
              setToggleLogin(true);
            }}
          >
            <FaUserCircle className="UserIcon" />
            <h4 className="LogIn">Inicia sesión </h4>
          </div>
            )
          : (
          <div className="nav_login UserMenuGroupx" onClick={dropDownUser
            ? setDropDownUser(false)
            : setDropDownUser(true)}>
            <FaUserCircle />
            {data.user.name}
            {dropDownUser && <DropdownUser
              dropDownUser={dropDownUser}
              setDropDownUser={setDropDownUser}
            />}
          </div>
            )}
      </div>
    </div>
  );
};
export default Navbar;
