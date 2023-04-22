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
  Dashboard,
  MenuForm
} from './components/components.js';
import LocalsDatabasic from './components/Locales/LocalsDatabasic';
import { Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { checkUser } from './redux/actions/actions';

function App () {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  // login
  useEffect(() => {
    if (user && localStorage.getItem('token') !== null) {
      dispatch(checkUser());
    }
  }, []);

  return (
    <div className='App animated-element'>
      <Routes>
        <Route path='/home/:id' element={<Home />} />
        <Route path='/profile/:id' element={<Profile />} />
        <Route path='/createplace' element={<Locales />} />
        <Route path='/answers' element={<Answers />} />
        <Route path='/about' element={<About />} />
        <Route path='/dataTreatment' element={<DataTreatment />} />
        <Route path='/map' element={<LocalsDatabasic />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/menu/:id' element={<MenuForm />} />
        <Route exact path='/' element={<Landing />} />
      </Routes>
    </div>
  );
}

export default App;
