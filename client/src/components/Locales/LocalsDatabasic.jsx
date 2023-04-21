import { useState, useEffect } from 'react';
import './Locales.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BaitLogo from '../../assets/LogoBait.svg';
import { Link, useNavigate } from 'react-router-dom';
import { useUploadImage } from '../../hooks/useUploadImage';
import { Loading } from '@nextui-org/react';
import { useDispatch, useSelector } from 'react-redux';
import { createLocal } from '../../redux/actions/actions';
import { validateForm } from './localHelpers';
import TYC from './TYC';

import DatabasicLocal from './DataLocal/DatabasicLocal';
import Mapdata from '../Map/Mapdata';
import SearchMap from '../Map/SearchMap/Searchmap';
function LocalsDatabasic () {
  //map controllers
  const [Mapcenter,setMapcenter]=useState([40.574215, -105.08333])
  const [statemap,setStatemap]=useState(false)
  const [mapSearch,setMapsearch]=useState("")
  const handleMap=(e)=>{
    setMapsearch(e.target.value)
      }
  const handleBoton=()=>{
    setStatemap(false)
  }
const searchCity=async()=>{
        const data=await SearchMap(mapSearch)
        if(data)
        {
          setMapcenter(data)
          setStatemap(true)
        }else{
          toast.error('No existe esta ciudad', {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 2000
          });
        }
      }   
const handlemapdatas=(information)=>{
  console.log(information)
  const data={lat:information.location.y ,lng:information.location.x ,location:information.address
    .LongLabel
  } 
  setInputs({...inputs,
    location:data})

    console.log(inputs)
}

////
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
          <DatabasicLocal
             handleChange={handleChange}
             inputs={inputs}
             errors={errors}
             handleSelect={handleSelect}
             searchCity={searchCity}
             setMapsearch={setMapsearch}
             handleMap={handleMap}
          />
           <div className='MapSize'>
            <Mapdata Mapcenter={Mapcenter}   statemap={statemap} handleBoton={handleBoton}  handlemapdatas={handlemapdatas}/>
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
            <Loading color="primary"/>
                )
              : (
            <img
              src='https://res.cloudinary.com/dirsusbyy/image/upload/v1680389194/ppex43qn0ykjyejn1amk.png'
              alt='image default'
              className='LocalesImage'
            />
                )}

        

          <button type='submit'> ENVIAR</button>
          <ToastContainer theme='colored'/>
        </form>
      </div>}
    </div>
  );
}

export default LocalsDatabasic;
