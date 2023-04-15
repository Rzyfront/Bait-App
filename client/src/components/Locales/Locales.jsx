import React from "react";
import { useState } from "react";

// eslint-disable-next-line
const regexEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

export const validate = (inputs) => {
  let errors = {};
  if (!inputs.location) {
    errors.location = "Seleccione una opcion";
  }
  if (!inputs.name) {
    errors.name = "Se requiere un nombre";
  }
  if (!regexEmail.test(inputs.email)) {
    errors.email = "Debe ser un correo electronico";
  }
  if (!inputs.imagen) {
    errors.imagen = "Se requiere cargar una o mas imagenes del Local";
  }
  if (!inputs.phone) {
    errors.phone = "Ingrese un numero de telefono valido";
  }
  if (!inputs.categories) {
    errors.categories = "Seleccione una o mas categorias que ofrece el Local";
  }
  if (!inputs.schedule) {
    errors.schedule = "Seleccione que dias ofrece servicio el Local";
  }
  if (!inputs.turns) {
    errors.turns = "Seleccione en que turnos ofrece servicio el Local";
  }
  return errors;
};

function Locales() {
  const [inputs, setInputs] = useState({
    location: "",
    name: "",
    imagen: "",
    email: "",
    phone: "",
    categories: [],
    schedule: [],
    turns: [],
  });

  const [errors, setErrors] = useState({
    location: "",
    name: "",
    imagen: "",
    email: "",
    phone: "",
    categories: [],
    schedule: [],
    turns: [],
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
        location: "",
        name: "",
        imagen: "",
        email: "",
        phone: "",
        categories: [],
        schedule: [],
        turns: [],
      });
      setErrors({
        location: "",
        name: "",
        imagen: "",
        email: "",
        phone: "",
        categories: [],
        schedule: [],
        turns: [],
      });
    } else {
      alert("Debe llenar todos los campos");
    }
  };

  return (
    <div>
      <h1>Crea un nuevo Local</h1>
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

        <label>Ubicacion: </label>
        <select
          name="location"
          className="location"
          onChange={() => alert("Change")}
        >
          <option value="value2" selected>
            Selecciona
          </option>
          <option value="value1">Cordoba</option>
          <option value="value2">Buenos Aires</option>
          <option value="value3">Corrientes</option>
        </select>
        <hr />
        <label>Correo Electronico: </label>
        <input
          className="correo"
          onChange={handleChange}
          value={inputs.email}
          type="text"
          name="email"
          placeholder="Escribe tu email..."
        />
        {errors.email && <p className="danger">{errors.email}</p>}
        <hr />

        <label>Telefono: </label>
        <input
          className="telefono"
          onChange={handleChange}
          value={inputs.phone}
          type="tel"
          name="phone"
          pattern="[0-9]{10}"
          placeholder="Escribe tu numero de telefono..."
        />
        {errors.message && <p className="danger">{errors.phone}</p>}
        <hr />
        <label for="imagen">Imagenes</label>
        <input
          type="file"
          name="imagen"
          accept="image/*"
          multiple
          value={inputs.imagen}
          onChange={handleChange}
          required
        ></input>
        <hr />

        <label>Tipos de Comida: </label>
        <select
          id="category-select"
          multiple
          name="checkbox"
          className="checkbox"
          onChange={() => alert("Change")}
        >
          <option value="value1">Comida Italiana</option>
          <option value="value1">Comida Japonesa</option>
          <option value="value2">Comida Vegana</option>
          <option value="value3">Comida China</option>
          <option value="value4">Comida Mediterranea</option>
          <option value="value5">Comida de Mar</option>
          <option value="value6">Desayunos</option>
          <option value="value7">Bar y Bedidas</option>
          <option value="value8">Heladeria</option>
          <option value="value9">Postres</option>
          <option value="value10">Panaderia</option>
        </select>
        <hr />

        <legend>Días de Trabajo:</legend>
        <label for="lunes">
          <input
            type="checkbox"
            multiple
            value={inputs.schedule}
            onChange={handleChange}
            id="lunes"
            name="dias"
          />
          Lunes
        </label>
        <label for="martes">
          <input type="checkbox" id="martes" name="dias" value="martes" />
          Martes
        </label>
        <label for="miercoles">
          <input type="checkbox" id="miercoles" name="dias" value="miercoles" />
          Miércoles
        </label>
        <label for="jueves">
          <input type="checkbox" id="jueves" name="dias" value="jueves" />
          Jueves
        </label>
        <label for="viernes">
          <input type="checkbox" id="viernes" name="dias" value="viernes" />
          Viernes
        </label>
        <label for="sabado">
          <input type="checkbox" id="sabado" name="dias" value="sabado" />
          Sabado
        </label>
        <label for="domingo">
          <input type="checkbox" id="domingo" name="dias" value="domingo" />
          Domingo
        </label>
        <hr />

        <button type="submit"> ENVIAR</button>
      </form>
    </div>
  );
}

export default Locales;
