import { useState, useEffect } from 'react';
import './Locales.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BaitLogo from '../../assets/LogoBait.svg';
import { Link } from 'react-router-dom';
import { useUploadImage } from '../../hooks/useUploadImage';
import { Loading } from '@nextui-org/react';
import { useDispatch } from 'react-redux';
import { createLocal } from '../../redux/actions/actions';
import { validateForm } from './localHelpers';
import TYC from './TYC';
import Chars from './Chars/Chars';
import DataLocal from './DataLocal/DataLocal';

function Locales () {
  const { image, loading, handleChangeimage } = useUploadImage();
  const dispatch = useDispatch();
  const [termsAndConditions, setTemsAndConditions] = useState(true);
  // const targetRef = useRef(null);
  const [inputs, setInputs] = useState({
    location: '',
    name: '',
    imagen: [],
    email: '',
    phone: '',
    schedule: ''
  });
  const [errors, setErrors] = useState({

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
    family_style: false,
    romantic: false
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInputs({
      ...inputs,
      [name]: value
    });

    setErrors(
      validateForm({
        ...inputs,
        [name]: value
      })
    );
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    if (!Object.values(errors).length) {
      toast.success('¡Local creado satisfactoriamente!', {
        position: toast.POSITION.TOP_CENTER
      });
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
      toast.error('¡Completa los campos!', {
        position: toast.POSITION.TOP_CENTER
      });
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
      validateForm({
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
  };

  function handleClick () {
    setTemsAndConditions(false);
    // targetRef.current.scrollIntoView({ behavior: 'smooth' });
  }
  useEffect(() => {
    setInputs({ ...inputs, imagen: image });

    setErrors(
      validateForm({
        ...inputs,
        imagen: [image]
      })
    );
  }, [image]);

  return (
    <div className='locales animated-element'>
      { termsAndConditions
        ? <TYC src={BaitLogo} handleClick={handleClick}/>
        : <div className='locales_data animated-element'>
        <Link to='/home/1?name=&city=' className='LinkLogo'>
          <img
            src={BaitLogo}
            alt='Bait'
            className='Logo'
            width='60px'
            height='60px'
          />
        </Link>
        <h1>Crea un nuevo Local</h1>
        <form onSubmit={handleSubmit}>
          <DataLocal
             handleChange={handleChange}
             inputs={inputs}
             errors={errors}
             handleSelect={handleSelect}
          />
          <label className='imagen' htmlFor='imagen'>
            Imágenes
          </label>
          <input
            type='file'
            name='imagen'
            accept='image/png,image/jpeg,image/jpg,image/gif'
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
                alt='imagen'
                className='LocalesImage'
              />
                ))
              )
            : loading === true
              ? (
            <Loading color="primary"/>
                )
              : (
            <img
              src='https://res.cloudinary.com/dirsusbyy/image/upload/v1680389194/ppex43qn0ykjyejn1amk.png'
              alt='image default'
              className='LocalesImage'
            />
                )}

          <hr />
          <Chars handleCheck = {handleCheck } chekinputs = {chekinputs}/>
          <hr />
          <button type='submit'> ENVIAR</button>
          <ToastContainer/>
        </form>
      </div>}
    </div>
  );
}

export default Locales;
