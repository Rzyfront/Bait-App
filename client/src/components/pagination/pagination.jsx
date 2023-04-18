import './pagination.css';
import { FcPrevious, FcNext } from 'react-icons/fc';

import { Link, useParams } from 'react-router-dom';
const Pagination = ({ totalPages, position }) => {
  // params consulta
  // obtener los valores de los parametros de consulta
  const queryParams = new URLSearchParams(location.search);
  const name = queryParams.get('name');
  const city = queryParams.get('city');
  const numbers = [];
  const { id } = useParams();
  for (let i = 0; i < totalPages; i++) {
    numbers.push(
      <div
        key={i}
        className={Number(id) === i + 1 ? 'pagination_on' : 'pagination_off'}
      >
        <Link to={`/home/${i + 1}?name=${name}&city=${city}`}>
          <h1>{i + 1}</h1>
        </Link>
      </div>
    );
  }
  return (
    <div className="containerPagination">
      {Number(id) > 1
        ? (
        <Link to={`/home/${Number(id) - 1}?name=${name}&city=${city}`}>
          <FcPrevious className="paginationIcon" />
        </Link>
          )
        : (
        <div> </div>
          )}
      {numbers}
      {Number(id) === totalPages
        ? (
        <div> </div>
          )
        : (
        <Link to={`/home/${Number(id) + 1}?name=${name}&city=${city}`}>
          <FcNext className="paginationIcon" />
        </Link>
          )}
    </div>
  );
};
export default Pagination;
