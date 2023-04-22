import { RiUserLine, RiSettingsLine, RiLogoutCircleLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';

const DropdownUser = ({ close }) => {
  return (
          <div className='dropDown-Container'>

                <ul className="dropdown-menu">
                    <li>
                        <Link to="">
                            <RiUserLine /> Perfil
                        </Link>
                    </li>
                    <li>
                        <Link to="">
                            <RiSettingsLine /> Configuraciones
                        </Link>
                    </li>
                     <li>
                        <Link to="/dashboard">
                            DashBoard Admin
                        </Link>
                    </li>
                    <li onClick={() => close()}>

                            <RiLogoutCircleLine /> Cerrar sesión

                    </li>
                </ul>
            </div>

  );
};

export default DropdownUser;
