import './InfoLocalsProfile.css';
import { Rating as RatingStar, ThinStar } from '@smastrom/react-rating';
function InfoLocalsProfile ({ detail }) {
  const { name, location, rating, avgEnvironment, avgFood, avgQaPrice, avgService } = detail;
  const myStyles = {
    itemShapes: ThinStar,
    activeFillColor: '#343434',
    inactiveFillColor: '#3434343B'
  };
  return (
    <div className='InfoLocalsProfile-Compontent'>
        <div className='Info-left'>
        <h2>Name: {name}</h2>
        <h4>Location: {location}</h4>
        <h4 className=''>Rating: <RatingStar readOnly style={{ maxWidth: 100 }} value={rating || 0} className='Stars-Cards' itemStyles={myStyles}/></h4>
        <div>
            <h5>Tipo de Comida</h5>
        </div>
        <div>
            <h5>Tipo de Restaurant</h5>

        </div>
        <div>
            <h5>Caracteristias: </h5>

        </div>
        </div>
        <div className='Info-rigth'>
            <div className='Info-rigth-title'><h4>Categorias calificadas</h4><div className='Info-rigth-decoration'></div></div>
            <div className='Rating-C-Group-Container'>
                <h5 className='Rating-C-Group'>Ambiente: <RatingStar readOnly style={{ maxWidth: 100 }} value={rating || 0} className='Stars-Cards' itemStyles={myStyles}/></h5>
                <h5 className='Rating-C-Group'>Comida: <RatingStar readOnly style={{ maxWidth: 100 }} value={rating || 0} className='Stars-Cards' itemStyles={myStyles}/></h5>
                <h5 className='Rating-C-Group'>Calidad-Precio: <RatingStar readOnly style={{ maxWidth: 100 }} value={rating || 0} className='Stars-Cards' itemStyles={myStyles}/></h5>
                <h5 className='Rating-C-Group'>Serviio: <RatingStar readOnly style={{ maxWidth: 100 }} value={rating || 0} className='Stars-Cards' itemStyles={myStyles}/></h5>
            </div>
        </div>
    </div>
  );
}

export default InfoLocalsProfile;
