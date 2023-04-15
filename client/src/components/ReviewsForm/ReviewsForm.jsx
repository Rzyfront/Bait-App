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
const regexEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

export const validate = (inputs) => {
  let errors = {};

  if (!regexEmail.test(inputs.email)) {
    errors.email = "Debe ser un correo electronico";
  }
  if (!inputs.message) {
    errors.message = "Se requiere un mensaje";
  }
  return errors;
};

function ReviewsForm({ setToggleModal2 }) {
  const [calification, setCalification] = useState(0);
  const [inputs, setInputs] = useState({
    name: "",
    score: "",
    message: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    score: "",
    message: "",
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
        name: "",
        score: "",
        message: "",
      });
      setErrors({
        name: "",
        score: "",
        message: "",
      });
    } else {
      alert("Debe llenar todos los campos");
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
            <h1 className="Title">Deja aqui tu Reseña</h1>
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
            <RatingStar
              name="Rating"
              style={{ maxWidth: 180 }}
              value={calification}
              onChange={setCalification}
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
                value={inputs.Title}
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
                value={inputs.message}
                type="text"
                name="message"
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
