import { Link, useParams } from 'react-router-dom';
import Card from '../Card/Card';
import './Cards.css';
import { useSelector, useDispatch } from 'react-redux';
import Pagination from '../pagination/pagination';
import { useEffect } from 'react';
import { searchByFilters } from '../../redux/actions/actions';


function Cards () {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { cards, totalPages, filters = {} } = useSelector((state) => state);
  const locals = cards;
  useEffect(
    () => {
      filters.page = Number(id);
      dispatch(searchByFilters(filters));
    }, [id]
  );


  return (
    <div className="containerCardsall animated-element">
      <div>
      {totalPages && <Pagination totalPages={totalPages} filters={filters} />}
      <div className="ContainerCards animated-element">
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
              return (<Card id={id} Name={name} Rating={rating} verified={verified} schedule={schedule}
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
          <div className='widthmap'>
            <MapHouse className="mapsize"/>
          </div>
      </div>
      </div>
    </div>
  );
}
export default Cards;
