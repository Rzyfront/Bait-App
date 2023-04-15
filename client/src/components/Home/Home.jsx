import "./Home.css";
import { Filters, Navbar, Cards, Footer } from "../components";

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
      </div>
      <div className="home_footer">
        <Footer />
      </div>
    </div>
  );
};
export default Home;
