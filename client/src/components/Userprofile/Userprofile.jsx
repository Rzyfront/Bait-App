import { useDispatch, useSelector } from "react-redux";
import "./Userprofile.css";
import {
  getReviews,
  getUserProfile,
  userPostImg,
  getUserLocals,
} from "../../redux/actions/actions";
import axios from "axios";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { useUploadImage } from "../../hooks/useUploadImage";
import { Loading } from "@nextui-org/react";
import style from "./UserProfile.module.css";
import { FiUser, FiGift } from "react-icons/fi"
import { AiOutlineStar } from "react-icons/ai"
import { BiRestaurant, BiLogOutCircle } from "react-icons/bi"
import InfoModal from "../Userprofile/InfoModal/InfoModal";
import BonoModal from "../Userprofile/BonoModal/BonoModal";
import { useNavigate } from "react-router-dom";

import UserLocals from "./UserLocals";

function Userprofile() {
  const { image, loading, handleChangeimage } = useUploadImage();
  const [profileImg, setProfileImg] = useState([]);

  const [openInfoModal, setOpenInfoModal] = useState(false);
  const [openBonoModal, setOpenBonoModal] = useState(false);
  const [userReview, setUserReview] = useState([]);

  const dispatch = useDispatch();
  const { userId } = useParams();

  const { user } = useSelector((state) => state.user);
  const userProfile = useSelector((state) => state.userProfile);
  const reviews = useSelector((state) => state.reviews);
  const obtainUserLocal = useSelector((state) => state.userDashLocals);
  const [userLocal, setUserLocal] = useState(obtainUserLocal);
  const navigate = useNavigate();
  const [selectedId, setSelectedId] = useState(1);

  useEffect(() => {
    user && dispatch(getUserProfile(user.id));
  }, [user]);

  userProfile && console.log(userProfile);
  useEffect(() => {
    dispatch(getReviews(userId));
    dispatch(getUserLocals());
  }, []);

  useEffect(() => {
    if (image.length) {
      setProfileImg(image[0].url);
      user.Image = profileImg;
    }
  }, [image, user]);

  useEffect(() => {
    setUserLocal(obtainUserLocal);
  }, [obtainUserLocal]);

  const handleChangeimages = (event) => {
    handleChangeimage(event);
  };

  const handleSaveImg = async () => {
    await axios.post(`/user/${user.id}`, {
      Image: { id: 2, url: [profileImg] },
    });
  };

  const handleDeleteReview = async (e) => {
    const reviewId = Number(e.target.id);

    const newReviews = userReview.filter((rev) => rev.id !== reviewId);

    setUserReview(newReviews);
    await axios.put(`/reviews/${reviewId}`, {
      title: "Modificado",
      UserId: user.id,
      toxicity: 0,
      comment: "Eliminada",
      verified: "archived",
    });
  };
  const handleInicio = () => {
    navigate("/home/1?name=&city=");
  };
  return (
    <div className={style.profileContainer}>
    <div className={style.navBar}>
      <p className={style.title}>Mi perfil</p>
      <ul className={style.ul}>
        <li className={selectedId == 1 ? style.liSelected : style.li} onClick={() => setSelectedId(1)}><FiUser/>  <span>Informacion</span></li>
        <li className={selectedId == 2 ? style.liSelected : style.li} onClick={() => setSelectedId(2)}><AiOutlineStar/> <span>Reseñas</span></li>
        <li className={selectedId == 3 ? style.liSelected : style.li} onClick={() => setSelectedId(3)}><BiRestaurant/> <span>Locales</span></li>
        <li className={selectedId == 4 ? style.liSelected : style.li} onClick={() => setSelectedId(4)}><FiGift /> <span>Bonificaciones</span></li>
        <li className={style.li} onClick={handleInicio}><BiLogOutCircle/> Salir</li>
      </ul>
    </div>
    <div className={style.menu}>
      {selectedId == 1 && <div className={style.infoMenu}>
        <div className={style.resumeInfo}>
          <img src="https://w7.pngwing.com/pngs/421/258/png-transparent-mark-zuckerberg-facebook-f8-social-networking-service-mark-zuckerberg-celebrities-face-head.png"className={style.imgProfile}/>
          <div>
            <p className={style.name}>Mark Zukaritas</p>
            <p className={style.email}>markzuck@gmail.com</p>
          </div>
        </div>
        <div className={style.form}>
        <div className={style.formLeft}>
        <div className={style.input}>
                <input name="titulo" className={style.inputForm} placeholder=" " />
                <label htmlFor="titulo" className={style.placeholder}>
                  Nombre
                </label>
              </div>
        <div className={style.input}>
                <input name="titulo" className={style.inputForm} placeholder=" " />
                <label htmlFor="titulo" className={style.placeholder}>
                  Email
                </label>
              </div>
        <div className={style.input}>
                <input name="titulo" className={style.inputForm} placeholder=" " />
                <label htmlFor="titulo" className={style.placeholder}>
                  Location
                </label>
              </div>
        </div>
        <div className={style.formRight}>
          <div className={style.input}>
                <input name="titulo" className={style.inputForm} placeholder=" " />
                <label htmlFor="titulo" className={style.placeholder}>
                  Apellido
                </label>
              </div>
              <div className={style.input}>
                <input name="titulo" className={style.inputForm} placeholder=" " />
                <label htmlFor="titulo" className={style.placeholder}>
                  Apellido
                </label>
              </div>
        <div className={style.input}>
                <input name="titulo" className={style.inputForm} placeholder=" " />
                <label htmlFor="titulo" className={style.placeholder}>
                  Codigo postal
                </label>
              </div>
        </div>
        </div>
        <button className={style.saveChanges}>Guardar</button>
      </div>}
      {selectedId == 2 && <div className={style.myLocals}>
        <p className={style.titleLocal}>Ultimas reseñas</p>
      </div>}
      {selectedId == 3 && <div className={style.myLocals}>
        <p className={style.titleLocal}>Mis locales</p>
        <div className={style.localContainer}>
          <div className={style.local}></div>
          <div className={style.local}></div>
          <div className={style.local}></div>
          {/* <div className={style.local}></div> */}
          {/* <div className={style.local}></div> */}
        </div>
      </div>}
      {selectedId == 4 && <div className={style.giftMenu}>
        <p className={style.titleLocal}>Bonificaciones</p>
        <img src="https://cdn-icons-png.flaticon.com/512/5957/5957125.png" className={style.imgGift}/>
        <p className={style.titleGift}>Lamentamos informarte que las recompensas no estan activas</p>
      </div>
      }
    </div>
    </div>
    // (user?.role === 'user'

    //   ? <div className='userProfileContainer'>
    //     <div>
    //         <button onClick={handleInicio}>Incio</button>
    //     </div>
    //     {openInfoModal
    //       ? <InfoModal
    //       closeModal={setOpenInfoModal}
    //       name={user.name}
    //       lastname={user.lastname}
    //       age={user.age}
    //       email={user.email}
    //       phone_number={user.phone_number}
    //       location={user.location}
    //       verified={user.verified}
    //     />
    //       : null}

    //     {openBonoModal
    //       ? <BonoModal
    //       closeBonoModal={setOpenBonoModal}
    //       name={user.name}
    //     />
    //       : null}

    //     <div className='infoSection'>
    //       {/* <h2 className='userProfileText'>perfil de usuario</h2> */}
    //       {user && (
    //         <div className="userInfo">
    //           <div className="Decorator"></div>
    //           <div className="Info">
    //             {profileImg.length
    //               ? (
    //                   image.map((image, i) => (
    //                   <img
    //                     key={i}
    //                     src={profileImg}
    //                     alt='imagen'
    //                     className='userImage'
    //                   />
    //                   ))
    //                 )
    //               : loading === true
    //                 ? (
    //                   <Loading color="primary" />
    //                   )
    //                 : (
    //                   <img
    //                     src='https://cdn-icons-png.flaticon.com/512/3135/3135715.png'
    //                     alt='image default'
    //                     className='userImage'
    //                   />
    //                   )}
    //             <h2>{user.name + ' ' + user.lastname}</h2>

    //           </div>

    //         </div>
    //       )}
    //       <div className='userButtonContainer'>
    //         <button className='userButtons'
    //           onClick={() => { setOpenInfoModal(!openInfoModal); }}>
    //           Información
    //         </button>

    //         <button

    //           className={`userButtons ${scroll && 'scroll'}`} >

    //           Reviews
    //         </button>

    //         <button
    //           className='userButtons'
    //           onClick={() => { setOpenBonoModal(!openBonoModal); }}>
    //           Bonificaciones
    //         </button>

    //       </div>
    //     </div>

    //     <div className='userAvatarContainer'>

    //       <p>Cambiar imagen de perfil</p>
    //       <input
    //         type='file'
    //         name='imagen'
    //         accept='image/png,image/jpeg,image/jpg,image/gif'
    //         onChange={handleChangeimages}
    //         title='Cambiar Avatar'
    //       ></input>
    //       <div>
    //         <button onClick={handleSaveImg}>Guardar</button>
    //       </div>
    //     </div>

    //     <div className='userReviews'>
    //       <h1 className='reviewTittle'>Reviews </h1>
    //       {userProfile.Reviews && userProfile.Reviews.map((review) => {
    //         return (
    //           <div key={review.id} className='mainContainer'>
    //             <div key={review.id} className='reviewContainer' >
    //               <div className='reviewTitle'>
    //                 <h3>Título: {review.title}</h3>
    //               </div>

    //               <div className='reviewInfoContainer'>

    //                 <div className='reviewCalification'>
    //                   <p>Comentario: {review.comment}</p>
    //                   <p>Calificaciones:</p>
    //                   <p>Food :{review.food}</p>
    //                   <p>Service :{review.service}</p>
    //                   <p>Environment :{review.environment}</p>
    //                 </div>

    //                 <figure className='imgContainer'>
    //                   <img src={review.Image?.url} alt="" />
    //                 </figure>

    //               </div>

    //               <div className='reviewButtons'>
    //                 <button >Modificar</button>
    //                 <button id={review.id} onClick={handleDeleteReview}>Eliminar</button>

    //               </div>
    //             </div>

    //           </div>

    //         );
    //       })}
    //     </div>

    //   </div>
    //   : <div className='userProfileContainer'>
    //       <div>
    //         <button onClick={handleInicio}>Inicio</button>
    //       </div>
    //       {openInfoModal
    //         ? <InfoModal
    //         closeModal={setOpenInfoModal}
    //         name={user.name}
    //         lastname={user.lastname}
    //         age={user.age}
    //         email={user.email}
    //         phone_number={user.phone_number}
    //         location={user.location}
    //         verified={user.verified}
    //       />
    //         : null}

    //       {openBonoModal
    //         ? <BonoModal
    //         closeBonoModal={setOpenBonoModal}
    //         name={user.name}
    //       />
    //         : null}

    //       <div className='infoSection'>
    //         {/* <h2 className='userProfileText'>perfil de usuario</h2> */}
    //         {user && (
    //           <div className="userInfo">
    //             <div className="Decorator"></div>
    //             <div className="Info">
    //               {profileImg.length
    //                 ? (
    //                     image.map((image, i) => (
    //                     <img
    //                       key={i}
    //                       src={profileImg}
    //                       alt='imagen'
    //                       className='userImage'
    //                     />
    //                     ))
    //                   )
    //                 : loading === true
    //                   ? (
    //                     <Loading color="primary" />
    //                     )
    //                   : (
    //                     <img
    //                       src='https://cdn-icons-png.flaticon.com/512/3135/3135715.png'
    //                       alt='image default'
    //                       className='userImage'
    //                     />
    //                     )}
    //               <h2>{user.name + ' ' + user.lastname}</h2>

    //             </div>

    //           </div>
    //         )}
    //         <div className='userButtonContainer'>
    //           <button className='userButtons'
    //             onClick={() => { setOpenInfoModal(!openInfoModal); }}>
    //             Información
    //           </button>

    //           <button

    //             className={`userButtons ${scroll && 'scroll'}`} >

    //           Locales
    //           </button>

    //           <button
    //             className='userButtons'
    //             onClick={() => { setOpenBonoModal(!openBonoModal); }}>
    //             Bonificaciones
    //           </button>

    //         </div>
    //       </div>

    //       <div className='userAvatarContainer'>

    //         <p>Cambiar imagen de perfil</p>
    //         <input
    //           type='file'
    //           name='imagen'
    //           accept='image/png,image/jpeg,image/jpg,image/gif'
    //           onChange={handleChangeimages}
    //           title='Cambiar Avatar'
    //         ></input>
    //         <div>
    //           <button onClick={handleSaveImg}>Guardar</button>
    //         </div>
    //       </div>

    //       <div className='userReviews'>
    //         <h1 className='reviewTittle'>Locales </h1>
    //         <br/>
    //         {/*reviews && reviews.map((review, index) => {
    //           return (
    //             <div className='mainContainer' key={index}>
    //               <div key={review.id} className='reviewContainer'>
    //                 <div className='reviewTitle'>
    //                   <h3>Título: {review.title}</h3>
    //                 </div>

    //                 <div className='reviewInfoContainer'>

    //                   <div className='reviewCalification'>
    //                     <p>Comentario: {review.comment}</p>
    //                     <p>Calificaciones:</p>
    //                     <p>Food :{review.food}</p>
    //                     <p>Service :{review.service}</p>
    //                     <p>Environment :{review.environment}</p>
    //                   </div>

    //                   <figure className='imgContainer'>
    //                     <img src={review.Image?.url} alt="" />
    //                   </figure>

    //                 </div>

    //                 <div className='reviewButtons'>
    //                   <button>Modificar</button>
    //                   <button>Eliminar</button>

    //                 </div>
    //               </div>

    //             </div>

    //           );
    //         })*/}
    //   { userLocal?.user?.Locals
    //     ? userLocal?.user?.Locals.map((e, i) =>
    //       <UserLocals
    //       key={i}
    //       id={e.id}
    //       name={e.name}
    //       image={e.image}
    //       location={e.location}
    //       specialty={e.specialty}
    //       schedule={e.schedule}
    //       />)
    //     : <h6> No tienes Locales </h6>
    //   }
    //       </div>

    //     </div>)
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
