import "./Filters.css";
import { MdAddBusiness } from "react-icons/md";
import { Link } from "react-router-dom";
// import { TbToolsKitchen2 } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { order, reset } from "../../redux/actions/actions";
import { useState } from "react";
// import Filtertype from "./filtertype/Filtertype";
const Filters = () => {
  const [filterState, setFilterState] = useState(false);
  const [selectOrder, setSelectOrder] = useState("");
  const dispatch = useDispatch();
  const ContainerCards = useSelector((state) => state.cards);

  const handlecafication = () => {
    if (selectOrder !== "") {
      setSelectOrder("");
    }
    if (filterState === false) {
      dispatch(order(ContainerCards, "best"));
      setFilterState(true);
    } else {
      dispatch(reset());
      setFilterState(false);
    }
  };

  const handleSelect = (e) => {
    if (filterState === true) {
      handlecafication();
    }
    console.log(e.target.value);
    setSelectOrder(e.target.value);
    dispatch(order(ContainerCards, e.target.value));
  };

  return (
    <div className="Filters">
      <Link to="/createplace">
        <div className="AddPlace">
          <h2 className="AddPlace_Text">Inscribe tu sitio</h2> <MdAddBusiness />
        </div>
      </Link>

      <div className="FiltersGroup">
        <div
          className={filterState === false ? "FilterOff" : "FilterOn"}
          onClick={handlecafication}
        >
          <h3>Mejor calificacion</h3>
        </div>
        {/* <select
          className="RatingOrder"
          onChange={handleSelect}
          value={selectOrder}
        >
          <option value="" disabled>
            Ordena por Rating
          </option>
          <option value={"mayor"}>Mayor rating</option>
          <option value={"menor"}>Menor rating</option>
        </select> */}
        {/* <div
        className="filter_calification"
        onClick={() => handlecalification("opentype")}
      >
        <TbToolsKitchen2 /> <h3>Cocina</h3>
        {filterState.opentype === false ? (
          <div></div>
        ) : (
          <div className="filter_type">
            <Filtertype />
          </div>
        )}
      </div> */}

        <select
          className="AlphaOrder"
          onChange={handleSelect}
          value={selectOrder}
        >
          <option value="" disabled>
            Ordena Alfabeticamente
          </option>
          <option value={"A-Z"}>A-Z</option>
          <option value={"Z-A"}>Z-A</option>
        </select>
      </div>
    </div>
  );
};
export default Filters;
