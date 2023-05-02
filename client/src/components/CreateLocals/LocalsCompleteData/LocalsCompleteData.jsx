import { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BaitLogo from '../../../assets/LogoBait.svg';
import { Link, useNavigate } from 'react-router-dom';
// import { Loading } from '@nextui-org/react';
import { useDispatch, useSelector } from 'react-redux';
import SearchMap from '../../Map/SearchMap/SearchMap';
import { createLocalFull } from '../../../redux/actions/local';
import { ErrorsDatabasic } from '../LocalHelpers/ErrorsDatabasic';
import LocalInfoComplete from './LocalInfoComplete/LocalInfoComplete';
import LocalLocationComplete from './LocalLocationComplete/LocalLocationComplete';
import AddImgComplete from './AddImgComplete/AddImgComplete';
import './LocalsCompleteData.css';

function LocalsCompleteData () {
  const ubication = useSelector((state) => state.ubication);
  const positionMap = useSelector((state) => state.ubication);
  const [Mapcenter, setMapcenter] = useState([40.574215, -105.08333]);
  const [statesupmit, setStatesupmit] = useState(false);
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const [statemap, setStatemap] = useState(false);
  const [mapSearch, setMapsearch] = useState('');

  // map controllers
  useEffect(() => {
    if (Mapcenter[0] !== positionMap.lat && Mapcenter[1] !== positionMap.lng) {
      setMapcenter([positionMap.lat, positionMap.lng]);
    }
  }, [positionMap]);

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
    name: '',
    schedule: '',
    email: '',
    phone: '',
    specialty: [],
    restaurantType: [],
    characteristics: [],
    payments: [],
    address: '',
    location: {},
    images: []
  });
  // Error controller
  const [errors, setErrors] = useState({
    name: '',
    schedule: '',
    email: '',
    location: '',
    specialty: ''
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
  const chekinputs = [];
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

  const handleSelect = (event) => {
    const { name, value } = event.target;
    setInputs({
      ...inputs,
      [name]: value
    });
  };

  return (
    <div className='LocalsCompleteData-Component'>
        <svg className='Wabe-Top' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#343434" fillOpacity="1" d="M0,0L40,5.3C80,11,160,21,240,21.3C320,21,400,11,480,42.7C560,75,640,149,720,160C800,171,880,117,960,112C1040,107,1120,149,1200,192C1280,235,1360,277,1400,298.7L1440,320L1440,0L1400,0C1360,0,1280,0,1200,0C1120,0,1040,0,960,0C880,0,800,0,720,0C640,0,560,0,480,0C400,0,320,0,240,0C160,0,80,0,40,0L0,0Z"></path></svg>

      <Link to='/home/1?name=&city=' className='LinkLogo'>
      <img src={BaitLogo} alt="Bait-Logo" className='Logo' />
      </Link>
      <ToastContainer/>
     <div className='Create-Complete-Container'>
       <h2 className='Title-Complete'>Crea un <span>nuevo</span> local</h2>
     <form onSubmit={handleSubmit} className='Complete-Form-Create'>
       <LocalInfoComplete
      handleSelect={handleSelect}
      inputs={inputs}
      handleChange={handleChange}
      />
      <LocalLocationComplete
      handleMap={handleMap}
      mapSearch={mapSearch}
      Mapcenter={Mapcenter}
      statemap={statemap}
      handleBoton={handleBoton}
      handlemapdatas={handlemapdatas}
      searchCity={searchCity}
      statesupmit={statesupmit}
      />
      <AddImgComplete
      inputs={inputs}
      setInputs={setInputs}
      />
     </form>
     </div>
   <svg className='Wabe-button' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#3884fd" fillOpacity="1" d="M0,224L30,240C60,256,120,288,180,288C240,288,300,256,360,224C420,192,480,160,540,170.7C600,181,660,235,720,261.3C780,288,840,288,900,277.3C960,267,1020,245,1080,213.3C1140,181,1200,139,1260,128C1320,117,1380,139,1410,149.3L1440,160L1440,320L1410,320C1380,320,1320,320,1260,320C1200,320,1140,320,1080,320C1020,320,960,320,900,320C840,320,780,320,720,320C660,320,600,320,540,320C480,320,420,320,360,320C300,320,240,320,180,320C120,320,60,320,30,320L0,320Z"></path></svg>
    </div>
  );
}
export default LocalsCompleteData;

//  <div className='locales_data animated-element'>
//           <Link to='/home/1?name=&city=' className='LinkLogo'>
//             <img
//               src={BaitLogo}
//               alt='Bait'
//               className='Logo'
//               width='60px'
//               height='60px'
//             />
//           </Link>
//           <h1>Crea un nuevo Local</h1>
//           <form onSubmit={handleSubmit}>
//             <DataLocal
//               handleChange={handleChange}
//               inputs={inputs}
//               errors={errors}
//               handleSelect={handleSelect}
//               searchCity={searchCity}
//               setMapsearch={setMapsearch}
//               handleMap={handleMap}
//             />
//             <div className='MapSize'>
//               <Mapdata Mapcenter={Mapcenter} statemap={statemap} handleBoton={handleBoton} handlemapdatas={handlemapdatas} />
//             </div>

//             <label className='imagen' htmlFor='imagen'>
//               Imágenes
//             </label>
//             <input
//               type='file'
//               name='imagen'
//               accept='image/png,image/jpeg,image/jpg,image/gif'
//               // multiple
//               onChange={handleChangeimages}
//             ></input>

//             {image.length
//               ? (
//                   image.map((image, i) => (
//                   <img
//                     key={i}
//                     src={image.url}
//                     alt='imagen'
//                     className='LocalesImage'
//                   />
//                   ))
//                 )
//               : loading === true
//                 ? (
//                   <Loading color="primary" />
//                   )
//                 : (
//                   <img
//                     src='https://res.cloudinary.com/dirsusbyy/image/upload/v1680389194/ppex43qn0ykjyejn1amk.png'
//                     alt='image default'
//                     className='LocalesImage'
//                   />
//                   )}

//             <Chars handleCheck={handleCheck} chekinputs={chekinputs} />
//             <button type='submit' className='Send-Locals'> ENVIAR</button>
//             <ToastContainer theme='colored' />
//           </form>
//     </div>