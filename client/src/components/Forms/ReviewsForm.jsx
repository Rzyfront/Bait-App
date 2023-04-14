import React from "react";
import { useState } from "react";
import "./ReviewsForm.css";

// eslint-disable-next-line
const regexEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

export const validate = (inputs) => {
  let errors = {};

  if (!inputs.name) {
    errors.name = "Se requiere un nombre";
  }
  if (!regexEmail.test(inputs.email)) {
    errors.email = "Debe ser un correo electronico";
  }
  if (!inputs.message) {
    errors.message = "Se requiere un mensaje";
  }
  return errors;
};

function ReviewsForm() {
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
        <h1 className="Title">Deja aqui tu Reseña</h1>
        <form onSubmit={handleSubmit}>
          <label>Nombre Local: </label>
          <input
            className="name"
            onChange={handleChange}
            value={inputs.name}
            type="text"
            name="name"
            placeholder="Escribe el nombre del Local..."
          />
          {errors.name && <p className="danger">{errors.name}</p>}
          <hr />

          <label>Puntuacion: </label>
          <input
            className="score"
            onChange={handleChange}
            value={inputs.score}
            type="text"
            name="email"
            placeholder="Escribe tu puntuacion"
          />
          <hr />

          <label>Mensaje: </label>
          <textarea
            className="message"
            onChange={handleChange}
            value={inputs.message}
            type="text"
            name="message"
            placeholder="Escribe tu mensaje..."
          />
          {errors.message && <p className="danger">{errors.message}</p>}

          <button type="submit"> ENVIAR</button>
        </form>
      </div>
    </div>
  );
}

export default ReviewsForm;
