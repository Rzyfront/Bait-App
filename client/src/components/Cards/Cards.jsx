import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import Card from '../Card/Card';
import './Cards.css';
import { useDispatch, useSelector } from 'react-redux';
import Pagination from '../pagination/pagination';
import { homepage } from '../../redux/actions/actions';
import { searchByQuery } from '../../redux/actions/cards';
import MapHouse from '../Map/Maphouse';
import eliminarTildes from '../../hooks/eliminarTildes.';
function Cards ({ toggleMapMenu }) {
  const location = useLocation();
  const [outAnimation, setOutAnimation] = useState(false);

  // params consulta
  // obtener los valores de los parametros de consulta
  const queryParams = new URLSearchParams(location.search);
  const name = queryParams.get('name');
  const city = queryParams.get('city');

  const { locals, totalPages } = useSelector((state) => state.cards);
  const pagine = useParams();
  const dispatch = useDispatch();
  // navegation
  const [navegation, setnavegation] = useState(pagine.id);
  // actualiza pagina
  useEffect(() => {
    if (name || city) {
      dispatch(searchByQuery(name, eliminarTildes(city)));
      setnavegation(pagine.id);
    } else {
      dispatch(homepage(pagine.id));
      setnavegation('', '');
    }
  }, [pagine]);

  // controller navegation
  useEffect(() => {
    setnavegation(pagine.id);
  }, [totalPages]);
  // controller map

  useEffect(() => {}, [toggleMapMenu]);

  return (
    <div className="containerCardsall animated-element">

      <div className="ContainerCards animated-element">
      {totalPages ? <Pagination totalPages={totalPages} /> : ''}
          <div className='widthcards'>
        {locals &&
          locals.map(
            (
              {
                name,
                rating,
                location,
                verified,
                schedule,
                id,
                Characteristic,
                Images,
                lat,
                lng
              },
              index
            ) => {
              return (
              <Card id={id} Name={name} Rating={rating} verified={verified} schedule={schedule}
                    Characteristic={Characteristic}
                    Images={Images}
                    location={location}
                    key={index}
                    lat={lat}
                    lng={lng}
                  />

              );
            }
          )}
          </div>
      </div>
      {toggleMapMenu
        ? <div className={'widthmap scale-up-tr'}>
        <MapHouse className="mapsize"/>
        {() => setOutAnimation(false) }
      </div>
        : <div className={`widthmap scale-down-tr ${outAnimation && 'none-display'}`}>
        <MapHouse className="mapsize"/>
        {setTimeout(() => {
          setOutAnimation(true);
        }, 200)}
        </div>
        }
      </div>

  );
}
export default Cards;
