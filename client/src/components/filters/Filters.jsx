import './Filters.css';
import { MdAddBusiness } from 'react-icons/md';
import { RiRefreshFill } from 'react-icons/ri';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Select from 'react-select';
// import { TbToolsKitchen2 } from "react-icons/tb";
import { useDispatch } from 'react-redux';
import { searchByFilters } from '../../redux/actions/cards';
import { useState, useEffect } from 'react';
import axios from 'axios';

// import Filtertype from "./filtertype/Filtertype";
const Filters = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const filterState = {
    specialty: '',
    characteristics: [],
    rating: '',
    alphabet: ''
  };

  const [filters, setFilters] = useState(filterState);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [special, setSpecial] = useState([]);

  const Caracteristicaslist = [
    { value: 'wifi', label: 'Wifi' },
    { value: 'parking_lot', label: 'Parqueadero' },
    { value: 'outdoor_seating', label: 'Asientos exteriores' },
    { value: 'live_music', label: 'Musica' },
    { value: 'table_service', label: 'Servicio a Mesa' },
    { value: 'big_group', label: 'Grupos grandes' },
    { value: 'work_friendly', label: 'Amigable' },
    { value: 'pet_friendly', label: 'Mascotas' },
    { value: 'family_style', label: 'Familiar' },
    { value: 'romantic', label: 'Romantico' }
  ];

  useEffect(() => {
    axios.get('/locals/specialties')
      .then(res => setSpecial(res.data.allSpecialties.map(e => e.specialty)))
      .catch(err => console.log(err));
  }, []);

  useEffect(() => {
    dispatch(searchByFilters(filters));
  }, [filters]);

  const handleFilters = (e) => {
    const { name, value } = e.target;
    if (name === 'rating') {
      setFilters({ ...filters, alphabet: '', [name]: value });
    } else if (name === 'alphabet') {
      setFilters({ ...filters, rating: '', [name]: value });
    } else { setFilters({ ...filters, [name]: value }); };
    navigate('/home/1');
  };

  const onRefresh = () => {
    navigate('/home/1');
    console.log(filters);
    setFilters(filterState);
  };

  const handleMultiSelectChange = (selectedOptions) => {
    setSelectedOptions(selectedOptions);
    setFilters({ ...filters, characteristics: selectedOptions.map(e => e.value) });
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
          {special?.map((spe, i) => <option key={i} value={spe}>{spe}</option>)}
        </select>

        <Select
          value={selectedOptions}
          onChange={handleMultiSelectChange}
          options={Caracteristicaslist}
          isMulti
  />

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
