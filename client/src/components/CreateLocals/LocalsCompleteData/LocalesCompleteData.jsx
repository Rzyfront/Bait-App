import { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BaitLogo from '../../../assets/LogoBait.svg';
import { Link, useNavigate } from 'react-router-dom';
import { useUploadImage } from '../../../hooks/useUploadImage';
import { Loading } from '@nextui-org/react';
import { useDispatch, useSelector } from 'react-redux';
<<<<<<< HEAD:client/src/components/Locales/Locales.jsx
import { validateForm } from './localHelpers';
import TYC from './TYC';
// import DatabasicLocal from './DataLocal/DatabasicLocal';
import DataLocal from './DataLocal/DataLocal';
import { createLocal } from '../../redux/actions/local';
function Locales () {
=======
import DataLocal from './DataLocal/DataLocal';
import Mapdata from '../../Map/Mapdata';
import SearchMap from '../../Map/SearchMap/Searchmap';
import { createLocal, createLocalFull } from '../../../redux/actions/local';
import { ErrorsDatabasic } from '../LocalHelpers/ErrorsDatabasic';
import Chars from './Chars/Chars';

function LocalsCompleteData () {
>>>>>>> f238f107dc90cb40666aadc69bfdb5cf7000e9bc:client/src/components/CreateLocals/LocalsCompleteData/LocalesCompleteData.jsx
  const ubication = useSelector((state) => state.ubication);
  const positionMap = useSelector((state) => state.ubication);
  const [Mapcenter, setMapcenter] = useState([40.574215, -105.08333]);
  /// /
  const Navigate = useNavigate();
  const { image, loading, handleChangeimage } = useUploadImage();
  const dispatch = useDispatch();

  // map controllers
  useEffect(() => {
    if (Mapcenter[0] !== positionMap.lat && Mapcenter[1] !== positionMap.lng) {
      setMapcenter([positionMap.lat, positionMap.lng]);
    }
  }, [positionMap]);

  const [statemap, setStatemap] = useState(false);
  const [mapSearch, setMapsearch] = useState('');
  const handleMap = (e) => {
    setMapsearch(e.target.value);
  };
  const handleBoton = () => {
    setStatemap(false);
  };
  const searchCity = async () => {
    const data = await SearchMap(mapSearch);
    if (data) {
      setMapcenter(data);
      setStatemap(true);
    } else {
      toast.error('No existe esta ciudad', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000
      });
    }
  };
  const handlemapdatas = (information) => {
    const data = {
      lat: information.location.y,
      lng: information.location.x,
      location: information.address
        .LongLabel
    };
    setInputs({
      ...inputs,
      location: data
    });
  };
  /// inputs and erros
  const [inputs, setInputs] = useState({
    location: {},
    name: '',
    images: [],
    email: '',
    phone: '',
    schedule: '',
    specialty: ''
  });
  // Error controller
  const [errors, setErrors] = useState({
    location: '',
    name: '',
    email: '',
    schedule: '',
    specialty: ''
  });

  // check list
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
  useEffect(() => {
    setErrors(
      ErrorsDatabasic({
        ...inputs
      })

    );
    console.log(inputs);
  }, [inputs]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInputs({
      ...inputs,
      [name]: value
    });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!Object.values(errors).length) {
      const response = await dispatch(createLocalFull(inputs, chekinputs));
      if (response === true) {
        toast.success('¡Local creado satisfactoriamente!', {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 2000
        });
        setTimeout(() => {
          Navigate(`/home/1?name=&city=${ubication.city}`);
        }, 2000);
      }
    } else {
      toast.error('Faltan datos', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000
      });
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
  };

  useEffect(() => {
    if (image.length) {
      const data = image.map((data) => {
        return { id: data.id };
      });

      setInputs({ ...inputs, images: data });
    }
  }, [image]);
  const handleCheck = (e) => {
    const { name, checked } = e.target;
    setChekInputs({ ...chekinputs, [name]: checked });
  };
  return (
    <div className='LocalsCompleteData-Component'>
       <div className='locales_data animated-element'>
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
              searchCity={searchCity}
              setMapsearch={setMapsearch}
              handleMap={handleMap}
            />
            <div className='MapSize'>
              <Mapdata Mapcenter={Mapcenter} statemap={statemap} handleBoton={handleBoton} handlemapdatas={handlemapdatas} />
            </div>

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
                  <Loading color="primary" />
                  )
                : (
                  <img
                    src='https://res.cloudinary.com/dirsusbyy/image/upload/v1680389194/ppex43qn0ykjyejn1amk.png'
                    alt='image default'
                    className='LocalesImage'
                  />
                  )}

            <Chars handleCheck={handleCheck} chekinputs={chekinputs} />
            <button type='submit' className='Send-Locals'> ENVIAR</button>
            <ToastContainer theme='colored' />
          </form>
    </div>
    </div>
  );
}
export default LocalsCompleteData;
