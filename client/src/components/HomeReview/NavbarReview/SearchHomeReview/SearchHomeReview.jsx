import { useState, useEffect } from 'react';
import '../../../Navbar/SearchHome/Search_home.css';
import { MdOutlineRestaurant } from 'react-icons/md';
import { BiMap } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';
import { saveInfoSearchHome } from '../../../../redux/actions/cards';
import { useNavigate } from 'react-router-dom';

function SearchHomeReview () {
  const { city } = useSelector((state) => state.ubication);
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
  useEffect(
    () => {
      const currentPath = location.pathname;
      if (currentPath !== currentPath.split('/').at(1) && (data.input.length || data.map.length)) {
        dispatch(saveInfoSearchHome(data));
        navigate(`/writeAReview/1?name=${data.input}&city=${data.map}`);
      }
      if (!data.input && !data.map && currentPath !== currentPath.split('/').at(1)) {
        dispatch(saveInfoSearchHome({ input: '', map: city }));
        navigate(`/writeAReview/1?name=&city=${data.map}`);
      } else {
        dispatch(saveInfoSearchHome(data));
      }
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
    </div>
  );
}
export default SearchHomeReview;
