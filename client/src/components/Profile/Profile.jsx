import { useEffect, useState } from 'react';
import { Rating as RatingStar } from '@smastrom/react-rating';
import '@smastrom/react-rating/style.css';
import { GoLocation } from 'react-icons/go';
import { BsCalendar3 } from 'react-icons/bs';
import { TfiCommentAlt, TfiPencilAlt } from 'react-icons/tfi';
import { GiMeal } from 'react-icons/gi';
import img from '../../assets/restaurante.jpg';
import imgComida from '../../assets/comida.jpg';
import { Menu, Navbar, Reviews, ReviewsForm } from '../components';
import './Profile.css';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { DetailLocal } from '../../redux/actions/local';

function Profile () {
  const dispatch = useDispatch();
  const { detail, reviews } = useSelector(state => state);

  const { id } = useParams();
  useEffect(() => {
    dispatch(DetailLocal(id));
  }, [id]);

  const [toogleModal, setToggleModal] = useState('ReviewsLocal');
  const [toogleModal2, setToggleModal2] = useState(false);
  const ListMenu = [
    {
      name: 'Pollo Teriyaky',
      Price: 200,
      Images: [{ url: imgComida }],
      Rating: 3
    },
    { name: 'Milanesa', Price: 400, Images: [{ url: imgComida }], Rating: 3 },
    { name: 'Lomo asado', Price: 600, Images: [{ url: imgComida }], Rating: 3 },
    {
      name: 'Pasta italiana',
      Price: 150,
      Images: [{ url: imgComida }],
      Rating: 3
    },
    {
      name: 'Pollo Teriyaky',
      Price: 200,
      Images: [{ url: imgComida }],
      Rating: 3
    },
    { name: 'Milanesa', Price: 400, Images: [{ url: imgComida }], Rating: 3 },
    { name: 'Lomo asado', Price: 600, Images: [{ url: imgComida }], Rating: 3 },
    {
      name: 'Pasta italiana',
      Price: 150,
      Images: [{ url: imgComida }],
      Rating: 3
    }
  ];

  return (
    <>
      <Navbar />
      <div className="Profile animated-element">

        {toogleModal2 && (
          <ReviewsForm setToggleModal2={setToggleModal2} id={id} />
        )}
        {detail && (
          <div className="ProfileInfo">
            {detail?.Images?.length
              ? (
              <img
                src={detail.Images[0].url}
                alt={detail.name}
                className="ImageProfile"
              />
                )
              : (
              <img src={img} alt={detail.name} className="ImageProfile" />
                )}

            <div className="Decorator"></div>
            <div className="Info">
              <h2>{detail.name}</h2>
              <div className="RatingGroup">
                <h3>Rating:</h3>
                <RatingStar
                  readOnly
                  style={{ maxWidth: 100 }}
                  value={detail.rating}
                />
              </div>
              <div className="LocationGroup">
                <h3 className="Location">{detail.location}</h3>
                <GoLocation />
              </div>
              <div className="ScheduleGroup">
                <h3>Horario:</h3>
                <p className="Schedule">{detail.schedule}</p>
              </div>
              <div className="TelGroup">
                <h3>Tel:</h3>
                <p>{detail.phone}</p>
              </div>
              <div className="EmailGroup">
                <h3>E-mail:</h3>
                <p>{detail.email}</p>
              </div>
              <div className="Options">
                <div className="Reservar">
                  <p>Reservar</p>
                  <BsCalendar3 />
                </div>
                <div
                  className="VerReseña"
                  onClick={() => {
                    setToggleModal('ReviewsLocal');
                  }}
                >
                  <p>Ver Reseñas</p>
                  <TfiCommentAlt />
                </div>
                <div
                  className="HacerReseña"
                  onClick={
                    toogleModal2
                      ? () => {
                          setToggleModal2(false);
                        }
                      : () => {
                          setToggleModal2(true);
                        }
                  }
                >
                  <p>Hacer Reseña</p>
                  <TfiPencilAlt />
                </div>
                <div
                  className="VerMenu"
                  onClick={() => {
                    setToggleModal('Menu');
                  }}
                >
                  <p>Ver Menu</p>
                  <GiMeal />
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="ContainerSelection">
          {(toogleModal === 'Menu' || !toogleModal) && (
            <Menu ListMenu={ListMenu} />
          )}
          {reviews && toogleModal === 'ReviewsLocal' && (
            <Reviews localId={detail.id} />
          )}
        </div>
      </div>
    </>
  );
}

export default Profile;
