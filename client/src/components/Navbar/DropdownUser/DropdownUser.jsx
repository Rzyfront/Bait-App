import { useEffect } from 'react';
import { RiUserLine, RiSettingsLine, RiLogoutCircleLine } from 'react-icons/ri';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const DropdownUser = ({ close, toggleMenuUser }) => {
  const role = useSelector(store => store.user.user.role);
  useEffect(() => {}, [toggleMenuUser]);
  return (
          <div className={`DropDown-Component ${toggleMenuUser && 'scale-up-tr'}`}>

                <div className='dropDown-Container'>
                    <ul className="dropdown-menu">
                    <li>
                        <Link to="/user/:id">
                            <RiUserLine /> Perfil
                        </Link>
                    </li>
                    <li>
                        <Link to="">
                            <RiSettingsLine /> Configuraciones
                        </Link>
                    </li>
                    {(role === 'superAdmin' || role === 'admin') && <li>
                        <Link to="/dashboard">
                            DashBoard Admin
                        </Link>
                    </li>}
                    <li onClick={() => close()}>

                            <RiLogoutCircleLine /> Cerrar sesión

                    </li>
                </ul>
                </div>
            </div>

  );
};

export default DropdownUser;
