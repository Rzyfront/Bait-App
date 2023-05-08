import { useEffect, useState } from 'react';
import './Search_home.css';
import { MdOutlineRestaurant } from 'react-icons/md';
import { BiMap, BiSearchAlt } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';
import { saveInfoSearchHome } from '../../../redux/actions/cards';
import { useNavigate } from 'react-router-dom';

function SearchHome () {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { searchName } = useSelector((state) => state);
  const [data, setData] = useState({
    name: '',
    location: ''
  });
  useEffect(() => {
    if (searchName !== data) {
      setData(searchName);
    }
  }, [searchName]);
  useEffect(() => {
    setData(searchName);
  }, []);

  const handleinputs = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    });
  };
  const searchDatas = async (e) => {
    e.preventDefault();
    const currentPath = location.pathname;
    if (currentPath.split('/').includes('home') || currentPath.split('/').includes('writeAReview')) {
      await dispatch(saveInfoSearchHome(data));
    } else {
      await dispatch(saveInfoSearchHome(data));
      navigate('/home');
    }
  };
  return (
    <div className="search_home">
      <div className="searchs">
        <div className="input_Eat">
          <MdOutlineRestaurant className="EatIcon icosearch" />
          <input
            value={data.name}
            name="name"
            onChange={handleinputs}
            placeholder="Restaurante"
            className="EatInput"
          />
        </div>
        <div className="input_Location">
          <BiMap className="icosearch LocationIcon" />
          <input
            value={data.location}
            name="location"
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
