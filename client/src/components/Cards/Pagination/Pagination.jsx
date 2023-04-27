import './pagination.css';
import { FcPrevious, FcNext } from 'react-icons/fc';
import { path } from '../../../helpers/path';

import { Link, useParams } from 'react-router-dom';
const Pagination = ({ totalPages, filters }) => {
  // params consulta
  // obtener los valores de los parametros de consulta
  const queryParams = new URLSearchParams(location.search);
  const name = queryParams.get('name');
  const city = queryParams.get('city');
  const numbers = [];
  const { id } = useParams();
  for (let i = 0; i < totalPages; i++) {
    numbers.push(
      <Link to={`${path(i + 1, name, city, filters)}`} key={i}>
      <div
      key={i}
        className={`paginatioNumbers animated-pagination ${Number(id) === i + 1 ? 'pagination_on' : 'pagination_off'}`}
      >
          <p>{i + 1}</p>
      </div>
        </Link>
    );
  }
  return (
    <div className="containerPagination">
      <div className='paginatioNumbersGroup'>
      {(Number(id) > 1) &&
        (
        <Link to={`${path(Number(id) - 1, name, city, filters)}`}>
          <FcPrevious className="paginationIcon" />
        </Link>
        )}
        {numbers}
      {Number(id) === totalPages
        ? (
          <div> </div>
          )
        : (
            <Link to={`${path(Number(id) + 1, name, city, filters)}`}>
          <FcNext className="paginationIcon" />
        </Link>
          )}
          </div>
    </div>
  );
};
export default Pagination;
