import './Footer.css';
import { Link } from 'react-router-dom';
import { AiFillInstagram } from 'react-icons/ai';
// import { FaFacebookSquare, FaTwitterSquare, FaYoutubeSquare } from 'react-icons/fa';
// import { IoLogoTiktok } from 'react-icons/io5';
import { useState } from 'react';

const Footer = () => {
  const [showTerms, setShowTerms] = useState(false);
  const [showCookies, setShowCookies] = useState(false);
  return (
    <div id='Footer' className="Container_Footer">
      <div className="SocialMedia">
        <a href='https://www.instagram.com/bait.app/' target='_blank' className="SM_IconLinks SM_Instagram" rel="noreferrer">
        <a href='https://www.instagram.com/bait.app/' target='_blank' className="SM_IconLinks SM_Instagram" rel="noreferrer">
          <AiFillInstagram />
          <p>Instagram</p>
        </a>
        {/* <a className="SM_IconLinks SM_Facebook">
          <FaFacebookSquare />
          <p>Facebook</p>
        </a>
        <a className="SM_IconLinks SM_Twiter">
          <FaTwitterSquare />
          <p>Twitter</p>
        </a>
        <a className="SM_IconLinks SM_Youtube">
          <FaYoutubeSquare />
          <p>Youtube</p>
        </a>
        <a className="SM_IconLinks SM_Tiktok">
          <IoLogoTiktok />
          <p>Tiktok</p>
        </a> */}
      </div>
      <div className="PageInformation">
        <div className="InfoFooter1">
          <ul>
            <li>
              <Link to="/about">Sobre Nosotros</Link>
            </li>
            <li>
              <a href="mailto:admin@bait.lat">Contáctanos</a>
            </li>

          </ul>
        </div>
        <div className="InfoFooter2">
          <ul>
            <li>
              <Link to="/Answers">Preguntas Frecuentes</Link>
            </li>
            <li
              onClick={
                showTerms ? () => setShowTerms(false) : () => setShowTerms(true)
              }
            >
              Términos de Uso
            </li>

          </ul>
        </div>
        <div className="InfoFooter3">
          <ul>

            <li
              onClick={
                showCookies
                  ? () => setShowCookies(false)
                  : () => setShowCookies(true)
              }
            >
              Declaración de privacidad y cookies
            </li>
            <li
              onClick={
                showTerms ? () => setShowTerms(false) : () => setShowTerms(true)
              }
            >
               <Link to="/Developers">Desarrolladores</Link>
            </li>
          </ul>
        </div>
        <div className="InfoFooter4">
          <ul>
              <li>
              <Link to="/createplace#complete-form">Inscribe tu Local</Link>
              <Link to="/createplace#complete-form">Inscribe tu Local</Link>
            </li>
            <li>
               <Link to="/datatreatment">Tratamiento de datos</Link>
            </li>

          </ul>
        </div>
      </div>
    </div>
  );
};
export default Footer;
