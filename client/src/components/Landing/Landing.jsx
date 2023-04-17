
import { Navbar } from "../components";
import ImgSlide1 from "../../assets/Slide1Landing.webp";
import ImgSlide2 from "../../assets/Slide2Landing.webp";
import ImgSlide3 from "../../assets/Slide3Landing.webp";
import "@coreui/coreui/dist/css/coreui.min.css";
import { CCarousel, CCarouselItem } from "@coreui/react";
import "./Landing.css";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="Landing animated-element">
      <Navbar />
      {/* HAY QUE REFACTORIZAR EL CARROUSEL USANDO EL COMPONENTE ADECUADO PARA QUE AUTOCAMBIE DE SLIDE */}
      <CCarousel
        className="Carrousel"
        controls
        transition="crossfade"
        interval={3000}
        indicators={true}
      >
        <CCarouselItem className="CarrouselItem">
          <div className="SlideItem1">
            <div className="FirstTitle">
              <h1>
                Bienvenido a <span>Bait</span>
              </h1>
              <h2>Encuentra el mejor sitio para vivir experiencias</h2>
              <Link to="/home">
                <button>Encuentralo!</button>
              </Link>
            </div>
            <img src={ImgSlide1} alt="ImgSlide1" />
          </div>
        </CCarouselItem>
        <CCarouselItem className="CarrouselItem">
          <div className="SlideItem2">
            <img src={ImgSlide2} alt="ImgSlide1" />
            <div className="SecondTitle">
              <h2>Cuentanos tus experiencias</h2>
              <h3>
                <span>Reseña</span> los lugares que has visitado y consigue
                promociones exclusivas
              </h3>
              <Link to="/home">
                <button>Reseñar</button>
              </Link>
            </div>
          </div>
        </CCarouselItem>
        <CCarouselItem className="CarrouselItem">
          <div className="SlideItem3">
            <div className="ThirdTitle">
              <h2>Reserva ahora</h2>
              <h3>
                <span>Agenda</span> tu <span>visita</span> y verifica las
                reseñas para tener una mejor eleccion.
              </h3>
              <Link to="/home">
                <button>Ver sitios</button>
              </Link>
            </div>
            <img src={ImgSlide3} alt="ImgSlide1" />
          </div>
        </CCarouselItem>
      </CCarousel>
    </div>
  );
};

export default Landing;
