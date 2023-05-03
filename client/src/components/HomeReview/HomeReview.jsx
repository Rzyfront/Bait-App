import '../Home/Home.css';
import NavbarReview from './NavbarReview/NavbarReview';
import CardsReview from './CardsReview/CardsReview';
import { Footer } from '../components';

const HomeReview = () => {
  return (
    <div className="Home animated-element">
      <NavbarReview />
      <CardsReview />
      <Footer />
    </div>
  );
};
export default HomeReview;
