import { useEffect, useState } from 'react';
import './App.css';
import {
  Landing,
  Home,
  Profile,
  Answers,
  About,
  DataTreatment,
  Dashboard,
  MenuForm,
  DishForm,
  Userprofile,
  CreateLocals
} from './components/components.js';
<<<<<<< HEAD
import Mapdata from './components/Map/Mapdata';
=======
>>>>>>> f238f107dc90cb40666aadc69bfdb5cf7000e9bc
import { Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { checkUser } from './redux/actions/actions';
import { ubicationPagine } from './redux/actions/ubication';
import reverseGeoCoding from './components/Map/SearchMap/reverseGeocoding';

function App () {
  const [ubication, setubication] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  // login
  useEffect(() => {
    if (user && localStorage.getItem('token') !== null) {
      dispatch(checkUser());
    }
    if (ubication === false) {
      navigator.geolocation.getCurrentPosition(onUbicacionConcedida, onError);
    }
    setubication(true);
  }, []);

  const onUbicacionConcedida = async (posicion) => {
    const { latitude, longitude } = posicion.coords;
    const data = await reverseGeoCoding(longitude, latitude);
    dispatch(ubicationPagine({ lat: data.location.y, lng: data.location.x, city: data.address.City, gps: true }));
    setubication(true);
  };
  function onError (error) {
    console.error(error);
  }

  return (
    <div className='App animated-element'>
      <Routes>
        <Route path='/home/:id' element={<Home />} />
        <Route path='/profile/:id' element={<Profile />} />
        <Route path='/userprofile' element={<Userprofile />} />
        <Route path='/createplace' element={<CreateLocals />} />
        <Route path='/answers' element={<Answers />} />
        <Route path='/about' element={<About />} />
        <Route path='/dataTreatment' element={<DataTreatment />} />
<<<<<<< HEAD
        <Route path='/map' element={<Mapdata />} />
=======
>>>>>>> f238f107dc90cb40666aadc69bfdb5cf7000e9bc
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/userprofile' element={<Userprofile />} />
        <Route path='/menu/:id' element={<MenuForm />} />
<<<<<<< HEAD
        <Route path='/user/:id' element={<Userprofile/>} />
=======
        <Route path='/updateDish/:id' element={<DishForm/>} />
>>>>>>> f238f107dc90cb40666aadc69bfdb5cf7000e9bc
        <Route exact path='/' element={<Landing />} />
      </Routes>
    </div>
  );
}

export default App;
