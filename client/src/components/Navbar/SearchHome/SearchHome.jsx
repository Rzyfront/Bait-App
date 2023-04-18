import { useState } from 'react';
import './Search_home.css';
import { MdOutlineRestaurant } from 'react-icons/md';
import { BiMap, BiSearchAlt } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { searchByQuery } from '../../../redux/actions/actions';

function SearchHome () {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [data, setData] = useState({
    input: '',
    map: ''
  });

  const handleinputs = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    });
  };
  const searchDatas = (e) => {
    e.preventDefault();
    dispatch(searchByQuery(data));
    navigate('/home');
    console.log('lo busco');
  };
  return (
    <div className="search_home">
      <div className="searchs">
        <div className="input_Eat">
          <MdOutlineRestaurant className="EatIcon icosearch" />
          <input
            value={data.input}
            name="input"
            onChange={handleinputs}
            placeholder="Restaurante"
            className="EatInput"
          />
        </div>
        <div className="input_Location">
          <BiMap className="icosearch LocationIcon" />
          <input
            value={data.map}
            name="map"
            onChange={handleinputs}
            placeholder="Lugar"
            className="LocationInput"
          />
        </div>
      </div>
      <div className="botton" onClick={searchDatas}>
        <h4>Buscar</h4>
        <BiSearchAlt className="SearchIcon" />
      </div>
    </div>
  );
}
export default SearchHome;
