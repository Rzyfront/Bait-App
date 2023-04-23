import { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import Card from '../Card/Card';
import './Cards.css';
import { useDispatch, useSelector } from 'react-redux';
import Pagination from '../pagination/pagination';
import { homepage } from '../../redux/actions/actions';
import { searchByQuery } from '../../redux/actions/cards';
import MapHouse from '../Map/Maphouse';
import eliminarTildes from '../../hooks/eliminarTildes.';
function Cards () {
  const location = useLocation();

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
  return (
    <div className="containerCardsall animated-element">
      <div>
      {totalPages && <Pagination totalPages={totalPages} />}
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
                Images
              },
              index
            ) => {
              return (
                <Link to={`/profile/${id}`} key={index}>
                  <Card
                    id={id}
                    Name={name}
                    Rating={rating}
                    location={location}
                    verified={verified}
                    schedule={schedule}
                    Characteristic={Characteristic}
                    Images={Images}
                  />
                </Link>
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
