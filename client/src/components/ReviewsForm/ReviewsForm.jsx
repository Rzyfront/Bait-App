
import { useEffect, useState } from 'react';
import { Rating as RatingStar } from '@smastrom/react-rating';
import '@smastrom/react-rating/style.css';
import BaitLogo from '../../assets/BaitLogo.png';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { TfiClose } from 'react-icons/tfi';
import { FaPaperPlane } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import './ReviewsForm.css';
import { useUploadImage } from '../../hooks/useUploadImage';
import { useDispatch } from 'react-redux';
import { comentarie } from '../../redux/actions/actions';
import validate from './revHelper';

function ReviewsForm ({ setToggleModal2, id }) {
  // const [userToken, setDataUser] = useState('');
  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();
  const { image, loading, handleChangeimage } = useUploadImage();

  const [calculateAverage, setcalculateAverage] = useState(0);
  const [calificationFood, setCalificationFood] = useState(0);
  const [calificationService, setCalificationService] = useState(0);
  const [calificationEnvironment, setCalificationEnvironment] = useState(0);
  const [calificationQaPrice, setCalificationQaPrice] = useState(0);

  const [inputs, setInputs] = useState({
    title: '',
    comment: '',
    image: {}
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInputs({
      ...inputs,
      [name]: value
    });

    setErrors(validate({
      ...inputs,
      [name]: value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (inputs.comment.length > 0 && inputs.title.length > 0) {
      dispatch(
        comentarie(
          calificationFood,
          calificationQaPrice,
          calificationEnvironment,
          calificationService,
          calculateAverage,
          inputs,
          id
          // userToken
        )
      );
      toast.success('¡Gracias por tu Opinion!', {
        position: toast.POSITION.TOP_CENTER
      });
      location.reload();
    } else {
      toast.error('¡La reseña no cumple con las normal de Bait!', {
        position: toast.POSITION.TOP_CENTER
      });
    }
  };

  const handleImage = (e) => {
    handleChangeimage(e);
  };
  useEffect(() => {
    setInputs({ ...inputs, image: image[image.length - 1] });
  }, [image.length]);

  // useEffect(() => {
  //   const { token } = JSON.parse(localStorage.getItem('user'));
  //   const data = JSON.parse(localStorage.getItem('user'));
  //   setDataUser(token);
  // }, []);

  useEffect(() => {
    setcalculateAverage(
      (calificationFood +
        calificationQaPrice +
        calificationEnvironment +
        calificationService) /
      4
    );
  }, [
    calificationFood,
    calificationQaPrice,
    calificationEnvironment,
    calificationService
  ]);

  return (<div className="ReviewsForm animated-element">
      <div className="Container">
        <ToastContainer className="notify"/>
        <Link to="/home" className="LinkLogo">
          <img
            src={BaitLogo}
            alt='Bait'
            className='Logo'
            width='40px'
            height='45px'
          />
        </Link>
        <TfiClose
          className='CloseIcon'
          onClick={() => {
            setToggleModal2(false);
          }}
        />
        <div className='Left'>
          <div className='TitleReviewForm'>
            <div className='Decorator'></div>
            <h2 className='Title'>Deja aquí tu Reseña</h2>
          </div>

          <p>
            Tu opinión es vital. Ayuda a otros usuarios a tomar decisiones
            informadas. Al hacerlo, brindas retroalimentación valiosa a los
            dueños del lugar para mejorar su servicio.
          </p>
          <div className='RatingInput'>
          </div>
          <div className='AdicionalRatings'>
            <div className='RatingInput'>
              <h2>Calidad-Precio:</h2>
              {/* Al hacer submit setear el stado calificacion-qaPrice en el Input */}
              <RatingStar
                name='qaPrice'
                style={{ maxWidth: 100 }}
                value={calificationQaPrice}
                onChange={setCalificationQaPrice}
                isRequired
              />
            </div>
            <div className='RatingInput'>
              <h2>Ambiente:</h2>
              {/* Al hacer submit setear el stado calificacion-food en el Input */}
              <RatingStar
                name='enviroment'
                style={{ maxWidth: 100 }}
                value={calificationEnvironment}
                onChange={setCalificationEnvironment}
                isRequired
              />
            </div>

            <div className='RatingInput'>
              <h2>Servicio:</h2>
              {/* Al hacer submit setear el stado calificacion-service en el Input */}
              <RatingStar
                name='service'
                style={{ maxWidth: 100 }}
                value={calificationService}
                onChange={setCalificationService}
                isRequired
              />
            </div>
            <div className='RatingInput'>
              <h2>Comida:</h2>
              {/* Al hacer submit setear el stado calificacion-food en el Input */}
              <RatingStar
                name='food'
                style={{ maxWidth: 100 }}
                value={calificationFood}
                onChange={setCalificationFood}
                isRequired
              />
            </div>
          </div>
             <div className='Total-Rating'>
               <h5>Calificación:</h5>

              <RatingStar
                name='Rating'
                style={{ maxWidth: 150 }}
                value={calculateAverage}
                readOnly
              />
             </div>
        </div>
        <div className='Rigth'>
          <form>
            <div className='TitleReview'>
              <input
                className='Title'
                onChange={handleChange}
                value={inputs.title}
                type='text'
                name='title'
                placeholder='Escribe un titulo para tu reseña...'
                required
              />

            </div>
            <div className='Comment'>
              <textarea
                rows='5'
                className='Message'
                onChange={handleChange}
                value={inputs.comment}
                type='text'
                name='comment'
                placeholder='Cuéntanos tu experiencia en este lugar...'
              />
            {errors.comment && <p className='danger'>{errors.comment}</p>}
            </div>
            <div className='ImgGroup'>
              <input
                className='LoadImg'
                type='file'
                placeholder='Sube una foto de tu visita'
                accept='image/png,image/jpeg,image/jpg,image/gif'
                onChange={handleImage}
              ></input>
              {image.length
                ? (
                <img
                  src={image[image.length - 1].url}
                  alt='imagen'
                  className='imagenDefault'
                />
                  )
                : loading === true
                  ? (
                <img
                  src='https://res.cloudinary.com/dirsusbyy/image/upload/v1681577086/kvkmom2t84yjw3lpc5pz.gif'
                  alt='cargando'
                  className='imagenDefault'
                />
                    )
                  : (
                <img
                  src='https://res.cloudinary.com/dirsusbyy/image/upload/v1680389194/ppex43qn0ykjyejn1amk.png'
                  alt='image default'
                  className='imagenDefault'
                />
                    )}
            </div>
            <button type='submit' onClick={handleSubmit}>
              Enviar <FaPaperPlane />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ReviewsForm;
