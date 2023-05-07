
import { useDispatch, useSelector } from 'react-redux';
import './Userprofile.css';
import {
  getReviews,
  getUserProfile,
  updateUser,
  getUserLocals
} from '../../redux/actions/actions';
import { Rating as RatingStar } from '@smastrom/react-rating';
import axios from 'axios';
import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import { useUploadImage } from '../../hooks/useUploadImage';
import style from './UserProfile.module.css';
import { FiUser, FiGift } from 'react-icons/fi';
import { AiOutlineStar } from 'react-icons/ai';
import { BiRestaurant, BiLogOutCircle } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import ChangePassword from './ChangePassword/ChangePassword';

import UserLocals from './UserLocals';

const defaultImg = 'https://t3.ftcdn.net/jpg/05/79/55/26/360_F_579552668_sZD51Sjmi89GhGqyF27pZcrqyi7cEYBH.jpg';

function Userprofile () {
  const { image, handleChangeimage } = useUploadImage();

  const [userData, setUserData] = useState({
    name: '',
    lastname: '',
    age: '',
    email: '',
    phone_number: '',
    image: { id: '', url: '' },
    location: '',
    id: ''

  });

  const dispatch = useDispatch();
  const { userId } = useParams();

  const userProfile = useSelector((state) => state.userProfile);
  const obtainUserLocal = useSelector((state) => state.userDashLocals);
  const { user } = useSelector((state) => state.user);

  const [userLocal, setUserLocal] = useState([]);
  const navigate = useNavigate();
  const [selectedId, setSelectedId] = useState(1);
  const [edit, setEdit] = useState(false);
  const [passwords, setPassWords] = useState({
    oldPassword: '',
    newPassword: ''
  });

  const handleChangePasswords = (event) => {
    const property = event.target.name;
    const value = event.target.value;

    setPassWords({
      ...passwords,
      [property]: value
    });
  };

  const handleSavePassword = async () => {
    try {
      const response = await axios.put('/changePassword',
        {
          oldPassword: passwords.oldPassword,
          newPassword: passwords.newPassword
        });

      if (response.data.success) {
        alert('Contraseña cambiada con exito');
      }
    } catch (error) {
      alert(`Hubo Un error ${error.message}`);
    }
  };

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
      location: user.location
    });
  }, [user, image]);

  useEffect(() => {
    setUserLocal(obtainUserLocal?.user?.Locals);
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
          }).catch((err) => {
            swal(err.response.message);
          });
        }
      });
  };

  const handleInicio = () => {
    navigate('/home');
  };

  const handleChange = (event) => {
    const property = event.target.name;
    const value = event.target.value;

    const handleSave = () => {
      dispatch(updateUser(userData));
      swal('Usuario Actualizado Exitosamente ');
      window.location.reload(false);
    };
    setUserData({
      ...userData,
      [property]: value
    });
  };

  const handleSave = () => {
    dispatch(updateUser(userData));
    swal('Usuario Actualizado Exitosamente ');
  };

  const handlePasswordChange = () => {
    setPasswordChange(!passwordChange);
  };

  return (
    <div className={style.profileContainer}>
      <div className={style.navBar}>
        <p className={style.title}>Mi perfil</p>
        <ul className={style.ul}>
          <li className={selectedId === 1 ? style.liSelected : style.li} onClick={() => setSelectedId(1)}><FiUser />  <span>Informacion</span></li>
          <li className={selectedId === 2 ? style.liSelected : style.li} onClick={() => setSelectedId(2)}><AiOutlineStar /> <span>Reseñas</span></li>
          {user?.role === 'owner' ? <li className={selectedId === 3 ? style.liSelected : style.li} onClick={() => setSelectedId(3)}><BiRestaurant /> <span>Locales</span></li> : null}
          <li className={selectedId === 4 ? style.liSelected : style.li} onClick={() => setSelectedId(4)}><FiGift /> <span>Bonificaciones</span></li>
          <li className={style.li} onClick={handleInicio}><BiLogOutCircle /> <span>Salir</span></li>
        </ul>
      </div>
      <div className={style.menu}>
        {selectedId === 1 && <div className={style.infoMenu}>
          <div className={style.resumeInfo}>
            <input
            size="100"
              type="file"
              name="file"
              className={style.inputFile}
              onChange={handleChangeimages} />
            <img src={user?.Image ? user?.Image?.url : defaultImg} className={style.imgProfile} name="Image" />
            <div>
              <p className={style.name}>{user && user.name}</p>
              <p className={style.email}>{user && user.email}</p>
            </div>
          </div>
          <div className={style.form}>
            <div className={style.formLeft}>
              <div className={style.input}>
                { edit ? <input onChange={handleChange} name="name" className={style.inputForm} value={userData.name} /> : <input readOnly onChange={handleChange} name="name" className={style.inputForm} value={userData.name} />}
                <label htmlFor="name" className={style.placeholder}>
                  Nombre
                </label>

              </div>
              <div className={style.input}>
                { edit ? <input onChange={handleChange} name="email" className={style.inputForm} value={user && user.email} /> : <input readOnly onChange={handleChange} name="email" className={style.inputForm} value={user && user.email} />}
                <label htmlFor="email" className={style.placeholder}>
                  Email
                </label>
              </div>
              <div className={style.input}>
                {edit ? <input name="location" className={style.inputForm} value={userData.location} onChange={handleChange} /> : <input name="location" readOnly className={style.inputForm} value={userData.location} onChange={handleChange} /> }
                <label htmlFor="location" className={style.placeholder}>
                  Location
                </label>
              </div>
              <div className={style.input}>
                {edit ? <input type="password" name="oldPassword" className={style.inputForm} onChange={handleChangePasswords} /> : <input type="password" readOnly name="oldPassword" className={style.inputForm} onChange={handleChangePasswords} /> }
                <label htmlFor="oldPassword" className={style.placeholder}>
                  Contraseña actual
                </label>
              </div>
            </div>
            <div className={style.formRight}>
              <div className={style.input}>
                {edit ? <input onChange={handleChange} name="lastname" className={style.inputForm} value={userData.lastname} /> : <input onChange={handleChange} readOnly name="lastname" className={style.inputForm} value={userData.lastname} /> }
                <label htmlFor="lastname" className={style.placeholder}>
                  Apellido
                </label>
              </div>
              <div className={style.input}>
                {edit ? <input name="age" className={style.inputForm} value={userData.age} onChange={handleChange} /> : <input name="age" readOnly className={style.inputForm} value={userData.age} onChange={handleChange} /> }
                <label htmlFor="age" className={style.placeholder}>
                  Edad
                </label>
              </div>
              <div className={style.input}>
                {edit ? <input name="phone_number" className={style.inputForm} value={userData.phone_number} onChange={handleChange} /> : <input name="phone_number" readOnly className={style.inputForm} value={userData.phone_number} onChange={handleChange} /> }
                <label htmlFor="phone_number" className={style.placeholder}>
                  Teléfono
                </label>
              </div>
              <div className={style.input}>
                {edit ? <input type="password" name="newPassword" className={style.inputForm} onChange={handleChangePasswords} /> : <input type="password" readOnly name="newPassword" className={style.inputForm} onChange={handleChangePasswords} />}
                <label htmlFor="newPassword" className={style.placeholder}>
                  Nueva contraseña
                </label>
              </div>
            </div>
          </div>
          <div className={style.buttonContainer}>
          {edit
            ? <button onClick={() => {setEdit(!edit); handleSavePassword()}} className={style.editChanges}>Guardar</button>
            : <button onClick={() => setEdit(!edit)} className={style.saveChanges}>Editar</button>}
          </div>
        </div>}
        {selectedId === 2 && <div className={style.myLocals}>
            <p className={style.titleLocal}>Ultimas reseñas</p>
            <div key={1} className={style.reviews}>
                  <div className={style.reviewContainer}>
                    <div style={{ display: 'flex' }}>
                      <h4 className={style.titleReview}>Excelente atencion</h4><RatingStar
                        className={style.ratingStar}
                        name='Rating'
                        style={{ maxWidth: 100, marginLeft: '20px' }}
                        value={4}
                        readOnly
                      />
                    </div>
                    <p className={style.commentReview}>Muy amables con la atencion en el ligar, me encanto</p>
                    <div className={style.detailReview}>
                      <p className={style.dateReview}>04/12/2023</p>
                    </div>
                    <div style={{ textAlign: 'center', marginTop: '20px' }}>
                      <button className={style.deleteReview} id={1} onClick={() => { handleDeleteReview(1); }}>Eliminar</button>
                    </div>
                  </div>

                </div>
                <div key={1} className={style.reviews}>
                  <div className={style.reviewContainer}>
                    <div style={{ display: 'flex' }}>
                      <h4 className={style.titleReview}>Excelente atencion</h4><RatingStar
                        className={style.ratingStar}
                        name='Rating'
                        style={{ maxWidth: 100, marginLeft: '20px' }}
                        value={4}
                        readOnly
                      />
                    </div>
                    <p className={style.commentReview}>Muy amables con la atencion en el ligar, me encanto</p>
                    <div className={style.detailReview}>
                      <p className={style.dateReview}>04/12/2023</p>
                    </div>
                    <div style={{ textAlign: 'center', marginTop: '20px' }}>
                      <button className={style.deleteReview} id={1} onClick={() => { handleDeleteReview(1); }}>Eliminar</button>
                    </div>
                  </div>

                </div>
            <div key={1} className={style.reviews}>
                  <div className={style.reviewContainer}>
                    <div style={{ display: 'flex' }}>
                      <h4 className={style.titleReview}>Excelente atencion</h4><RatingStar
                        className={style.ratingStar}
                        name='Rating'
                        style={{ maxWidth: 100, marginLeft: '20px' }}
                        value={4}
                        readOnly
                      />
                    </div>
                    <p className={style.commentReview}>Muy amables con la atencion en el ligar, me encanto</p>
                    <div className={style.detailReview}>
                      <p className={style.dateReview}>04/12/2023</p>
                    </div>
                    <div style={{ textAlign: 'center', marginTop: '20px' }}>
                      <button className={style.deleteReview} id={1} onClick={() => { handleDeleteReview(1); }}>Eliminar</button>
                    </div>
                  </div>

                </div>

            {userProfile?.Reviews.map((rev) => {
              return (
                <div key={rev.id} className={style.reviews}>
                  <div className={style.reviewContainer}>
                    <div style={{ display: 'flex' }}>
                      <h4 className={style.titleReview}>{rev.title}</h4><RatingStar
                        className={style.ratingStar}
                        name='Rating'
                        style={{ maxWidth: 100, marginLeft: '20px' }}
                        value={4}
                        readOnly
                      />
                    </div>
                    <p className={style.commentReview}>{rev.comment}</p>
                    <div className={style.detailReview}>
                      <p className={style.dateReview}>04/12/2023</p>
                    </div>
                    <div style={{ textAlign: 'center', marginTop: '20px' }}>
                      <button className={style.deleteReview} id={rev.id} onClick={() => { handleDeleteReview(rev.id); }}>Eliminar</button>
                    </div>
                  </div>

                </div>
              );
            })
              }

        </div>}

        {selectedId == 3 && <div className={style.myLocals}>
          <p className={style.titleLocal}>Mis locales</p>
          <div className={style.localContainer}>
            {userLocal && userLocal.map((local, index) => {
              return (
                <UserLocals
                  // key={local.id}
                  id={local.id}
                  name={local.name}
                  image={local.image}
                  location={local.location}
                  specialty={local.specialty}
                  key={index}
                />
              );
            })}

          </div>
        </div>}
        {selectedId === 4 && <div className={style.giftMenu}>
          <p className={style.titleLocal}>Bonificaciones</p>
          <img src="https://cdn-icons-png.flaticon.com/512/5957/5957125.png" className={style.imgGift} />
          <p className={style.titleGift}>Lamentamos informarte que las recompensas no están activas</p>
        </div>
        }
      </div>
    </div>

  );
}

export default Userprofile;
