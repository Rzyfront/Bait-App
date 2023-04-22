import { useState } from 'react';
import './Navbar.css';
import BaitLogo from '../../assets/LogoBait.svg';
import SearchHome from './SearchHome/SearchHome';
import { Link, useLocation } from 'react-router-dom';
import { Login, DropdownUser } from '../components';
import { FaUserCircle } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { ResetUser } from '../../redux/actions/actions';
const Navbar = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const dataUser = useSelector((state) => state.user);
  const [barra, setbarra] = useState(false);
  const [toogleLogin, setToggleLogin] = useState(false);

  const close = () => {
    localStorage.clear();
    dispatch(ResetUser());
  };

  return (
    <div className="all_navbar animated-element">
      {toogleLogin && <Login setToggleLogin={setToggleLogin} />}
      <Link to={`${location.pathname !== '/' ? '/' : '/home/1?name=&city='}`}>
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
          <div className="nav_login" onClick={barra
            ? () => {
                setbarra(false);
              }
            : () => {
                setbarra(true);
              }}
          >
            <FaUserCircle />
            {dataUser.user.name}
            {barra &&
            (<div className={`dropDown ${barra && 'scale-up-ver-top'}`}>
              <DropdownUser close={close}/>
            </div>
            )
            }
          </div>
            )}
      </div>
    </div>
  );
};
export default Navbar;
