import { useDispatch, useSelector } from 'react-redux';
import style from '../Dashboard.module.css';
import './Restaurant.css';
import { useEffect, useState } from 'react';
import { getAllLocal } from '../../../redux/actions/admin';
import OneRestaurant from './OneRestaurant';
import Pagination from '../Pagination/Pagination';
import { ToastContainer } from 'react-toastify';

const Restaurantes = () => {
  const dispatch = useDispatch();
  const { locals, totalPages } = useSelector((state) => state.adminLocals);
  const [filter, setFilter] = useState({
    page: 1,
    name: '',
    location: '',
    verified: ''
  });

  useEffect(() => {
    const url = [];
    // caracters filter
    for (const property in filter) {
      if (property !== 'page' && filter[property] !== '') {
        const oneProperty = `${property}=${filter[property]}`;
        url.push(oneProperty);
      }
    }

    dispatch(getAllLocal(filter.page, url.join('&')));
  }, [filter]);

  const handleFilter = (e) => {
    const { name, value } = e.target;
    setFilter({
      ...filter,
      [name]: value,
      page: 1
    });
  };

  const handleSelect = (e) => {
    setFilter({
      ...filter,
      verified: e.target.value,
      page: 1
    });
  };

  const paginade = (e) => {
    setFilter({
      ...filter,
      page: e
    });
  };

  return (
    <div className='restaurants-container'>
      <div className='restaurants-title-bar'>
        <h2 className={style.nameSection}>Locales</h2>
        <div className='filter-restaurants-group'>
        <select
          onChange={handleSelect}
          value={filter.verified}
          defaultValue=""
        >
          <option value="" disabled selected>Estado</option>
          <option value="" >Todos</option>
          <option value="unVerified" >A verificar</option>
          <option value="verified" >Verificados</option>
          <option value="suspended" >Suspendidos</option>
        </select >

        <input placeholder="Nombre del local" className='search-res-input' value={filter.name} onChange={handleFilter} name="name"></input>

        <input placeholder="Ciudad" className='search-res-input' onChange={handleFilter} name='location'></input>
        </div>
      </div>
      <div className="table-responsive">
        <table className="table table-bordered">
          <thead className='thead-restaurants'>
            <tr>
              <th>Nombre del local</th>
              <th>Estado</th>
              <th>Detalle</th>
              {filter.verified === 'unVerified' && <th>Documentación</th>}
              <th>Usuario</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {locals
              ? locals.map((data, index) => {
                return (
                  <OneRestaurant
                    key={index}
                    name={data.name}
                    verified={data.verified}
                    id={data.id}
                    filter={filter}
                  />
                );
              })
              : ''}
          </tbody>
        </table>
      </div>
      <Pagination paginade={paginade} page={filter.page} totalPages={totalPages} />
      <ToastContainer/>
    </div>
  );
};

export default Restaurantes;
