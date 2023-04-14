import { useState } from "react";
import "./Navbar.css";
import Search_home from "./Search_home/Search_home";
import { AiOutlineUserAdd } from "react-icons/ai";
import { FaUserCircle } from "react-icons/fa";
const Navbar = () => {
  const [user, setUser] = useState(false);
  return (
    <div className="all_navbar">
      <div className="nav_ico">
        <img
          src="https://res.cloudinary.com/dirsusbyy/image/upload/v1681249225/s0oftekkem6okolepefh.jpg"
          alt="icono"
          className="ico"
        />
        <h2 className="titule">Baid</h2>
      </div>
      <div>
        <Search_home />
      </div>
      {user === false ? (
        <div className="nav_login">
          <AiOutlineUserAdd />
          <h4>Registrate</h4>
        </div>
      ) : (
        <div className="nav_login">
          <FaUserCircle />
          Mi perfil
        </div>
      )}
    </div>
  );
};
export default Navbar;
