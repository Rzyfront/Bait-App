import "./filters.css";
import { HiOutlineStar } from "react-icons/hi";
// import { TbToolsKitchen2 } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { order, reset } from "../../redux/actions/actions";
import { useState } from "react";
// import Filtertype from "./filtertype/Filtertype";
const Filters = () => {
  const [filterState, setFilterState] = useState(false);
  const dispatch = useDispatch();
  const ContainerCards = useSelector((state) => state.cards);

  const handlecafication = () => {
    if (filterState === false) {
      dispatch(order(ContainerCards));
      setFilterState(true);
    } else {
      dispatch(reset());
      setFilterState(false);
    }
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
      <div></div>
    </div>
  );
};
export default Filters;
