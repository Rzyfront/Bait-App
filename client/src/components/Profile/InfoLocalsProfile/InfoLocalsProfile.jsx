import './InfoLocalsProfile.css';
import { GoLocation, GoVerified, GoUnverified } from 'react-icons/go';
import { Rating as RatingStar, ThinStar } from '@smastrom/react-rating';

import { useSelector } from 'react-redux';
function InfoLocalsProfile ({ detail, showClaimLocal, setModalUpdate }) {
  const { name, location, rating, avgEnvironment, avgFood, avgQaPrice, avgService, Characteristic, specialties, verified, address, schedule
 } = detail;// eslint-disable-line
  const myStyles = {
    itemShapes: ThinStar,
    activeFillColor: '#343434',
    inactiveFillColor: '#3434343B'
  };
  console.log(detail);

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
  const dataUser = useSelector((state) => state.user);
  const verifiedOwner = detail?.UserId === dataUser?.user?.id;
  return (
    <div className='InfoLocalsProfile-Compontent'>
        <div className='Info-left'>
        <div className='Tags-Info-Group'>
         {specialties &&
            specialties?.map(({ name }, i) => {
              return <div className='Tag-Type-Eat' title='Tipo de Comida' key={i}>
              <h5 className='Tag-Text' >{name}</h5>
              </div>;
            })}

        <div className='Tag-Type-Local' title='Tipo de Restaurant'>
           {Characteristic && <h5 className='Tag-Text'>{Characteristic.type}</h5>}
        </div>
        </div>
        <div className='Info-Name-Group'>
          <h2 className='Info-Local-Name'>{name}</h2>
          {verified === 'verified'
            ? <GoVerified className='LocalVerified'title='Verificado'/>
            : <GoUnverified className='LocalUnverified' title='No verificado'/>
        }
        </div>
        <h4 className='Info-Local-Location'><GoLocation className='locationico'/>  {address || location}</h4>
        <div className='Info-Rating-Group'>
          <h4 className='Info-Rating' title={`Rating promedio ${rating || 0}`}>Calificación: <RatingStar readOnly style={{ maxWidth: 150 }} value={rating || 0} className='Stars-Cards' itemStyles={myStyles}/></h4>
          <h4 className='Info-Rating-Number'>{rating.toFixed(1)}</h4>
        </div>
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
            <div className='Rating-C-Group-Container' title='Aspectos calificdos'>
                <h5 className='Rating-C-Group'>Ambiente: <RatingStar readOnly style={{ maxWidth: 100 }} value={avgEnvironment || 0} className='Stars-Cards' itemStyles={myStyles}/></h5>
                <h5 className='Rating-C-Group'>Comida: <RatingStar readOnly style={{ maxWidth: 100 }} value={avgFood || 0} className='Stars-Cards' itemStyles={myStyles}/></h5>
                <h5 className='Rating-C-Group'>Calidad-Precio: <RatingStar readOnly style={{ maxWidth: 100 }} value={avgQaPrice || 0} className='Stars-Cards' itemStyles={myStyles}/></h5>
                <h5 className='Rating-C-Group'>Servicio: <RatingStar readOnly style={{ maxWidth: 100 }} value={avgService || 0} className='Stars-Cards' itemStyles={myStyles}/></h5>
            </div>
            {schedule &&
            <div className='Schedule-Info' title='Horario Semanal de servicio'>
            <p className='Week-schedule' title='Hora de apertura y cierre'>Lunes:    {schedule.monday}</p>
            <p className='Week-schedule' title='Hora de apertura y cierre'>Martes:    {schedule.tuesday}</p>
            <p className='Week-schedule' title='Hora de apertura y cierre'>Miercoles:    {schedule.wednesday}</p>
            <p className='Week-schedule' title='Hora de apertura y cierre'>Jueves:    {schedule.thursday}</p>
            <p className='Week-schedule' title='Hora de apertura y cierre'>Viernes:    {schedule.friday}</p>
            <p className='Week-schedule' title='Hora de apertura y cierre'>Sabado:    {schedule.saturday}</p>
            <p className='Week-schedule' title='Hora de apertura y cierre'>Domingo:    {schedule.sunday}</p>
            </div>}
        </div>
    </div>
  );
}

export default InfoLocalsProfile;
