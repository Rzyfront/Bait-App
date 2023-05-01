import style from '../FindLocals.module.css';
import { Rating as RatingStar } from '@smastrom/react-rating';
import { MdAttachMoney } from 'react-icons/md';
import { AiFillStar } from 'react-icons/ai';
import { useEffect, useState } from 'react';

const ReviewLocal = ({ sendReview }) => {
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

  return (
    <div className={style.centrar}>
      <div className={style.formContainer}>
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
        <MdAttachMoney className={style.icon}/>
      </button>
      </div>
        <form>
          {step === 1 && (
            !calificar
              ? <><div className={style.general}>
              <h4 className={style.titleSection}>Experiencia</h4>
              <div>
                <input name="titulo" className={style.inputForm} placeholder=" " />
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
              <div>
                <div className={style.fileSelect}>
                  <input type="file" className={style.srcFile1} />
                </div>
              </div>
              <div>
                <div className={style.imgUpload}>
                  <img className={style.img} src="https://res.cloudinary.com/dirsusbyy/image/upload/v1680389194/ppex43qn0ykjyejn1amk.png"/>
                </div>
              </div>
              <div>
                <input name="reseña" className={style.inputForm} placeholder=" " />
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
              <h4 className={style.titleSection}>Precio</h4>
              <div>
                <input name="precio" className={style.inputForm} placeholder=" " />
                <label htmlFor="precio" className={style.placeholder}>
                  Precio total
                </label>
              </div>
              <div>
                <input name="personas" className={style.inputForm} placeholder=" " />
                <label htmlFor="personas" className={style.placeholder}>
                  Cantidad de personas
                </label>
              </div>
              <div>
                <div className={style.fileSelect2}>
                  <input type="file" className={style.srcFile1} />
                </div>
              </div>
              <div>
                <div className={style.imgUpload}>
                  <img className={style.img} src="https://res.cloudinary.com/dirsusbyy/image/upload/v1680389194/ppex43qn0ykjyejn1amk.png"/>
                </div>
              </div>
              <p className={style.textFactura}><b>IMPORTANTE: </b>Tu factura no sera mostrada en la reseña pero es necesaria para validar que si has comido en ese lugar</p>
            </div>
          )}
        </form>
      </div>
        <div>
          <button className={style.sendReview} onClick={() => sendReview()}>Enviar reseña</button>
        </div>
      </div>
  );
};

export default ReviewLocal;
