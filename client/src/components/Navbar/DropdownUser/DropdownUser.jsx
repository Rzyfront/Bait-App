import { RiUserLine, RiSettingsLine, RiLogoutCircleLine } from 'react-icons/ri';

const DropdownUser = ({ close }) => {
  return (
        <div className="dropDown">
            <div className='dropDown-Container'>

                <ul className="dropdown-menu">
                    <li>
                        <a href="/perfil">
                            <RiUserLine /> Perfil
                        </a>
                    </li>
                    <li>
                        <a href="/configuraciones">
                            <RiSettingsLine /> Configuraciones
                        </a>
                    </li>
                    <li onClick={() => close()}>

                            <RiLogoutCircleLine /> Cerrar sesión

                    </li>
                </ul>
            </div>

        </div>
  );
};

export default DropdownUser;
