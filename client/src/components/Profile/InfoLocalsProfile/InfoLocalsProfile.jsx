import './InfoLocalsProfile.css';
import { GoLocation } from 'react-icons/go';
import { Rating as RatingStar, ThinStar } from '@smastrom/react-rating';
function InfoLocalsProfile ({ detail, showClaimLocal }) {
  const { name, location, rating, avgEnvironment, avgFood, avgQaPrice, avgService, Characteristic } = detail;// eslint-disable-line
  const myStyles = {
    itemShapes: ThinStar,
    activeFillColor: '#343434',
    inactiveFillColor: '#3434343B'
  };
  return (
    <div className='InfoLocalsProfile-Compontent'>
        <div className='Info-left'>
        <div className='Tags-Info-Group'>
          <div className='Tag-Type-Eat' title='Tipo de Comida'>
            <h5 className='Tag-Text'>Argentina</h5>
        </div>
        <div className='Tag-Type-Local' title='Tipo de Restaurant'>
            <h5 className='Tag-Text'>Colonial</h5>
        </div>
        </div>
        <h2 className='Info-Local-Name'>{name}</h2>
        <h4 className='Info-Local-Location'><GoLocation className='locationico' />  {location}</h4>
        <h4 className='Info-Rating' title={`Rating promedio ${rating || 0}`}>Calificación: <RatingStar readOnly style={{ maxWidth: 150 }} value={rating || 0} className='Stars-Cards' itemStyles={myStyles}/></h4>
        <div className='Info-Caracteristic-Group'>
            <h5 className='Info-C-Title'>Características:</h5>
            {/* Mapear characteristias y renderizar cada una true en un div */}
            <div className='Info-C-Tag'>Sin Características</div>
        </div>
        </div>
        <div className='Info-rigth'>
            <div className='Info-rigth-title'>
              <button onClick={() => showClaimLocal(true)}>Reclamar local</button>
              {/* <h4 className='Info-rinth-Title'>Categorías calificadas</h4> */}
              <div className='Info-rigth-decoration'></div>
              </div>
            <div className='Rating-C-Group-Container'>
                <h5 className='Rating-C-Group'>Ambiente: <RatingStar readOnly style={{ maxWidth: 100 }} value={rating || 0} className='Stars-Cards' itemStyles={myStyles}/></h5>
                <h5 className='Rating-C-Group'>Comida: <RatingStar readOnly style={{ maxWidth: 100 }} value={rating || 0} className='Stars-Cards' itemStyles={myStyles}/></h5>
                <h5 className='Rating-C-Group'>Calidad-Precio: <RatingStar readOnly style={{ maxWidth: 100 }} value={rating || 0} className='Stars-Cards' itemStyles={myStyles}/></h5>
                <h5 className='Rating-C-Group'>Servicio: <RatingStar readOnly style={{ maxWidth: 100 }} value={rating || 0} className='Stars-Cards' itemStyles={myStyles}/></h5>
            </div>
        </div>
    </div>
  );
}

export default InfoLocalsProfile;
