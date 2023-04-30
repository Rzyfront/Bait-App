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
    console.log(filter.verified);
  };

  const paginade = (e) => {
    setFilter({
      ...filter,
      page: e
    });
  };

  return (
    <div className={style.options}>
        <h2 className={style.nameSection}>Locales</h2>
      <select
        onChange={handleSelect}
        value={filter.verified}
        defaultValue=""
      >
        <option value="" disabled selected>Estado</option>
        <option value="" >all</option>
        <option value="unVerified" >unVerified</option>
        <option value="verified" >verified</option>
        <option value="suspended" >suspended</option>
      </select >
        <input placeholder="Nombre" className={style.buscador} value={filter.name} onChange={handleFilter} name="name"></input>
      <input placeholder="ciudad" className={style.buscador} onChange={handleFilter} name='location'></input>

        <div className={style.containerUserCard}>
        {locals
          ? locals.map((data, index) => {
            return <OneRestaurant key={index} name={data.name} image={data.Images
} verified={data.verified} id={data.id} filter={filter}/>;
          })
          : ''}

        </div>
      <Pagination paginade={paginade} page={filter.page} totalPages={totalPages} />
      <ToastContainer/>
    </div>
  );
};

export default Restaurantes;
