import { useState, useEffect } from 'react';
import './Locales.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BaitLogo from '../../assets/LogoBait.svg';
import { Link, useNavigate } from 'react-router-dom';
import { useUploadImage } from '../../hooks/useUploadImage';
import { Loading } from '@nextui-org/react';
import { useDispatch, useSelector } from 'react-redux';
import { validateForm } from './localHelpers';
import TYC from './TYC';
import Chars from './Chars/Chars';
import DataLocal from './DataLocal/DataLocal';
import { createLocal } from '../../redux/actions/local';
function Locales () {
  const Navigate = useNavigate();
  const { image, loading, handleChangeimage } = useUploadImage();
  const { success, error } = useSelector(state => state);
  const dispatch = useDispatch();
  const [termsAndConditions, setTemsAndConditions] = useState(true);
  const [inputs, setInputs] = useState({
    location: '',
    name: '',
    images: [],
    email: '',
    phone: '',
    schedule: '',
    specialty: ''
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
    console.log(errors);
    if (!Object.values(errors).length) {
      dispatch(createLocal(inputs));
      setTimeout(() => {
        Navigate('/home/1?name=&city=');
      }, 3000);
      // setInputs({
      //   location: '',
      //   name: '',
      //   images: '',
      //   email: '',
      //   phone: '',
      //   schedule: '',
      //   specialty: ''
      // });
      // setErrors({
      // });
      // setChekInputs({
      //   wifi: false,
      //   parking_lot: false,
      //   outdoor_seating: false,
      //   live_music: false,
      //   table_service: false,
      //   big_group: false,
      //   work_friendly: false,
      //   pet_friendly: false
      // });
    }
  };

  const handleChangeimages = (event) => {
    handleChangeimage(event);
  };

  const handleSelect = (event) => {
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

  const handleCheck = (e) => {
    console.log(e.target.value);
    const { name } = e.target;
    setChekInputs({ ...chekinputs, [name]: true });
  };

  function handleClick () {
    setTemsAndConditions(false);
    // targetRef.current.scrollIntoView({ behavior: 'smooth' });
  }
  useEffect(() => {
    if (image.length) {
      const data = image.map((data) => {
        return { id: data.id };
      });

      setInputs({ ...inputs, images: data });

      setErrors(
        validateForm({
          ...inputs,
          images: [data]
        })
      );
    }
  }, [image]);

  success && toast.success('¡Local creado satisfactoriamente!', {
    position: toast.POSITION.TOP_CENTER,
    autoClose: 2000
  });

  error && toast.error('Falló al crear el local', {
    position: toast.POSITION.TOP_CENTER,
    autoClose: 2000
  });

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

          <Chars handleCheck = {handleCheck} chekinputs = {chekinputs}/>

          <button type='submit'> ENVIAR</button>
          <ToastContainer theme='colored'/>
        </form>
      </div>}
    </div>
  );
}

export default Locales;
