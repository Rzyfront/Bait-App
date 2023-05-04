import { useState, useEffect } from 'react';
import { Loading, Input } from '@nextui-org/react';
import { PopComent } from '../../components';
import Slider from 'react-slick';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BaitLogo from '../../../assets/LogoBait.svg';
import { RiImageAddFill } from 'react-icons/ri';
import { IoCreate } from 'react-icons/io5';
import { Link, useNavigate } from 'react-router-dom';
import { useUploadImage } from '../../../hooks/useUploadImage';
import { useDispatch, useSelector } from 'react-redux';
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
  const [Mapcenter, setMapcenter] = useState([ubication.lat, ubication.lng]);
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
    const informationMp = information.address.LongLabel.split(',');
    informationMp.splice(-1, 1);
    const locationData = `${informationMp.join(',')},${information.address.CntryName}`;
    console.log(locationData);
    const data = {
      lat: information.location.y,
      lng: information.location.x,
      location: locationData
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
  // controller Erros
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
      } else {
        toast.error('No pudimos enviar los datos', {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 2000
        });
      }
    } else {
      setStatesupmit(true);
      toast.error('Datos no válidos', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000
      });
      setTimeout(() => {
        setStatesupmit(false);
      }, 5000);
    }
  };

  const handleChangeimages = (event) => {
    handleChangeimage(event);
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

  const settings = {
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000
  };

  return (
    <div className='LocalsDataBasic-Component'>
      {(formType === 'NoSelection') && <CreateLocalsSelector setFormType={setFormType} />}
      <div className='locales_data animated-element Container-Basic'>

         <svg className='Wabe-Top' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#343434" fillOpacity="1" d="M0,0L40,5.3C80,11,160,21,240,21.3C320,21,400,11,480,42.7C560,75,640,149,720,160C800,171,880,117,960,112C1040,107,1120,149,1200,192C1280,235,1360,277,1400,298.7L1440,320L1440,0L1400,0C1360,0,1280,0,1200,0C1120,0,1040,0,960,0C880,0,800,0,720,0C640,0,560,0,480,0C400,0,320,0,240,0C160,0,80,0,40,0L0,0Z"></path></svg>

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
        <div className='Basic-Form-Create'>
          <div className='Map-Basic-Group'>
            <div className='Basic-Inputs-Component'>
              <div className='Name-Input-Group'>
                <Input
                  underlined
                  labelPlaceholder="Nombre del Local"
                  color="default"
                  className='Inputs-Data-Basic'
                  onChange={handleChange}
                  value={inputs.name}
                  borderWeight='bold'
                  type='text'
                  name='name'
                  required
                />
                {statesupmit === true && errors.name && <PopComent text={errors.name} />}
              </div>

              <Input
                underlined
                labelPlaceholder="Ciudad"
                color="default"
                className='name Inputs-Data-Basic'
                onChange={handleMap}
                borderWeight='bold'
                value={mapSearch}
                type='text'

              />

            </div>

            <div className='MapSize-Basic'>
              <Mapdata Mapcenter={Mapcenter} statemap={statemap} handleBoton={handleBoton} handlemapdatas={handlemapdatas} />
            </div>
            <button onClick={searchCity} type='button' className='Pick-Location-Basic'>
              Buscar ciudad
            </button>
            {statesupmit === true && errors.location && <PopComent text={errors.location} />}
          </div>

          <div className='Basic-Img-Group' >
            <label htmlFor="photo-upload">
              <h5 className='Add-Img-Basic'>{image.length ? 'Agrega otra imagen' : 'Agrega imagen del local'}<RiImageAddFill /></h5>
            </label>
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
                ? (<div className='Img-Header'>

                <Slider {...settings}>
                {
                  image?.map(({ url }, index) => {
                    return <div key={index} className='Slide-Img-Carrousel'>
                    <img src={url} alt={`img${index}`} />
                  </div>;
                  })
                }
                </Slider>
                </div>
                  )
                : loading === true
                  ? (
                    <Loading color="primary" />
                    )
                  : (

                    <RiImageAddFill className='LocalesImage' />
                    )}
            </label>
            <button type='submit' className='Send-Locals' onClick={ handleSubmit }> Crear nuevo Local <IoCreate /></button>
          </div>

        </div>

        <svg className='Wabe-button' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#3884fd" fillOpacity="1" d="M0,224L30,240C60,256,120,288,180,288C240,288,300,256,360,224C420,192,480,160,540,170.7C600,181,660,235,720,261.3C780,288,840,288,900,277.3C960,267,1020,245,1080,213.3C1140,181,1200,139,1260,128C1320,117,1380,139,1410,149.3L1440,160L1440,320L1410,320C1380,320,1320,320,1260,320C1200,320,1140,320,1080,320C1020,320,960,320,900,320C840,320,780,320,720,320C660,320,600,320,540,320C480,320,420,320,360,320C300,320,240,320,180,320C120,320,60,320,30,320L0,320Z"></path></svg>

      </div>
      <ToastContainer className="errors" theme='colored' />
    </div>
  );
}

export default LocalsDatabasic;
