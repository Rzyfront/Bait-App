import React from "react";
import "./Locales.css";
import { useState } from "react";
// eslint-disable-next-line
import axios from "axios";
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
  const [image, setImage] = useState();
  const [loading, setLoading] = useState(false);

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

  const [chekinputs, setChekInputs] = useState({
    wifi: false,
    parking_lot: false,
    outdoor_seating: false,
    live_music: false,
    table_service: false,
    big_group: false,
    work_friendly: false,
    pet_friendly: false,
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
    console.log(inputs);
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

  const handleChangeimage = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      setLoading(true);
      axios
        .post("http://localhost:3001/images", { image: e.target.result })
        .then((res) => {
          setImage(res.data.image.url);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setLoading(false);
        });
    };
    reader.readAsDataURL(file);
  };

  const handleSelect = (event) => {
    setInputs({
      ...inputs,
      location: event.target.value,
    });
    setErrors(
      validate({
        ...inputs,
        location: event.target.value,
      })
    );
  };

  const handleCheck = (e) => {
    console.log(e.target.name, e.target.value);
    if (e.target.value === "false") {
      setChekInputs({ ...chekinputs, [e.target.name]: true });
    } else {
      setChekInputs({ ...chekinputs, [e.target.name]: false });
    }
  };
  return (
    <div className="locales">
      <div className="locales_data">
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
            onChange={handleSelect}
            value={inputs.location}
          >
            <option value="value2" selected>
              Selecciona
            </option>
            <option value="Cordoba">Cordoba</option>
            <option value="Buenos Aires">Buenos Aires</option>
            <option value="Corrientes">Corrientes</option>
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
            // multiple
            onChange={handleChangeimage}
          ></input>
          <hr />
          {image}
          {loading === true ? (
            <img
              src="https://res.cloudinary.com/drnt5l19i/image/upload/v1681571580/xyyhxbfwtuc3quzpmuki.gif"
              alt="carga"
            />
          ) : (
            ""
          )}
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
          <label for="wifi">
            <input
              type="checkbox"
              multiple
              value={chekinputs.wifi}
              onChange={handleCheck}
              name="wifi"
              checked={chekinputs.wifi}
            />
            Wifi
          </label>
          <label for="martes">
            <input type="checkbox" id="martes" name="dias" value="martes" />
            Martes
          </label>
          <label for="miercoles">
            <input
              type="checkbox"
              id="miercoles"
              name="dias"
              value="miercoles"
            />
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
    </div>
  );
}

export default Locales;
