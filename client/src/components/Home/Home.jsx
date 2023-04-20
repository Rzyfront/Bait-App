import './Home.css';
import { Filters, Navbar, Cards, Footer } from '../components';

const Home = () => {
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
