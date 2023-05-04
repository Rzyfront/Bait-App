import { useEffect } from 'react';
import { RiUserLine, RiLogoutCircleLine } from 'react-icons/ri';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const DropdownUser = ({ close, toggleMenuUser }) => {
  const role = useSelector(store => store.user.user.role);
  const { user } = useSelector((state) => state.user);
  useEffect(() => {}, [toggleMenuUser]);

  return (
          <div className={`DropDown-Component ${toggleMenuUser && 'scale-up-tr'}`}>

                <div className='dropDown-Container'>
                    <ul className='dropdown-menu'>
                    <li>
                      <Link to={`/userprofile/${user.id}`}>
                            <RiUserLine /> Perfil
                        </Link>
                    </li>
                    {(role === 'superAdmin' || role === 'admin') && <li>
                        <Link to='/dashboard'>
                            DashBoard
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
