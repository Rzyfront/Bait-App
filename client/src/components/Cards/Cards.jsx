import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import Card from '../Card/Card';
import './Cards.css';
import { useDispatch, useSelector } from 'react-redux';
import Pagination from '../pagination/pagination';

import { searchByFilters } from '../../redux/actions/cards';
import MapHouse from '../Map/Maphouse';
import eliminarTildes from '../../hooks/eliminarTildes.';

function Cards ({ toggleMapMenu }) {
  const location = useLocation();
  const [outAnimation, setOutAnimation] = useState(false);
  const { locals, totalPages } = useSelector((state) => state.cards);
  const pagine = useParams();
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [order, setOrder] = useState('');
  const [characteristics, setCharacteristics] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    setPage(pagine.id);
  }, [pagine]);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    setName(queryParams.get('name') || '');
    setCity(queryParams.get('city') || '');
    setSpecialty(queryParams.get('specialty') || '');
    setOrder(queryParams.get('order') || '');

    const characteristicsArr = [];
    queryParams.forEach((value, key) => {
      if (key === 'characteristics[]') {
        characteristicsArr.push(value);
      }
    });
    setCharacteristics(characteristicsArr);
  }, [location]);

  useEffect(() => {
    const ciudad = eliminarTildes(city);
    dispatch(searchByFilters({ name, city: ciudad, specialty, order, characteristics, page }));
  }, [name, city, specialty, order, characteristics, page]);

  return (
    <div className="containerCardsall animated-element">
      <div className="ContainerCards animated-element">
      {totalPages ? <Pagination totalPages={totalPages} filters={{ name, city, specialty, order, characteristics, page }} /> : ''}
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
