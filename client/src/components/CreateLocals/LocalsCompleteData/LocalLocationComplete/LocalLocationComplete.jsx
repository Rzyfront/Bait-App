import './LocalLocationComplete.css';
import Mapdata from '../../../Map/Mapdata';
import { PopComent } from '../../../components';

function LocalLocationComplete ({ handleMap, mapSearch, Mapcenter, statemap, handleBoton, handlemapdatas, searchCity, statesupmit, errors }) {
  return (
    <div className='LocationCompleteContainer'>
         <input type="text"
                name='address'
                placeholder='Direccion'
                className='Input-C-L Direction-Complete'
          />
          <input type="text"
                 name='location'
                 placeholder='Ciudad'
                 className='Input-C-L City-Complete-Location'
                 onChange={handleMap}
                 value={mapSearch}
          />

            <div className='Map-Complete-Container'>
              <Mapdata Mapcenter={Mapcenter} statemap={statemap} handleBoton={handleBoton} handlemapdatas={handlemapdatas} />
            </div>
            <button onClick={(e) => {
              searchCity();
              e.preventDefault();
            } }className='Pick-Location-Basic'>
              Buscar ciudad
            </button>
            {statesupmit === true && errors.location && <PopComent text={errors.location} />}

    </div>
  );
}

export default LocalLocationComplete;
