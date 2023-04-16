import React from "react";
import "./Locales.css";
import { useState } from "react";
import BaitLogo from "../../assets/BaitLogo.png";
import { Link } from "react-router-dom";
// eslint-disable-next-line
const regexEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
import { useUploadImage } from "../../hooks/useUploadImage";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { createLocal } from "../../redux/actions/actions";

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

  if (inputs.schedule.length === 0) {
    errors.schedule = "Seleccione fecha";
  }

  return errors;
};

function Locales() {
  let { image, loading, handleChangeimage } = useUploadImage();
  const dispatch = useDispatch();

  const [inputs, setInputs] = useState({
    location: "",
    name: "",
    imagen: [],
    email: "",
    phone: "",
    schedule: "",
  });

  useEffect(() => {
    setInputs({ ...inputs, imagen: image });
    setErrors(
      validate({
        ...inputs,
        imagen: [image],
      })
    );
  }, [image]);

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
    schedule: "",
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
    console.log(errors);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    if (!Object.values(errors).length) {
      alert("Datos completos");
      dispatch(createLocal(inputs, chekinputs));
      setInputs({
        location: "",
        name: "",
        imagen: "",
        email: "",
        phone: "",
        schedule: "",
      });
      setErrors({
        location: "",
        name: "",
        imagen: "",
        email: "",
        phone: "",
        schedule: "",
      });
      setChekInputs({
        wifi: false,
        parking_lot: false,
        outdoor_seating: false,
        live_music: false,
        table_service: false,
        big_group: false,
        work_friendly: false,
        pet_friendly: false,
      });
    } else {
      alert("Debe llenar todos los campos");
    }
  };

  const handleChangeimages = (event) => {
    handleChangeimage(event);
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
    if (e.target.value === "false") {
      setChekInputs({ ...chekinputs, [e.target.name]: true });
    } else {
      setChekInputs({ ...chekinputs, [e.target.name]: false });
    }
    console.log(chekinputs);
  };
  return (
    <div className="locales">
      <div className="locales_data">
      <Link to="/home" className="LinkLogo">
          <img
            src={BaitLogo}
            alt="Bait"
            className="Logo"
            width="60px"
            height="60px"
          />
        </Link>
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
            <option value="value2" defaultValue>
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
          <hr />
          <label>Horario: </label>
          <input
            onChange={handleChange}
            value={inputs.schedule}
            type="text"
            name="schedule"
            placeholder="Escribe tu email..."
          />
          {errors.email && <p className="danger">{errors.schedule}</p>}
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
          <label htmlFor="imagen">Imagenes</label>
          <input
            type="file"
            name="imagen"
            accept="image/*"
            // multiple
            onChange={handleChangeimages}
          ></input>
          <hr />
          {image ? (
            <img src={image} 
            alt="imagen" 
            className="LocalesImage" 
            />
          ) : loading === true ? (
            <img
              src="https://res.cloudinary.com/dirsusbyy/image/upload/v1681577086/kvkmom2t84yjw3lpc5pz.gif"
              alt="cargando"
              className="LocalesImage"
            />
          ) : (
            <img
              src="https://res.cloudinary.com/dirsusbyy/image/upload/v1680389194/ppex43qn0ykjyejn1amk.png"
              alt="image default"
              className="LocalesImage"
              width="60px"
              height="60px"
            />
          )}
          {/* <label>Tipos de Comida: </label> */}
          {/* <select
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
          </select> */}
          <hr />
          <legend>Caracteristicas:</legend>
          <label htmlFor="wifi">
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
          <label htmlFor="parking_lot">
            <input
              type="checkbox"
              name="parking_lot"
              value={chekinputs.parking_lot}
              checked={chekinputs.parking_lot}
              onChange={handleCheck}
            />
            Parqueadero
          </label>
          <label htmlFor="outdoor_seating">
            <input
              type="checkbox"
              name="outdoor_seating"
              value={chekinputs.outdoor_seating}
              checked={chekinputs.outdoor_seating}
              onChange={handleCheck}
            />
            Asientos exteriores
          </label>
          <label htmlFor="live_music">
            <input
              type="checkbox"
              name="live_music"
              value={chekinputs.live_music}
              checked={chekinputs.live_music}
              onChange={handleCheck}
            />
            Musica
          </label>
          <label htmlFor="table_service">
            <input
              type="checkbox"
              name="table_service"
              value={chekinputs.table_service}
              checked={chekinputs.table_service}
              onChange={handleCheck}
            />
            servicio de mesa
          </label>
          <label htmlFor="family_style">
            <input
              type="checkbox"
              name="family_style"
              value={chekinputs.family_style}
              checked={chekinputs.family_style}
              onChange={handleCheck}
            />
            Estilo familiar
          </label>
          <label htmlFor="romantic">
            <input
              type="checkbox"
              name="romantic"
              value={chekinputs.romantic}
              checked={chekinputs.romantic}
              onChange={handleCheck}
            />
            Estilo romantico
          </label>
          <label htmlFor="big_group">
            <input
              type="checkbox"
              name="big_group"
              value={chekinputs.big_group}
              checked={chekinputs.big_group}
              onChange={handleCheck}
            />
            Grupos grandes
          </label>
          <label htmlFor="work_friendly">
            <input
              type="checkbox"
              name="work_friendly"
              value={chekinputs.work_friendly}
              checked={chekinputs.work_friendly}
              onChange={handleCheck}
            />
            Ambiente relajante
          </label>
          <label htmlFor="pet_friendly">
            <input
              type="checkbox"
              name="pet_friendly"
              value={chekinputs.pet_friendly}
              checked={chekinputs.pet_friendly}
              onChange={handleCheck}
            />
            Mascotas
          </label>
          <hr />

          <button type="submit"> ENVIAR</button>
        </form>
      </div>
    </div>
  );
}

export default Locales;
