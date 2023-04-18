import './Home.css';
import { Filters, Navbar, Cards, Footer } from '../components';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loadingLocals } from '../../redux/actions/actions';
const Home = () => {
  const dispatch = useDispatch();
  // initial Home
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
