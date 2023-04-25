import './Home.css';
import { Filters, Navbar, Cards, Footer } from '../components';
import { useState } from 'react';

const Home = () => {
  const [toggleMapMenu, setToggleMapMenu] = useState(true);
  return (
    <div className="Home animated-element">
      <Navbar />
      <Filters toggleMapMenu={toggleMapMenu} setToggleMapMenu={setToggleMapMenu} />
      <Cards toggleMapMenu={toggleMapMenu}/>
      <Footer />
    </div>
  );
};
export default Home;
