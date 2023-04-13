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
        <Cards />
      </div>
    </div>
  );
};
export default Home;
