import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Cards.css';
import { Card, Pagination } from '../components';
import { useDispatch, useSelector } from 'react-redux';
import { searchByFilters } from '../../redux/actions/cards';
import MapHouse from '../Map/Maphouse';
import { MdAddBusiness } from 'react-icons/md';

function Cards ({ toggle }) {
  const { locals, totalPages } = useSelector((state) => state.cards);

  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [outAnimation, setOutAnimation] = useState(false);
  const ubication = useSelector((state) => state.ubication);

  const { filters, searchName } = useSelector((state) => state);
  // APLICATION FILTER
  useEffect(() => {
    let allFilter = '';
    if (filters && searchName) {
      for (const property in searchName) {
        if (searchName[property] !== '') {
          const data = (`${property}=${searchName[property]}&`);
          allFilter = allFilter + data;
        }
      }
      for (const property in filters) {
        if (property !== 'characteristics' && filters[property] !== '') {
          const data = (`${property}=${filters[property]}&`);
          allFilter = allFilter + data;
        }
        if (property === 'characteristics' && filters[property].length) {
          const objetnew = {};
          filters[property].forEach(data => {
            objetnew[data] = true;
          });
          allFilter = allFilter + (`${property}=${JSON.stringify(objetnew)}&`);
        }
      }
    }
    dispatch(searchByFilters({ page, filter: allFilter }));
  }, [filters, searchName, page]);
  const handlePage = (data) => {
    setPage(data + 1);
  };
  return (
    <div className="containerCardsall animated-element">
      <div className="ContainerCards animated-element">
        {totalPages > 0 && <Pagination totalPages={totalPages} handlePage={handlePage}/>}
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
                specialty,
                address,
                Images,
                lat,
                lng
              },
              index
            ) => {
              return (
              <Card id={id} Name={name} Rating={rating} verified={verified} schedule={schedule}
                    Characteristic={Characteristic}
                    specialty={specialty}
                    Images={Images}
                    location={location}
                    address={address}
                    key={index}
                    lat={lat}
                    lng={lng}
                  />

              );
            }
          )}
          {
          !locals?.length &&
            <div className="NoLocalsReview">
              <h3 className='Nofind'>No existe un local que coincida con la búsqueda</h3>

                <Link to={`/home/1?name=&city=${ubication.city}`}>
                  <div className="AddPlace">
                    <h2 className="AddPlace_Text">Ver todos</h2> <MdAddBusiness />
                  </div>
                </Link>

        </div>
        }
          </div>
      </div>
      {!toggle &&
         <div className='widthmap scale-up-tr Auxiliar-map'>
        <MapHouse className="mapsize"/>
        </div>
      }
       {toggle
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
