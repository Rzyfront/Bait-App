import { useEffect, useState } from 'react';
import './Search_home.css';
import { MdOutlineRestaurant } from 'react-icons/md';
import { BiMap, BiSearchAlt } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';
import { saveInfoSearchHome } from '../../../redux/actions/cards';
import { useNavigate } from 'react-router-dom';

function SearchHome () {
  const { city } = useSelector((state) => state.ubication);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [data, setData] = useState({
    input: '',
    map: ''
  });
  const queryParams = new URLSearchParams(location.search);
  const Name = queryParams.get('name' || '');
  const searchMap = queryParams.get('city' || '');
  useEffect(() => {
    setData({
      ...data,
      input: Name,
      map: searchMap

    });
  }, [Name, searchMap]);

  const handleinputs = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    });
  };
  const searchDatas = async (e) => {
    e.preventDefault();
    const currentPath = location.pathname;
    if (currentPath !== currentPath.split('/').at(1) && (data.input.length || data.map.length)) {
      dispatch(saveInfoSearchHome(data));
      // setData({
      //   input: '',
      //   map: ''
      // });
      navigate('/home/1?');
    }
    if (!data.input && !data.map && currentPath !== currentPath.split('/').at(1)) {
      dispatch(saveInfoSearchHome({ input: '', map: city }));
      navigate('/home/1?');
    } else {
      dispatch(saveInfoSearchHome(data));
    }
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
