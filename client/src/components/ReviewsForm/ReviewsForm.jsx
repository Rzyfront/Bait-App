import React, { useEffect } from "react";
import { Rating as RatingStar } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import BaitLogo from "../../assets/BaitLogo.png";

import { TfiClose } from "react-icons/tfi";
import { FaPaperPlane } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useState } from "react";
import "./ReviewsForm.css";
import { useUploadImage } from "../../hooks/useUploadImage";

function ReviewsForm({ setToggleModal2 }) {
  const { image, loading, handleChangeimage } = useUploadImage();

  const [calculateAverage, setcalculateAverage] = useState(0);
  const [calificationFood, setCalificationFood] = useState(0);
  const [calificationService, setCalificationService] = useState(0);
  const [calificationEnvironment, setCalificationEnvironment] = useState(0);
  const [calificationQaPrice, setCalificationQaPrice] = useState(0);

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
    calificationService,
  ]);
  useEffect(() => {
    setInputs({ ...inputs, image: image });
  }, [image]);

  const [inputs, setInputs] = useState({
    title: "",
    rating: "",
    comment: "",
    image: "",
    food: "",
    service: "",
    enviroment: "",
    qaPrice: "",
  });

  const [errors, setErrors] = useState({
    title: "",
    rating: "",
    comment: "",
    image: "",
    food: "",
    service: "",
    enviroment: "",
    qaPrice: "",
  });

  const handleChange = (event) => {
    setInputs({
      ...inputs,
      [event.target.name]: event.target.value,
    });

    setErrors(
      validate({
        ...inputs,
        [event.target.name]: event.target.value,
      })
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!Object.values(errors).length) {
      alert("Datos completos");
      setInputs({
        title: "",
        rating: "",
        comment: "",
        image: {},
        food: "",
        service: "",
        enviroment: "",
        qaPrice: "",
      });
      setErrors({
        title: "",
        rating: "",
        comment: "",
        image: {},
        food: "",
        service: "",
        enviroment: "",
        qaPrice: "",
      });
    } else {
      alert("Debe llenar todos los campos");
    }
  };

  const handleImage = (e) => {
    handleChangeimage(e);
  };

  return (
    <div className="ReviewsForm">
      <div className="Container">
        <Link to="/home" className="LinkLogo">
          <img
            src={BaitLogo}
            alt="Bait"
            className="Logo"
            width="40px"
            height="45px"
          />
        </Link>
        <TfiClose
          className="CloseIcon"
          onClick={() => {
            setToggleModal2(false);
          }}
        />
        <div className="Left">
          <>
            <div className="Decorator"></div>
            <h2 className="Title">Deja aqui tu Reseña</h2>
          </>

          <p>
            Tu opinión es vital. Ayuda a otros usuarios a tomar decisiones
            informadas. Al hacerlo, brindas retroalimentación valiosa a los
            dueños del lugar para mejorar su servicio. ¡Además, algunos lugares
            ofrecen beneficios exclusivos a quienes dejan reseñas! ¡Comparte tu
            opinión hoy!
          </p>
          <div className="RatingInput">
            <h5>Calificación:</h5>

            <RatingStar
              name="Rating"
              style={{ maxWidth: 150 }}
              value={calculateAverage}
              readOnly
            />
          </div>
          <div className="RatingInput">
            <h2>Comida:</h2>
            {/* Al hacer submit setear el stado calificacion-food en el Input */}
            <RatingStar
              name="food"
              style={{ maxWidth: 150 }}
              value={calificationFood}
              onChange={setCalificationFood}
              isRequired
            />
          </div>
          <div className="RatingInput">
            <h2>Servicio:</h2>
            {/* Al hacer submit setear el stado calificacion-service en el Input */}
            <RatingStar
              name="service"
              style={{ maxWidth: 150 }}
              value={calificationService}
              onChange={setCalificationService}
              isRequired
            />
          </div>
          <div className="RatingInput">
            <h2>Ambiente:</h2>
            {/* Al hacer submit setear el stado calificacion-food en el Input */}
            <RatingStar
              name="enviroment"
              style={{ maxWidth: 150 }}
              value={calificationEnvironment}
              onChange={setCalificationEnvironment}
              isRequired
            />
          </div>
          <div className="RatingInput">
            <h2>Relacion Precio-Calidad:</h2>
            {/* Al hacer submit setear el stado calificacion-qaPrice en el Input */}
            <RatingStar
              name="qaPrice"
              style={{ maxWidth: 150 }}
              value={calificationQaPrice}
              onChange={setCalificationQaPrice}
              isRequired
            />
          </div>
        </div>
        <div className="Rigth">
          <form onSubmit={handleSubmit}>
            <div className="TitleReview">
              <input
                className="Title"
                onChange={handleChange}
                value={inputs.title}
                type="text"
                name="title"
                placeholder="Escribe un titulo para tu reseña..."
              />
              {errors.name && <p className="danger">{errors.name}</p>}
            </div>
            <div className="Comment">
              <textarea
                rows="5"
                className="Message"
                onChange={handleChange}
                value={inputs.comment}
                type="text"
                name="comment"
                placeholder="Cuentanos tu experiencia en este lugar..."
              />
              {errors.message && <p className="danger">{errors.message}</p>}
            </div>
            <div className="ImgGroup">
              <input
                className="LoadImg"
                type="file"
                placeholder="Sube una foto de tu visita"
                onChange={handleImage}
              ></input>
              {image ? (
                <img src={image} alt="imagen" className="imagenDefault" />
              ) : loading === true ? (
                <img
                  src="https://res.cloudinary.com/dirsusbyy/image/upload/v1681577086/kvkmom2t84yjw3lpc5pz.gif"
                  alt="cargando"
                  className="imagenDefault"
                />
              ) : (
                <img
                  src="https://res.cloudinary.com/dirsusbyy/image/upload/v1680389194/ppex43qn0ykjyejn1amk.png"
                  alt="image default"
                  className="imagenDefault"
                />
              )}
            </div>
            <button type="submit">
              Enviar <FaPaperPlane />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ReviewsForm;