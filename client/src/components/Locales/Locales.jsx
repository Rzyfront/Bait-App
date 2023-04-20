import { useState, useEffect, useRef } from 'react';
import './Locales.css';

import BaitLogo from '../../assets/LogoBait.svg';
import { Link } from 'react-router-dom';
import { useUploadImage } from '../../hooks/useUploadImage';

import { useDispatch } from 'react-redux';
import { createLocal } from '../../redux/actions/actions';
// eslint-disable-next-line
const regexEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

export const validate = (inputs) => {
  const errors = {};
  if (!inputs.location) {
    errors.location = 'Seleccione una opcion';
  }
  if (!inputs.name) {
    errors.name = 'Se requiere un nombre';
  }
  if (!regexEmail.test(inputs.email)) {
    errors.email = 'Debe ser un correo electronico';
  }
  if (!inputs.imagen) {
    errors.imagen = 'Se requiere cargar una o mas imagenes del Local';
  }
  if (!inputs.phone) {
    errors.phone = 'Ingrese un numero de telefono valido';
  }

  if (inputs.schedule.length === 0) {
    errors.schedule = 'Seleccione fecha';
  }

  return errors;
};

function Locales () {
  const { image, loading, handleChangeimage } = useUploadImage();
  const dispatch = useDispatch();
  const [termsAndConditions, setTemsAndConditions] = useState(true);
  const targetRef = useRef(null);
  const [inputs, setInputs] = useState({
    location: '',
    name: '',
    imagen: [],
    email: '',
    phone: '',
    schedule: ''
  });

  useEffect(() => {
    setInputs({ ...inputs, imagen: image });

    setErrors(
      validate({
        ...inputs,
        imagen: [image]
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
    family_style: false,
    romantic: false
  });

  const [errors, setErrors] = useState({
    location: '',
    name: '',
    imagen: '',
    email: '',
    phone: '',
    schedule: ''
  });

  const handleChange = (event) => {
    setInputs({
      ...inputs,
      [event.target.name]: event.target.value
    });

    setErrors(
      validate({
        ...inputs,
        [event.target.name]: event.target.value
      })
    );
    console.log(errors);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    if (!Object.values(errors).length) {
      alert('Datos completos');
      dispatch(createLocal(inputs, chekinputs));
      setInputs({
        location: '',
        name: '',
        imagen: '',
        email: '',
        phone: '',
        schedule: ''
      });
      setErrors({
        location: '',
        name: '',
        imagen: '',
        email: '',
        phone: '',
        schedule: ''
      });
      setChekInputs({
        wifi: false,
        parking_lot: false,
        outdoor_seating: false,
        live_music: false,
        table_service: false,
        big_group: false,
        work_friendly: false,
        pet_friendly: false
      });
    } else {
      alert('Debe llenar todos los campos');
    }
  };

  const handleChangeimages = (event) => {
    handleChangeimage(event);
  };

  const handleSelect = (event) => {
    setInputs({
      ...inputs,
      location: event.target.value
    });
    setErrors(
      validate({
        ...inputs,
        location: event.target.value
      })
    );
  };

  const handleCheck = (e) => {
    if (e.target.value === 'false') {
      setChekInputs({ ...chekinputs, [e.target.name]: true });
    } else {
      setChekInputs({ ...chekinputs, [e.target.name]: false });
    }
    console.log(chekinputs);
  };

  function handleClick () {
    setTemsAndConditions(false);
    targetRef.current.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <div className="locales animated-element">
      { termsAndConditions
        ? <div className='termAndConditions animated-element'>
           <Link to="/home/1?name=&city=" className="LinkLogo">
          <img
            src={BaitLogo}
            alt="Bait"
            className="Logo"
            width="60px"
            height="60px"
          />
        </Link>
            <h2 >Terminos y <span>Condiciones</span></h2>
            <p>Bienvenido a Bait, la plataforma que permite a los usuarios buscar, reservar y reseñar locales y restaurantes. Al utilizar nuestra aplicación móvil, aceptas los siguientes términos y condiciones:</p>

<p>Registro de usuario: Para utilizar nuestros servicios, debes registrarte como usuario en nuestra aplicación móvil. Debes proporcionar información precisa y actualizada al registrarte. Si descubrimos que has proporcionado información falsa o inexacta, podemos suspender o cerrar tu cuenta.</p>

<p>Publicación de locales y restaurantes: Bait permite a los dueños de locales y restaurantes publicar información sobre sus negocios en nuestra plataforma. La información proporcionada debe ser precisa y actualizada. Nos reservamos el derecho de rechazar cualquier publicación que no cumpla con nuestros estándares de calidad.</p>

<p>Reservas y pagos: Bait actúa como intermediario en la reserva de locales y restaurantes. Los usuarios pueden hacer reservas a través de nuestra plataforma y pagar por adelantado. Bait se quedará con un porcentaje acordado de cada reserva realizada a través de nuestra aplicación móvil.</p>

<p>Reseñas: Los usuarios pueden escribir reseñas sobre los locales y restaurantes en nuestra plataforma. Bait no se hace responsable del contenido de las reseñas, ya que son responsabilidad exclusiva de los usuarios que las escriben. Nos reservamos el derecho de eliminar cualquier reseña que consideremos inapropiada o que no cumpla con nuestros estándares de calidad.</p>

<p>Planes premium: Los dueños de locales y restaurantes pueden pagar un plan premium para tener más visibilidad en nuestra aplicación móvil. Los planes premium incluyen opciones como destacar su negocio en los resultados de búsqueda y tener acceso a estadísticas detalladas sobre sus reservas.</p>

<p>Propiedad intelectual: Todos los derechos de propiedad intelectual de nuestra aplicación móvil y su contenido son propiedad exclusiva de Bait. No está permitido copiar, modificar, distribuir o reproducir cualquier parte de nuestra aplicación móvil sin nuestro permiso.</p>

<p>Limitación de responsabilidad: Bait no se hace responsable de los daños o perjuicios que puedan surgir del uso de nuestra aplicación móvil, incluyendo, entre otros, la pérdida de datos, la interrupción del servicio o la falta de disponibilidad de nuestra aplicación móvil.</p>

<p>Modificaciones de los términos y condiciones: Bait se reserva el derecho de modificar estos términos y condiciones en cualquier momento. Las modificaciones serán efectivas una vez que se publiquen en nuestra aplicación móvil.</p>

<p>Ley aplicable y jurisdicción: Estos términos y condiciones se rigen por las leyes del país donde se encuentra Bait. Cualquier disputa relacionada con estos términos y condiciones será resuelta por los tribunales competentes en el lugar donde se encuentra Bait.</p>
            <div className='termsButtons'>
              <button className='Ok' onClick={handleClick}>Aceptar</button>

                <Link to="/home/1?name=&city=">

              <button className='No' >Rechazar</button>
              </Link>
            </div>
      </div>
        : <div className={`locales_data ${!termsAndConditions && 'animated-element'} `}>
        <Link to="/home/1?name=&city=" className="LinkLogo">
          <img
            id='logo-data-create'
            ref={targetRef}
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
          <label className="imagen" htmlFor="imagen">
            Imagenes
          </label>
          <input
            type="file"
            name="imagen"
            accept="image/png,image/jpeg,image/jpg,image/gif"
            // multiple
            onChange={handleChangeimages}
          ></input>
          <hr />

          {image.length
            ? (
                image.map((image, i) => (
              <img
                key={i}
                src={image.url}
                alt="imagen"
                className="LocalesImage"
              />
                ))
              )
            : loading === true
              ? (
            <img
              src="https://res.cloudinary.com/dirsusbyy/image/upload/v1681577086/kvkmom2t84yjw3lpc5pz.gif"
              alt="cargando"
              className="LocalesImage"
            />
                )
              : (
            <img
              src="https://res.cloudinary.com/dirsusbyy/image/upload/v1680389194/ppex43qn0ykjyejn1amk.png"
              alt="image default"
              className="LocalesImage"
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
      </div>}
    </div>
  );
}

export default Locales;
