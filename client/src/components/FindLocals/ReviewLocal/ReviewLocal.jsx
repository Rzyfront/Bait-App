import style from '../FindLocals.module.css';
import { Rating as RatingStar } from '@smastrom/react-rating';
import { Loading } from '@nextui-org/react';
import { AiFillStar } from 'react-icons/ai';
import { RiImageAddFill } from 'react-icons/ri';
import { GoVerified } from 'react-icons/go';
import { useEffect, useState } from 'react';
import { useUploadImage } from '../../../hooks/useUploadImage';
import { useDispatch } from 'react-redux';
import { comentarie } from '../../../redux/actions/actions';
import { useParams } from 'react-router-dom';
import Tiket from './Tiket';
import { ErrorReview } from './ErrorReview';
import { toast, ToastContainer } from 'react-toastify';
import Camara from '../Camare';

const ReviewLocal = ({ sendReview, close }) => {
  const [camara, setcamara] = useState(false);
  const dispatch = useDispatch();
  const { id } = useParams();
  const { image, loading, handleChangeimage, handlePhoto } = useUploadImage();
  const [inputs, setInputs] = useState({
    title: '',
    review: '',
    Tiket: {},
    image: {}
  });
  const [error, setError] = useState({
    title: '',
    review: '',
    Tiket: '',
    image: ''
  });
  useEffect(() => {
    const data = image[image.length - 1];
    if (data) {
      setInputs({
        ...inputs,
        image: { id: data.id, url: data.url }
      });
    }
  }, [image]);

  useEffect(() => {
    setError(ErrorReview({
      ...inputs
    }));
  }, [inputs]);
  const [calificar, setCalificar] = useState(false);
  const [calculateAverage, setcalculateAverage] = useState(0);
  const [calificationFood, setCalificationFood] = useState(0);
  const [calificationService, setCalificationService] = useState(0);
  const [calificationEnvironment, setCalificationEnvironment] = useState(0);
  const [calificationQaPrice, setCalificationQaPrice] = useState(0);
  const [step, setStep] = useState(1);
  const handleStep = (e, n) => {
    e.preventDefault();
    setStep(n);
  };

  const resetearRating = () => {
    setCalificationFood(0);
    setCalificationQaPrice(0);
    setCalificationEnvironment(0);
    setCalificationService(0);
  };

  useEffect(() => {
    if (calificationFood &&
      calificationQaPrice &&
      calificationEnvironment &&
      calificationService) {
      setCalificar(false);
    }
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
  const handleData = (event) => {
    const { name, value } = event.target;
    setInputs({
      ...inputs,
      [name]: value
    });
  };

  const handleSend = async (e) => {
    e.stopPropagation();
    if (!Object.values(error).length) {
      const response = await dispatch(comentarie({ calificationFood, calificationQaPrice, calificationEnvironment, calificationService, inputs, id }));
      if (response === true) {
        toast.success('¡Reseña creada correctamente esperando aprobación!', {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 2000
        });
        setTimeout(() => {
          sendReview();
        }, 2000);
      } else {
        toast.error('Error al enviar reseña', {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 2000
        });
      }
    } else {
      if (error && error.Tiket) {
        setStep(2);
      }
      if (error && !error.Tiket) {
        setStep(1);
      }
      toast.error('Faltan datos por completar', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000
      });
    }
  };
  const handleTiket = (data) => {
    if (data) {
      setInputs({
        ...inputs,
        Tiket: { id: data.id, url: data.url }
      });
    }
  };
  const activeCamare = (e) => {
    e.preventDefault();
    if (camara === true) {
      setcamara(false);
    } else {
      setcamara(true);
    }
  };

  const sendPhotos = async (e) => {
    await handlePhoto(e);
    setcamara(false);
  };

  return (
    <div className={style.centrar} onClick={() => sendReview()}>
      <div className={style.formContainer} onClick={(e) => e.stopPropagation()}>
      <div className={style.navegador}>
      <button
        className={step === 1 ? style.active : style.deactive}
        onClick={(e) => handleStep(e, 1)}
      >
        <AiFillStar className={style.icon}/>
      </button>
      <button
        className={step === 2 ? style.active : style.deactive}
        onClick={(e) => handleStep(e, 2)}
      >
            <GoVerified className={style.icon}/>
      </button>
      </div>
        <form>
          {step === 1 && (
            !calificar
              ? <><div className={style.general}>
              <h4 className={style.titleSection}>Experiencia</h4>
              <div>
                <input name="title" className={style.inputForm} value={inputs.title} onChange={handleData}/>
                <label htmlFor="titulo" className={style.placeholder}>
                  Titulo
                </label>
              </div>
              <div className={style.calificacion} onClick={() => { resetearRating(); setCalificar(true); }}>
                <b style={{ marginRight: '20px', marginTop: '4px' }}>Puntuacion:</b>
              <RatingStar
                className={style.ratingStar}
                name='Rating'
                style={{ maxWidth: 150, marginLeft: '0px' }}
                value={calculateAverage}
                readOnly
              />
              </div>
                <button onClick={activeCamare} className={style.sendReview}>camara</button>
                {camara && camara === true && <Camara activeCamare={activeCamare} sendPhotos={sendPhotos}/>}
                {camara !== true &&
                   <div>
                  <div className={style.fileSelect}>
                    <input id='inputImgReview' type="file" className={style.srcFile1} onChange={handleChangeimage} />
                  </div>

                </div>
                  }
                {camara !== true && <label htmlFor='inputImgReview'>
                  <div className={style.imgUpload}>
                    {loading === true ? <Loading color="primary" className={style.img} /> : JSON.stringify(inputs.image) !== '{}' ? <img src={inputs.image.url} className={style.img} /> : <RiImageAddFill className={style.ImgUploadIco} />}
                  </div>
                </label>}

              <div>
                  <input name="review" className={style.inputForm} onChange={handleData} value={inputs.review} />
                <label htmlFor="reseña" className={style.placeholder}>
                  Reseña
                </label>
              </div>
            </div></>
              : <>
              <h3 style={{ marginBottom: '30px' }}>Puntuacion</h3>
              <h5>Calidad-Precio</h5>
              <p className={style.textRating}>Como te parecio la calidad con relacion al precio</p>
              <RatingStar
              className={style.ratingStar}
                name='enviroment'
                style={{ maxWidth: 150, marginBottom: '10px', marginTop: '5px' }}
                value={calificationQaPrice}
                onChange={setCalificationQaPrice}
                isRequired
              />
              <h5>Ambiente</h5>
              <p className={style.textRating}>Como te parecio el lugar</p>
              <RatingStar
              className={style.ratingStar}
                name='enviroment'
                style={{ maxWidth: 150, marginBottom: '10px', marginTop: '5px' }}
                value={calificationEnvironment}
                onChange={setCalificationEnvironment}
                isRequired
              />
              <h5>Servicio</h5>
              <p className={style.textRating}>Como te parecio la atencion y el servicio</p>
              <RatingStar
                name='enviroment'
                className={style.ratingStar}
                style={{ maxWidth: 150, marginBottom: '10px', marginTop: '5px' }}
                value={calificationService}
                onChange={setCalificationService}
                isRequired
              />
              <h5>Comida</h5>
              <p className={style.textRating}>Cuentanos que tal estuvo la comida</p>
              <RatingStar
                name='enviroment'
                className={style.ratingStar}
                style={{ maxWidth: 150, marginBottom: '10px', marginTop: '5px' }}
                value={calificationFood}
                onChange={setCalificationFood}
                isRequired
              />
              {/* <button className={style.btnVolver} onClick={() => setCalificar(false)}>Volver</button> */}
              </>
          )}
          {step === 2 && (
            <div className={style.general}>

              <div>

              </div>
              <div>
                <Tiket handleTiket={handleTiket} inputs={inputs}/>
              </div>
              <p className={style.textFactura}><b>IMPORTANTE: </b>Tu factura no sera mostrada en la reseña pero es necesaria para validar que si has comido en ese lugar</p>
            </div>
          )}
        </form>
      </div>
        <div>
          <button className={style.sendReview} onClick={handleSend}>Enviar reseña</button>
        </div>
        <ToastContainer/>
      </div>
  );
};

export default ReviewLocal;
