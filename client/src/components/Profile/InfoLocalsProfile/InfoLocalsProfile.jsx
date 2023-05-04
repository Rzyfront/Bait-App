import './InfoLocalsProfile.css';
import { GoLocation } from 'react-icons/go';
import { Rating as RatingStar, ThinStar } from '@smastrom/react-rating';

import { useSelector } from 'react-redux';
function InfoLocalsProfile ({ detail, showClaimLocal, setModalUpdate }) {
   const { name, location, rating, avgEnvironment, avgFood, avgQaPrice, avgService, Characteristic,specialty } = detail;// eslint-disable-line
  const myStyles = {
    itemShapes: ThinStar,
    activeFillColor: '#343434',
    inactiveFillColor: '#3434343B'
  };

  const properties = {
    big_group: 'Grupo grande',
    family_style: 'Familiar',
    live_music: 'Música',
    outdoor_seating: 'Aire libre',
    parking_lot: 'Estacionamiento',
    pet_friendly: 'Acepta mascotas',
    romantic: 'Romántico',
    table_service: 'Servicio de mesa',
    wifi: 'Wifi',
    work_friendly: 'Para trabajar'
  };

  const trueProperties = [];

  if (Characteristic) {
    for (const [property, value] of Object.entries(Characteristic)) {
      if (value && properties[property]) {
        trueProperties.push(properties[property]);
      }
    }
  }
  console.log(detail);
  const dataUser = useSelector((state) => state.user);
  const verifiedOwner = detail?.UserId === dataUser?.user?.id;
  return (
    <div className='InfoLocalsProfile-Compontent'>
        <div className='Info-left'>
        <div className='Tags-Info-Group'>
         {specialty && <div className='Tag-Type-Eat' title='Tipo de Comida'>
            <h5 className='Tag-Text'>{specialty}</h5>
        </div>}
        <div className='Tag-Type-Local' title='Tipo de Restaurant'>
            <h5 className='Tag-Text'>Colonial</h5>
        </div>
        </div>
        <h2 className='Info-Local-Name'>{name}</h2>
        <h4 className='Info-Local-Location'><GoLocation className='locationico'/>  {location}</h4>
        <h4 className='Info-Rating' title={`Rating promedio ${rating || 0}`}>Calificación: <RatingStar readOnly style={{ maxWidth: 150 }} value={rating || 0} className='Stars-Cards' itemStyles={myStyles}/></h4>
        <div className='Info-Caracteristic-Group'>
           {trueProperties.length ? <h5 className='Info-C-Title'>Características:</h5> : ''}
            {/* Mapear characteristias y renderizar cada una true en un div */}
            {trueProperties?.map((p, i) => {
              return <div key={i} className='Info-C-Tag'>{p}</div>;
            })}
        </div>
        </div>
        <div className='Info-rigth'>
            <div className='Info-rigth-title'>
             { detail?.verified !== 'verified' && <div onClick={() => showClaimLocal(true)} className='ClaimButtom'>Reclamar local</div>}
             { detail?.verified === 'verified' && verifiedOwner && <div onClick={() => setModalUpdate(true)} className='ClaimButtom'>Actualizar local</div>}
              {/* <h4 className='Info-rinth-Title'>Categorías calificadas</h4> */}
                        </div>
            <div className='Rating-C-Group-Container'>
                <h5 className='Rating-C-Group'>Ambiente: <RatingStar readOnly style={{ maxWidth: 100 }} value={avgEnvironment || 0} className='Stars-Cards' itemStyles={myStyles}/></h5>
                <h5 className='Rating-C-Group'>Comida: <RatingStar readOnly style={{ maxWidth: 100 }} value={avgFood || 0} className='Stars-Cards' itemStyles={myStyles}/></h5>
                <h5 className='Rating-C-Group'>Calidad-Precio: <RatingStar readOnly style={{ maxWidth: 100 }} value={avgQaPrice || 0} className='Stars-Cards' itemStyles={myStyles}/></h5>
                <h5 className='Rating-C-Group'>Servicio: <RatingStar readOnly style={{ maxWidth: 100 }} value={avgService || 0} className='Stars-Cards' itemStyles={myStyles}/></h5>
            </div>
        </div>
    </div>
  );
}

export default InfoLocalsProfile;
