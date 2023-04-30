
import { Footer, Navbar } from '../components';
import ImgSlide1 from '../../assets/Slide1Landing.webp';
import ImgSlide2 from '../../assets/Slide2Landing.webp';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import '@coreui/coreui/dist/css/coreui.min.css';

import './Landing.css';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Landing = () => {
  const ubication = useSelector((state) => state.ubication);
  return (
    <div className='Landing animated-element'>
      <Navbar />
      {/* HAY QUE REFACTORIZAR EL CARROUSEL USANDO EL COMPONENTE ADECUADO PARA QUE AUTOCAMBIE DE SLIDE */}

        <div id='CarrouselItem1' className='CarrouselItem'>
          <div className='SlideItem1'>
            <div className='FirstTitle'>
              <h1>
                <span>Drescubrí</span> dónde comer
              </h1>
              <h2>Encuentra el mejor sitio para vivir experiencias</h2>
              <Link to={`/home/1?name=&city=${ubication.city}`} >
                <button>¡Encuéntralo!</button>
              </Link>
            </div>
            <img src={ImgSlide1} alt='ImgSlide1' />
          </div>
          <a className='Slide-Arrow' href="#Footer"><IoIosArrowDown/></a>
        </div>
        <div id='CarrouselItem2' className='CarrouselItem'>
          <a className='Slide-Arrow2' href="#Navbar"><IoIosArrowUp/></a>
          <div className='SlideItem2'>
            <img src={ImgSlide2} alt='ImgSlide1' />
            <div className='SecondTitle'>
              <h2>Cuéntanos tus experiencias</h2>
              <h3>
                <span>Reseña</span> los lugares que has visitado y consigue
                promociones exclusivas
              </h3>
              <Link to='/home/1?name=&city='>
                <button>Reseñar</button>
              </Link>
            </div>
          </div>
        </div>
        <Footer/>

    </div>
  );
};

export default Landing;
