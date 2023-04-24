import { useState, useEffect } from 'react';
import './Search_home.css';
import { MdOutlineRestaurant } from 'react-icons/md';
import { BiMap, BiSearchAlt } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ubicationPagine } from '../../../redux/actions/ubication';
import SearchMap from '../../Map/SearchMap/Searchmap';
import { saveInfoSearchHome } from '../../../redux/actions/cards';

function SearchHome () {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { searchName, ubication } = useSelector(state => state);
  const [data, setData] = useState({
    input: searchName,
    map: ubication.city
  });
  const handleinputs = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    });
  };

  const searchDatas = async (e) => {
    e.preventDefault();
    console.log(`/home/1?name=${data.input}&city=${data.map}`);
    navigate(`/home/1?name=${data.input}&city=${data.map}`);
    const position = await SearchMap(data.map);
    console.log({ lat: position[0], lng: position[1], city: data.map });
    dispatch(ubicationPagine({ lat: position[0], lng: position[1], city: data.map }));
  };

  useEffect(
    () => {
      dispatch(saveInfoSearchHome(data.input));
      return () => {
        dispatch(saveInfoSearchHome(''));
      };
    }, [data]
  );
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
