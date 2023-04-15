import React from "react";
import { Rating as RatingStar } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import BaitLogo from "../../assets/BaitLogo.png";
import ImageEmpy from "../../assets/ImageEmpy.jpg";
import { TfiClose } from "react-icons/tfi";
import { FaPaperPlane } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useState } from "react";
import "./ReviewsForm.css";

// eslint-disable-next-line
/* const regexEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

export const validate = (inputs) => {
  let errors = {};

  if (!regexEmail.test(inputs.email)) {
    errors.email = "Debe ser un correo electronico";
  }
  if (!inputs.message) {
    errors.message = "Se requiere un mensaje";
  }
  return errors;
}; */

function ReviewsForm({ setToggleModal2 }) {
  const [calculateAverage, setcalculateAverage] = useState(0);
  const [calificationFood, setCalificationFood] = useState(0);
  const [calificationService, setCalificationService] = useState(0);
  const [calificationEnvironment, setCalificationEnvironment] = useState(0);
  const [calificationQaPrice, setCalificationQaPrice] = useState(0);
  const [inputs, setInputs] = useState({
    title: "",
    rating: "",
    comment: "",
    image: {}, 
    food: "", 
    service: "",
    enviroment: "",
    qaPrice:"",
  });

  const [errors, setErrors] = useState({
    title: "",
    rating: "",
    comment: "",
    image: {}, 
    food: "", 
    service: "",
    enviroment: "",
    qaPrice:"",
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
        qaPrice:"",
      });
      setErrors({
        title: "",
        rating: "",
        comment: "",
        image: {}, 
        food: "", 
        service: "",
        enviroment: "",
        qaPrice:"",
      });
    } else {
      alert("Debe llenar todos los campos");
    }
    const calculateAverage=() => {
      const total = calificationFood + calificationService + calificationEnvironment + calificationQaPrice;
      // Cálculo del promedio
      const average = total / 4;
      return average;
    } 
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
            {/* Al hacer submit setear el stado calificacion en el Input */}     
            {/* <RatingStar
              name="Rating"
              style={{ maxWidth: 180 }}
              value={calculateAverage()}
              onChange={setcalculateAverage}
              isRequired
            /> */}
          </div>
          <div className="RatingInput">
            <h2>Comida:</h2>
            {/* Al hacer submit setear el stado calificacion-food en el Input */}
            <RatingStar
              name="food"
              style={{ maxWidth: 180 }}
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
              style={{ maxWidth: 180 }}
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
              style={{ maxWidth: 180 }}
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
              style={{ maxWidth: 180 }}
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
                name="Title"
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
                name="Image"
                id="image"
                placeholder="Sube una foto de tu visita"
              ></input>
              <img src={ImageEmpy} alt="" width="280px" />
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
