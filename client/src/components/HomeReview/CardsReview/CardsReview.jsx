import { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import '../../Cards/Cards.css';
import PaginationReview from './PaginationReview/PaginationReview';
import CardReview from '../CardReview/CardReview';
import { useDispatch, useSelector } from 'react-redux';
import { searchByFilters } from '../../../redux/actions/cards';
import MapHouse from '../../Map/Maphouse';
import eliminarTildes from '../../../hooks/eliminarTildes.';
import { MdAddBusiness } from 'react-icons/md';

function CardsReview ({ toggle }) {
  const location = useLocation();
  const { locals, totalPages } = useSelector((state) => state.cards);
  const pagine = useParams();
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const [page, setPage] = useState(1);
  const [outAnimation, setOutAnimation] = useState(false);

  useEffect(() => {
    setPage(pagine.id);
  }, [pagine]);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    setName(queryParams.get('name') || '');
    setCity(queryParams.get('city') || '');
  }, [location]);

  useEffect(() => {
    const ciudad = eliminarTildes(city);
    dispatch(searchByFilters({ name, city: ciudad, characteristics: [], page }));
  }, [name, city, page]);
  return (
    <div className="containerCardsall animated-element">
      <div className="ContainerCards animated-element">
      {totalPages ? <PaginationReview totalPages={totalPages} /> : ''}
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
                address,
                Images,
                lat,
                lng
              },
              index
            ) => {
              return (
              <CardReview id={id} Name={name} Rating={rating} verified={verified} schedule={schedule}
                    Characteristic={Characteristic}
                    Images={Images}
                    location={location}
                    key={index}
                    lat={lat}
                    lng={lng}
                    address={address}
                  />

              );
            }
          )
        }
        {
          !locals?.length &&
            <div className="NoLocalsReview">
              <h3 className='Nofind'>¿No encontrás el local que querés reseñar?</h3>
              <p className='Nofind-p'>Inscribilo vos mismo como usuario de forma anónima y hacé que tu opinión cuente</p>

                <Link to="/createplace">
                  <div className="AddPlace">
                    <h2 className="AddPlace_Text">Registrá el local</h2> <MdAddBusiness />
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
export default CardsReview;
