import "./Home.css";
import { BsFillSearchHeartFill } from "react-icons/bs";
import Navbar from "../Navbar/Navbar";
import Cards from "../Cards/Cards";
const Home = () => {
  return (
    <div className="home">
      <Navbar />
      <div className="filtros_home"></div>
      <div className="cards_home">
        <div className="cards_home_div">
          <Cards />
        </div>
        <div className="cards_home_map">
          <img
            src="https://res.cloudinary.com/dirsusbyy/image/upload/v1681405060/h4epm1pk9z9zesh28vhg.png"
            alt="map"
          />
        </div>
      </div>
    </div>
  );
};
export default Home;
