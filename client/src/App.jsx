
import { useEffect } from 'react';
import './App.css';
import {
  Landing,
  Home,
  Profile,
  Locales,
  Answers,
  About,
  DataTreatment,
  Dashboard
} from './components/components.js';
import Mapdata from './components/Map/Map';
import { Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { checkUser } from './redux/actions/actions';


function App () {
const dispatch=useDispatch()
let user=useSelector((state) => state.user);
//login 
useEffect(()=>{
  console.log(localStorage.getItem('token'))
if(user&&localStorage.getItem('token') !== null)
{
  dispatch(checkUser())
}
},[])

  return (
    <div className="App animated-element">
      <Routes>
        <Route path="/home/:id" element={<Home />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/createplace" element={<Locales />} />
        <Route path="/answers" element={<Answers />} />
        <Route path="/about" element={<About />} />
        <Route path="/dataTreatment" element={<DataTreatment />} />
        <Route path='/map' element={<Mapdata/>} />
        <Route path='/dashboard' element={<Dashboard/>} />
        <Route exact path="/" element={<Landing />} />
      </Routes>
    </div>
  );
}

export default App;
