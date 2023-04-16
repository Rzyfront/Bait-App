import "./Home.css";
import { Filters, Navbar, Cards, Footer } from "../components";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loadingLocals } from "../../redux/actions/actions";
const Home = () => {
  const dispatch = useDispatch();
  //initial Home
  useEffect(() => {
    dispatch(loadingLocals());
  }, []);

  return (
    <div className="Home animated-element">
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
