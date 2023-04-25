import './Footer.css';
import { Link } from 'react-router-dom';
import { AiFillInstagram } from 'react-icons/ai';
import { FaFacebookSquare, FaTwitterSquare, FaYoutubeSquare } from 'react-icons/fa';
import { IoLogoTiktok } from 'react-icons/io5';
import { useState } from 'react';

const Footer = () => {
  const [showTerms, setShowTerms] = useState(false);
  const [showCookies, setShowCookies] = useState(false);
  return (
    <div className="Container_Footer">
      <div className="SocialMedia">
        <div className="SM_IconLinks SM_Instagram">
          <AiFillInstagram />
          <p>Instagram</p>
        </div>
        <div className="SM_IconLinks SM_Facebook">
          <FaFacebookSquare />
          <p>Facebook</p>
        </div>
        <div className="SM_IconLinks SM_Twiter">
          <FaTwitterSquare />
          <p>Twitter</p>
        </div>
        <div className="SM_IconLinks SM_Youtube">
          <FaYoutubeSquare />
          <p>Youtube</p>
        </div>
        <div className="SM_IconLinks SM_Tiktok">
          <IoLogoTiktok />
          <p>Tiktok</p>
        </div>
      </div>
      <div className="PageInformation">
        <div className="InfoFooter1">
          <ul>
            <li>
              <Link to="/about">Sobre Nosotros</Link>
            </li>
            <li>
              <a href="mailto:baitdevs2023@gmail.com">Contactanos</a>
            </li>
            <li>
              <Link to="/createplace">Inscribe tu Local</Link>
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
              Terminos de Uso
            </li>
            <li
              onClick={
                showCookies
                  ? () => setShowCookies(false)
                  : () => setShowCookies(true)
              }
            >
              Declaración de privacidad y cookies
            </li>
          </ul>
        </div>
        <div className="InfoFooter3">
          <ul>
            <li>
              <Link to="/Answers">Como funciona este sitio</Link>
            </li>
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
              Mapa del Sitio
            </li>
          </ul>
        </div>
        <div className="InfoFooter4">
          <ul>
            <li>
              <Link to="/answers">Q&A</Link>
            </li>
            <li>
               <Link to="/datatreatment">Tratamiento de Datos</Link>
            </li>
            <li>
               <Link to="/createplace">
              Trabaja con nosotros
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
export default Footer;
