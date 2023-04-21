
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
import MenuForm from './components/MenuForm/MenuForm';
import DishForm from './components/MenuForm/DishForm/DishForm';
import Mapdata from './components/Map/Map';

import { Routes, Route } from 'react-router-dom';
function App () {
  return (
    <div className='App animated-element'>
      <Routes>
        <Route path='/home/:id' element={<Home />} />
        <Route path='/profile/:id' element={<Profile />} />
        <Route path='/createplace' element={<Locales />} />
        <Route path='/answers' element={<Answers />} />
        <Route path='/about' element={<About />} />
        <Route path='/dataTreatment' element={<DataTreatment />} />
        <Route path='/map' element={<Mapdata/>} />
        <Route path='/dashboard' element={<Dashboard/>} />
        <Route path='/menu/:localId' element={<MenuForm/>} />
        <Route path='/dish/:menuId' element={DishForm} />
        <Route exact path='/' element={<Landing />} />
      </Routes>
    </div>
  );
}

export default App;
