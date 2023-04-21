import { useEffect, useState } from 'react';
import './Navbar.css';
import BaitLogo from '../../assets/LogoBait.svg';
import SearchHome from './SearchHome/SearchHome';
import { Link } from 'react-router-dom';
import { Login, DropdownUser } from '../components';
import { FaUserCircle } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { ResetUser } from '../../redux/actions/actions';

const Navbar = () => {
  const dispatch = useDispatch();
  const dataUser = useSelector((state) => state.user);
  const [data, setdata] = useState();
  const [toogleLogin, setToggleLogin] = useState(false);
  // const [user, setUser] = useState(false);
  // const data = JSON.parse(localStorage.getItem('user'));
  const [dropDownUser, setDropDownUser] = useState(false);
  useEffect(() => {
    setdata(dataUser);
  }, [dataUser]);

  const close = () => {
    localStorage.clear();
    dispatch(ResetUser());
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
        {JSON.stringify(dataUser) === '{}'
          ? (
          <div
            className="nav_login LogInGroup"
            onClick={() => {
              setToggleLogin(true);
            }}
          >
            <FaUserCircle className="UserIcon" />
            <h4 className="LogIn"> inicia</h4>
          </div>
            )
          : (
          <div className="nav_login UserMenuGroupx" onClick={dropDownUser
            ? setDropDownUser(false)
            : setDropDownUser(true)}>

            <FaUserCircle />
            {dataUser.user.name}
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
