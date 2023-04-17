import { useEffect, useState } from "react";
import "./pagination.css";
import { FcPrevious } from "react-icons/fc";
import { FcNext } from "react-icons/fc";
const Pagination = ({ length_data, position, handlepage }) => {
  const numbers = [];
  const [limit, setLimit] = useState(0);

  useEffect(() => {
    if (position + 3 > length_data) {
      setLimit(length_data);
    } else {
      setLimit(position + 3);
    }
  }, [position]);

  const onpage = (data) => {
    handlepage(Number(data));
  };
  for (let i = position; i < limit; i++) {
    numbers.push(
      <div
        key={i}
        className={position === i ? "pagination_on" : "pagination_off"}
        onClick={() => onpage(i)}
      >
        <h1>{i + 1}</h1>
      </div>
    );
  }
  return (
    <div className="containerPagination">
      {position > 0 ? (
        <FcPrevious
          onClick={() => onpage(position - 1)}
          className="paginationIcon"
        />
      ) : (
        <div> </div>
      )}
      {numbers}
      {position === length_data - 1 ? (
        <div> </div>
      ) : (
        <FcNext
          onClick={() => onpage(position + 1)}
          className="paginationIcon"
        />
      )}
    </div>
  );
};
export default Pagination;
