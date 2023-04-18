import "./Home.css";
import { Filters, Navbar, Cards, Footer } from "../components";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { homepage, loadingLocals } from "../../redux/actions/actions";
import { useParams } from "react-router-dom";

const Home = () => {
  let { id } = useParams();
  const dispatch = useDispatch();
  //initial Home

  useEffect(() => {
    dispatch(loadingLocals());
  }, []);

  return (
    <div className="Home animated-element">
      <Navbar />
      <Filters />
      <Cards />
      <Footer />
    </div>
  );
};
export default Home;
