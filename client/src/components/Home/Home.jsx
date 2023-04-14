import "./Home.css";
import Filters from "../filters/Filters";
import Navbar from "../Navbar/Navbar";
import Cards from "../Cards/Cards";
import Footer from "./footer/Footer";

const Home = () => {
  return (
    <div className="home">
      <Navbar />
      <div className="home_filters">
        <Filters />
      </div>
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
      <div className="home_footer">
        <Footer />
      </div>
    </div>
  );
};
export default Home;
