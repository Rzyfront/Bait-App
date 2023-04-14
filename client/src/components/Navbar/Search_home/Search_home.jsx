import { useState } from "react";
import "./Search_home.css";
import { MdOutlineRestaurant } from "react-icons/md";
import { BiMap } from "react-icons/bi";
function Search_home() {
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
  const search_datas = () => {
    console.log("lo busco");
  };
  return (
    <div className="search_home">
      <div className="searchs">
        <div className="input_search">
          <MdOutlineRestaurant className="icosearch" />
          <input
            value={data.input}
            name="input"
            onChange={handleinputs}
            placeholder="Restaurante"
            className="inputs"
          />
        </div>
        <div className="input_search">
          <BiMap className="icosearch" />
          <input
            value={data.map}
            name="map"
            onChange={handleinputs}
            placeholder="Lugar"
            className="inputs"
          />
        </div>
      </div>
      <div className="botton" onClick={search_datas}>
        <h4>Buscar</h4>
      </div>
    </div>
  );
}
export default Search_home;
