import "./filters.css";
import { HiOutlineStar } from "react-icons/hi";
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
    dispatch(order(ContainerCards, e.target.value));
  };

  return (
    <div className="filters">
      <div
        className={
          filterState === false
            ? "filter_calification"
            : "filter_calification_on"
        }
        onClick={handlecafication}
      >
        <HiOutlineStar />
        <h3>Mejor calificacion</h3>
      </div>
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
        className="filter_calification"
        onChange={handleSelect}
        value={setSelectOrder}
      >
        <option value="" disabled>
          Ordenar por
        </option>
        <option value={"A-Z"}>A-Z</option>
        <option value={"Z-A"}>Z-A</option>
      </select>
    </div>
  );
};
export default Filters;
