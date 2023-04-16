import { useState } from "react";
import "./Search_home.css";
import { MdOutlineRestaurant } from "react-icons/md";
import { BiMap } from "react-icons/bi";
import { BiSearchAlt } from "react-icons/bi";

import { useDispatch, useSelector} from "react-redux";
import { searchByQuery } from "../../../redux/actions/actions";
function Search_home() {
  const dispatch = useDispatch();
  const [data, setData] = useState({
    input: "",
    map: "",
  });

  const handleinputs = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };
  const search_datas = (e) => {
    e.preventDefault();
    dispatch(searchByQuery(data));
    console.log("lo busco");
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
      <div className="botton" onClick={search_datas}>
        <h4>Buscar</h4>
        <BiSearchAlt className="SearchIcon" />
      </div>
    </div>
  );
}
export default Search_home;
