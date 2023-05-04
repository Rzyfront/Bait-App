
import { useDispatch, useSelector } from "react-redux";
import "./Userprofile.css";
import {
  getReviews,
  getUserProfile,
  updateUser,
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
import { useNavigate } from "react-router-dom";
import { RiImageAddFill } from 'react-icons/ri';
import swal from 'sweetalert'

import UserLocals from "./UserLocals";

const defaultImg = "https://www.shutterstock.com/image-vector/user-login-authenticate-icon-human-260nw-1365533969.jpg"


function Userprofile() {
  const { image, loading, handleChangeimage } = useUploadImage();

  const [userData, setUserData] = useState({
    name: "",
    lastname: "",
    age: "",
    email: "",
    phone_number: "",
    image: { id: "", url: "" },
    location: "",
    id: ""

  })


  const dispatch = useDispatch();
  const { userId } = useParams();


  const userProfile = useSelector((state) => state.userProfile);
  const obtainUserLocal = useSelector((state) => state.userDashLocals);
  const { user } = useSelector((state) => state.user);

  const [userLocal, setUserLocal] = useState(obtainUserLocal);
  const navigate = useNavigate();
  const [selectedId, setSelectedId] = useState(1);

  useEffect(() => {
    user && dispatch(getUserProfile(user.id));
  }, [user]);


  useEffect(() => {
    dispatch(getReviews(userId));
    dispatch(getUserLocals());
  }, []);

  useEffect(() => {
    user && setUserData({
      id: user.id,
      name: user.name,
      lastname: user.lastname,
      age: user.age,
      email: user.email,
      phone_number: user.phone_number,
      image: image[0],
      location: user.location,
    })
  }, [user, image]);


  useEffect(() => {
    setUserLocal(obtainUserLocal);
  }, [obtainUserLocal]);

  const handleChangeimages = (event) => {
    handleChangeimage(event);
  };


  const handleDeleteReview = async (id) => {

    swal({
      title: '¿Está seguro(a)',
      text: 'Una vez borrado no podrás deshacer esta acción',
      icon: 'warning',
      buttons: true,
      dangerMode: true
    })
      .then(async (willDelete) => {
        if (willDelete) {
          await axios.delete(`/reviews/${id}`).then((res) => {

            swal('¡Review eliminada con éxito!', {
              icon: 'success'
            });
            dispatch(getAllLocal(1, ''));


          }).catch((err)=>{
            swal(err.response.data.message)
          })
        }
      })
  }

    const handleInicio = () => {
      navigate("/home/1?name=&city=");
    };

    const handleChange = (event) => {
      let property = event.target.name
      let value = event.target.value

      setUserData({
        ...userData,
        [property]: value
      })
    }

    const handleSave = () => {
      dispatch(updateUser(userData))
      swal(`Usuario Actualizado Exitosamente `)
      window.location.reload(false)
    }



    return (
      <div className={style.profileContainer}>
        <div className={style.navBar}>
          <p className={style.title}>Mi perfil</p>
          <ul className={style.ul}>
            <li className={selectedId == 1 ? style.liSelected : style.li} onClick={() => setSelectedId(1)}><FiUser />  <span>Informacion</span></li>
            <li className={selectedId == 2 ? style.liSelected : style.li} onClick={() => setSelectedId(2)}><AiOutlineStar /> <span>Reseñas</span></li>
            {user?.role === "owner" ? <li className={selectedId == 3 ? style.liSelected : style.li} onClick={() => setSelectedId(3)}><BiRestaurant /> <span>Locales</span></li> : null}
            <li className={selectedId == 4 ? style.liSelected : style.li} onClick={() => setSelectedId(4)}><FiGift /> <span>Bonificaciones</span></li>
            <li className={style.li} onClick={handleInicio}><BiLogOutCircle /> Salir</li>
          </ul>
        </div>
        <div className={style.menu}>
          {selectedId == 1 && <div className={style.infoMenu}>
            <div className={style.resumeInfo}>
              <img src={user?.Image ? user?.Image?.url : defaultImg} className={style.imgProfile} name="Image" />
              <div>
                <p className={style.name}>{user && user.name}</p>
                <p className={style.email}>{user && user.email}</p>
              </div>
            </div>
            <div className={style.form}>
              <div className={style.formLeft}>
                <div className={style.input}>
                  <input onChange={handleChange} name="name" className={style.inputForm} value={userData.name} />
                  <label htmlFor="name" className={style.placeholder}>
                    Nombre
                  </label>

                </div>
                <div className={style.input}>
                  <input onChange={handleChange} name="email" className={style.inputForm} value={user && user.email} />
                  <label htmlFor="email" className={style.placeholder}>
                    Email
                  </label>
                </div>
                <div className={style.input}>
                  <input name="location" className={style.inputForm} value={userData.location} onChange={handleChange} />
                  <label htmlFor="location" className={style.placeholder}>
                    Location
                  </label>
                </div>
              </div>
              <div className={style.formRight}>
                <div className={style.input}>
                  <input onChange={handleChange} name="lastname" className={style.inputForm} value={userData.lastname} />
                  <label htmlFor="lastname" className={style.placeholder}>
                    Apellido
                  </label>
                </div>
                <div className={style.input}>
                  <input name="age" className={style.inputForm} value={userData.age} onChange={handleChange} />
                  <label htmlFor="age" className={style.placeholder}>
                    Edad
                  </label>
                </div>
                <div className={style.input}>
                  <input
                    type="file"
                    name="file"
                    className={style.inputForm}
                    onChange={handleChangeimages} />
                  <label htmlFor="titulo" className={style.placeholder}>
                    Cambiar Imagen
                  </label>
                  {image.length
                    ? (
                      image.map((image, i) => (
                        <img
                          key={i}
                          src={image.url}
                          alt='imagen'
                          className='LocalesImage'
                        />
                      ))
                    )
                    : loading === true
                      ? (
                        <Loading color="primary" />
                      )
                      : (

                        <RiImageAddFill className='LocalesImage' />
                      )}
                </div>
              </div>
            </div>
            <button onClick={handleSave} className={style.saveChanges}>Guardar</button>
          </div>}
          {selectedId == 2 && <div className={style.myLocals}>
            <p className={style.titleLocal}>Ultimas reseñas</p>
            {userProfile?.Reviews.map((rev) => {
              return (<div key={rev.id}>
                <h4>{rev.title}</h4>
                <p>{rev.comment}</p>
                <div>
                  <p>Calificaciones</p>
                  <p>Ambiente :{rev.environment}</p>
                  <p>Comida :{rev.food}</p>
                  <p>Calida-Precio : {rev.qaPrice}</p>
                  <p>Servicio{rev.service}</p>
                  <p>Estado:{rev.verified}</p>
                  <p>Fecha de Creacion : {rev.updatedAt}</p>

                </div>
                <div >
                  <button id={rev.id} onClick={() => { handleDeleteReview(rev.id) }}>Eliminar Review</button>
                </div>
              </div>)
            })}
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
            <img src="https://cdn-icons-png.flaticon.com/512/5957/5957125.png" className={style.imgGift} />
            <p className={style.titleGift}>Lamentamos informarte que las recompensas no estan activas</p>
          </div>
          }
        </div>
      </div>

    );
  } 
  export default Userprofile;

