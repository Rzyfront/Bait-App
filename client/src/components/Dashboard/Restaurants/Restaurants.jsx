import { useDispatch, useSelector } from 'react-redux';
import style from '../Dashboard.module.css';
import './Restaurant.css';
import { useEffect, useState } from 'react';
import { getAllLocal } from '../../../redux/actions/admin';
import OneRestaurant from './OneRestaurant';
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
      [name]: value
    });
  };

  return (
    <div className={style.options}>
        <h2 className={style.nameSection}>Locales</h2>
        <input placeholder="Nombre" className={style.buscador} value={filter.name} onChange={handleFilter} name="name"></input>
      <input placeholder="ciudad" className={style.buscador} onChange={handleFilter} name='location'></input>

        <div className={style.containerUserCard}>
        {locals
          ? locals.map((data, index) => {
            return <OneRestaurant key={index} name={data.name} image={data.Images
} />;
          })
          : ''}

        </div>

    </div>
  );
};

export default Restaurantes;
