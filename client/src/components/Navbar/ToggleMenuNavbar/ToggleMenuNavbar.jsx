import { SearchHome } from '../../components.js';

import './ToggleMenuNavbar.css';
function ToggleMenuNavbar () {
  return (
        <div className="Toggle-Menu-Navbar">
          <div className="menu-navbar-inner">
           <SearchHome/>
          </div>
        </div>
  );
}

export default ToggleMenuNavbar;
