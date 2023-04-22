import './Filters.css';
import { MdAddBusiness } from 'react-icons/md';
import { RiRefreshFill } from 'react-icons/ri';
import { Link, useNavigate } from 'react-router-dom';
// import { TbToolsKitchen2 } from "react-icons/tb";
import { useDispatch } from 'react-redux';
import { searchByFilters } from '../../redux/actions/actions';
import { useState, useEffect } from 'react';
import { specialties, allCharacteristics } from '../../helpers/fieldsOfSearch';

// import Filtertype from "./filtertype/Filtertype";
const Filters = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const filterState = {
    specialty: '',
    characteristics: '',
    rating: '',
    alphabet: ''
  };
  const [filters, setFilters] = useState(filterState);

  useEffect(() => {
    dispatch(searchByFilters(filters));
  }, [filters]);

  const handleFilters = (e) => {
    const { name, value } = e.target;
    if (name === 'rating') setFilters({ ...filters, alphabet: '', [name]: value });
    if (name === 'alphabet') setFilters({ ...filters, rating: '', [name]: value });
    else setFilters({ ...filters, [name]: value });
    navigate('/home/1');
  };

  const onRefresh = () => {
    navigate('/home/1');
    setFilters(filterState);
  };

  return (
    <div className="Filters">
      <div className='Left-Home-Buttons'>
        <Link to="/createplace">
          <div className="AddPlace">
            <h2 className="AddPlace_Text">Inscribe tu sitio</h2> <MdAddBusiness />
          </div>
        </Link>
        <div className="ResetHome" onClick={onRefresh}>
          <RiRefreshFill />
        </div>
      </div>

      <div className="FiltersGroup">

        <select
          name = "specialty"
          className="Restriction"
          onChange={handleFilters}
          value={filters.specialty}
        >
          <option value="" disabled> Tipo de comida </option>
          {specialties.map((spe, i) => <option key={i} value={spe}>{spe}</option>)}
        </select>

        <select
          name = "characteristics"
          className="Caracteristics"
          onChange={handleFilters}
          value={filters.characteristics}
        >
          <option value="" disabled>
            Caracteristicas adicionales
          </option>
          {allCharacteristics.map((char, i) => <option key={i} value={char[0]}>{char[1]}</option>)}
        </select>

        <select
          name = "rating"
          className="RatingOrder"
          onChange={handleFilters}
          value={filters.rating}
        >
          <option value="" >
            Ordena por Rating
          </option>
          <option value={'ratingASC'}>Mayor rating</option>
          <option value={'ratingDESC'}>Menor rating</option>
        </select>

        <select
          name = "alphabet"
          className="AlphaOrder"
          onChange={handleFilters}
          value={filters.alphabet}
        >
          <option value="">
            Ordena Alfabeticamente
          </option>
          <option value={'nameASC'}>A-Z</option>
          <option value={'nameDESC'}>Z-A</option>
        </select>

      </div>
    </div>
  );
};
export default Filters;
