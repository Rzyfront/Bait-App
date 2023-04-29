import './UserProfile.css';
import { Navbar } from '../components';
import { useDispatch, useSelector } from 'react-redux';
import './Userprofile.css';
import { getReviews, getUserProfile, userPostImg, getUserLocals } from '../../redux/actions/actions';

import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import { useUploadImage } from '../../hooks/useUploadImage';
import { Loading } from '@nextui-org/react';

import InfoModal from '../Userprofile/InfoModal/InfoModal';
import BonoModal from '../Userprofile/BonoModal/BonoModal';
import UserLocals from './UserLocals';

function Userprofile () {
  const { image, loading, handleChangeimage } = useUploadImage();
  const [profileImg, setProfileImg] = useState([]);

  const [openInfoModal, setOpenInfoModal] = useState(false);
  const [openBonoModal, setOpenBonoModal] = useState(false);
  // const [scroll,setScroll] = useState(false);
  const [select, setSelect] = useState('reviews');

  const dispatch = useDispatch();
  const { userId } = useParams();

  const { user } = useSelector((state) => state.user);
  const userProfile = useSelector((state) => state.userProfile);
  const obtainUserLocal = useSelector((state) => state.userDashLocals);
  const reviews = useSelector((state) => state.reviews);
  const [userLocal, setUserLocal] = useState(obtainUserLocal);
  useEffect(() => {
    dispatch(getUserProfile(userId));
  }, []);
  useEffect(() => {
    dispatch(getReviews(userId));
  }, []);
  useEffect(() => {
    if (image.length) {
      setProfileImg(image[0].url);
      user.Image = profileImg;
    }
  }, [image, user]);
  useEffect(
    () => {
      setUserLocal(obtainUserLocal);
    }, [obtainUserLocal]
  );
  /*
  userProfile && console.log(userProfile.user?.Reviews);
  user && console.log(user);

  console.log(profileImg); */

  const handleChangeimages = (event) => {
    handleChangeimage(event);
  };

  const userLocals = () => {
    setSelect('locals');
    dispatch(getUserLocals());
  };
  return (
    <div className='userProfileContainer'>
      {openInfoModal
        ? <InfoModal
       closeModal={setOpenInfoModal}
       name ={user.name}
       lastname ={user.lastname}
       age ={user.age}
       email={user.email}
        phone_number ={user.phone_number}
        location ={user.location}
        verified={user.verified}
        />
        : null}

      {openBonoModal
        ? <BonoModal
        closeBonoModal={setOpenBonoModal}
        name={user.name}
      />
        : null}
    <Navbar />
    <div className='infoSection'>
        {/* <h2 className='userProfileText'>perfil de usuario</h2> */}
        {user && (
          <div className="userInfo">
            <div className="Decorator"></div>
            <div className="Info">
              {profileImg.length
                ? (
                    image.map((image, i) => (
                    <img
                      key={i}
                      src={profileImg}
                      alt='imagen'
                      className='userImage'
                    />
                    ))
                  )
                : loading === true
                  ? (
                    <Loading color="primary" />
                    )
                  : (
                    <img
                      src='https://cdn-icons-png.flaticon.com/512/3135/3135715.png'
                      alt='image default'
                      className='userImage'
                    />
                    )}
              <h2>{user.name + ' ' + user.lastname}</h2>

            </div>

          </div>
        )}
        <div className='userButtonContainer'>
          <button className='userButtons'
           onClick={() => { setOpenInfoModal(!openInfoModal); }}>
            Informacion
           </button>

          <button
            className={`userButtons ${scroll && 'scroll'}`} >
            Reviews
          </button>

          <button
            className={`userButtons ${scroll && 'scroll'}`}
            onClick = {userLocals}
            >
            Mis establecimientos
          </button>

          <button
          className='userButtons'
          onClick={() => { setOpenBonoModal(!openBonoModal); }}>
            Bonificaciones
            </button>

        </div>
    </div>

    <div className='userAvatarContainer'>

      <p>Cambiar Imagen De Perfil</p>
        <input
          type='file'
          name='imagen'
          accept='image/png,image/jpeg,image/jpg,image/gif'
          onChange={handleChangeimages}
          title='Cambiar Avatar'
        ></input>
    </div>

      <div className='userReviews'>
        <h1 className='reviewTittle'>Reviews </h1>
        {select === 'reviews' && reviews && reviews.map((review) => {
          return (
            <div className='mainContainer' key={review.id}>
              <div key={review.id} className='reviewContainer'>
                <div className='reviewTitle'>
                  <h3>Titulo: {review.title}</h3>
                </div>

                <div className='reviewInfoContainer'>
                  <div className='reviewCalification'>
                    <p>Comentario: {review.comment}</p>
                    <p>Calificaciones:</p>
                    <p>Food :{review.food}</p>
                    <p>Service :{review.service}</p>
                    <p>Environment :{review.environment}</p>
                  </div>
                  <figure className='imgContainer'>
                    <img src={review.Image?.url} alt="" />
                  </figure>
                </div>

                <div className='reviewButtons'>
                  <button>Modificar</button>
                  <button>Eliminar</button>
                </div>

              </div>
            </div>
          );
        })}
      </div>
      {select === 'locals' && userLocal?.user?.Locals && userLocal?.user?.Locals.map((e, i) =>
      <UserLocals
      key={i}
      id={e.id}
      name={e.name}
      image={e.image}
      location={e.location}
      specialty={e.specialty}
      schedule={e.schedule}
      />)}
    <div className="Userprofile"></div>
  </div>
  );
}

export default Userprofile;

//  <div className="AgeGroup">
//                 <h3 className="Age">{user.age}</h3>
//               </div>
//               <div className="TelGroup">
//                 <h3>Tel:</h3>
//                 <p>{user.phone_number}</p>
//               </div>
//               <div className="EmailGroup">
//                 <h3>E-mail:</h3>
//                 <p>{user.email}</p>
//               </div>
//               <div className="LocationGroup">
//                 <h3 className="Location">{user.location}</h3>
//               </div>
