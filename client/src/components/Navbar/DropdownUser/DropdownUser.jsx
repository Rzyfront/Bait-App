import { RiUserLine, RiSettingsLine, RiLogoutCircleLine } from 'react-icons/ri';
import { useState } from 'react';
import './DropdownUser.css';

const DropdownUser = ({ showUserDropdown }) => {
  const [toggleDrop, setToggleDrop] = useState(showUserDropdown());

  return (
        <div className="dropdown">
            {toggleDrop && (
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
                    <li>
                        <a href="/logout" onClick={() => setToggleDrop(false)}>
                            <RiLogoutCircleLine /> Cerrar sesión
                        </a>
                    </li>
                </ul>
            )}
        </div>
  );
};

export default DropdownUser;
