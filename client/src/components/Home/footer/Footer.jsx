import "./footer.css";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <div className="container_footer">
      <div>
        <h2>Quienes somos</h2>
        <h2>Contactar</h2>
        <Link to="/createplace">
          <h2>Eres un restaurante?</h2>
        </Link>
      </div>
      <div>
        <h2>Condiciones de uso</h2>
        <h2>Guia</h2>
      </div>
      <div>
        <h2>@henry el mejor grupo 05</h2>
      </div>
    </div>
  );
};
export default Footer;
