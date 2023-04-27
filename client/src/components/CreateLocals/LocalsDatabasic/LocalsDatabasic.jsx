import { useState, useEffect } from 'react';
import { Loading } from '@nextui-org/react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BaitLogo from '../../../assets/LogoBait.svg';
import { RiImageAddFill } from 'react-icons/ri';
import { IoCreate } from 'react-icons/io5';
import { Link, useNavigate } from 'react-router-dom';
import { useUploadImage } from '../../../hooks/useUploadImage';
import { PopComent } from '../../components';
import { useDispatch, useSelector } from 'react-redux';
import DatabasicLocal from './DataLocalBasic/DatabasicLocal';
import Mapdata from '../../Map/Mapdata';
import SearchMap from '../../Map/SearchMap/SearchMap';
import { createLocal } from '../../../redux/actions/local';
import { ErrorsDatabasic } from '../LocalHelpers/ErrorsDatabasic';
import CreateLocalsSelector from './CreateLocalsSelector/CreateLocalsSelector';
import './LocalsDatabasic.css';

function LocalsDatabasic ({ formType, setFormType }) {
  const [statesupmit, setStatesupmit] = useState(false);
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

  useEffect(() => {
    setErrors(
      ErrorsDatabasic({
        ...inputs
      })
    );
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
      const response = await dispatch(createLocal(inputs));
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
      setStatesupmit(true);
      toast.error('Datos no validos', {
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

      setErrors(
        ErrorsDatabasic({
          ...inputs,
          images: [data]
        })
      );
    }
  }, [image]);

  return (
    <div className='LocalsDataBasic-Component'>
        {(formType === 'NoSelection') && <CreateLocalsSelector setFormType={setFormType}/>}
      <div className='locales_data animated-element Container-Basic'>
        <Link to='/home/1?name=&city=' className='LinkLogo'>
          <img
            src={BaitLogo}
            alt='Bait'
            className='Logo'
            width='60px'
            height='60px'
          />
        </Link>
        <h1 className='Basic-Title'>Crea un <span>nuevo</span> Local</h1>
        <form onSubmit={handleSubmit} className='Basic-Form-Create'>
          <div className='Map-Basic-Group'>
             <DatabasicLocal
             handleChange={handleChange}
             inputs={inputs}
             errors={errors}
             statesupmit={statesupmit}
             handleSelect={handleSelect}
             searchCity={searchCity}
             setMapsearch={setMapsearch}
             handleMap={handleMap}
          />

           <div className='MapSize'>
            <Mapdata Mapcenter={Mapcenter} statemap={statemap} handleBoton={handleBoton} handlemapdatas={handlemapdatas}/>
            </div>
            <button onClick={searchCity} className='Pick-Location-Basic'>
              Buscar Ciudad
            </button>
          {statesupmit === true && errors.location && <PopComent text={errors.location}/>}
          </div>

          <div className='Basic-Img-Group' >
          <h5 className='Add-Img-Basic'><span>Agrega</span> imagen del local <RiImageAddFill/></h5>
          <label htmlFor="photo-upload" className='Label-Img-Add'>
          <input
          className='Basic-File'
          id="photo-upload"
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

            <RiImageAddFill className='LocalesImage'/>
                )}
            </label>
                  <button type='submit' className='Send-Locals'> Crear nuevo Local <IoCreate/></button>
          </div>

          <ToastContainer theme='colored'/>
        </form>

    </div>
    </div>
  );
}

export default LocalsDatabasic;
