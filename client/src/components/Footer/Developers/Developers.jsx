import './Developers.css';
import BaitLogo from '../../../assets/LogoBait.svg';
import Junior from '../../../assets/Junior.png';
import Edgar from '../../../assets/Edgar.png'
import DianaQ from '../../../assets/DianaQ.png'
import Yis from '../../../assets/Yis.png'
import JuanC from '../../../assets/JuanC.png'
import Franco from '../../../assets/Franco.png'
import Rafa from '../../../assets/Rafa.png'
import DianaV from '../../../assets/DianaV.png'
import { Link } from 'react-router-dom';

function Developers () {
    return <div className='Developers-Component animated-element'>
    <div className="Developers-Container">
    <Link to={'/home/1?name=&city='}>
    <img src={BaitLogo} alt="Bait_Logo" className='Bait_Logo'/>
    </Link>
    <h2 className="Title">Preguntas <span>frecuentes</span></h2>
    <p className="Header-Developers">
      ¡Bienvenido a <span>Bait</span>! A continuación el equipo de desarrollo de nuestra aplicación</p>
    <div class="Developers-imagen-container">
         <a href="https://www.linkedin.com/in/junior-mojica-dominguez-07ab63b3/"><img src={Junior}/></a>
         <a href="https://www.linkedin.com/in/edgarrios412/"><img src={Edgar}/></a>
         <a href="https://www.linkedin.com/in/diana-carolina-quintana-yauri-786592127/"><img src={DianaQ}/></a>
         <a href="https://www.linkedin.com/in/yisney-soto/"><img src={Yis}/></a>
         <a href="https://www.linkedin.com/in/juancamilo-saiz-sanjuan-a66245246/"><img src={JuanC}/></a>
         <a href="https://www.linkedin.com/in/francoegi/"><img src={Franco}/></a>
         <a href="https://www.linkedin.com/in/rzyfront/"><img src={Rafa}/></a>
         <a href="https://www.linkedin.com/in/diana-vargas-71276aa3/"><img src={DianaV}/></a>
    </div>
         <Link to={'/home/1?name=&city='}>
        <button className='Developers-Volver'>Volver</button>
        </Link>
      </div>
  </div>
  ;
}
export default Developers;