import './Filters.css';
import { MdAddBusiness } from 'react-icons/md';
import { RiRefreshFill } from 'react-icons/ri';
import { BiFilterAlt } from 'react-icons/bi';
import { TbMapOff, TbMap2 } from 'react-icons/tb';
import FilterGroup from './FilterGroup/FilterGroup';
import { Link } from 'react-router-dom';
// import { TbToolsKitchen2 } from "react-icons/tb";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { saveFilter, saveInfoSearchHome } from '../../redux/actions/cards';

// import Filtertype from "./filtertype/Filtertype";
const Filters = ({ toggle, setToggle }) => {
  const dispatch = useDispatch();
  const [toggleFilterModal, setToggleFilterModal] = useState(false);
  const initialFilter = {
    specialty: '',
    characteristics: [],
    order: '',
    alphabet: ''
  };
  const [filters, setFilters] = useState(initialFilter);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [special, setSpecial] = useState([]);

  const Caracteristicaslist = [
    { value: 'wifi', label: 'Wi-fi' },
    { value: 'parking_lot', label: 'Parqueadero' },
    { value: 'outdoor_seating', label: 'Asientos exteriores' },
    { value: 'live_music', label: 'Música' },
    { value: 'table_service', label: 'Servicio a Mesa' },
    { value: 'big_group', label: 'Grupos grandes' },
    { value: 'work_friendly', label: 'Amigable' },
    { value: 'pet_friendly', label: 'Mascotas' },
    { value: 'family_style', label: 'Familiar' },
    { value: 'romantic', label: 'Romántico' }
  ];

  useEffect(() => {
    axios.get('/locals/specialties')
      .then(res => setSpecial(res.data.allSpecialties.map(e => e.specialty)))
      .catch(err => console.log(err));
    return () => {
      onRefresh();
    };
  }, []);

  useEffect(() => {
    dispatch(saveFilter(filters));
  }, [filters]);

  const handleFilters = (e) => {
    const { name, value } = e.target;
    if (name === 'order') {
      setFilters({ ...filters, alphabet: '', [name]: value });
    } else if (name === 'alphabet') {
      setFilters({ ...filters, order: '', [name]: value });
    } else { setFilters({ ...filters, [name]: value }); };
  };

  const onRefresh = () => {
    setFilters(initialFilter);
    setSelectedOptions([]);
    dispatch(saveFilter(initialFilter));
    dispatch(saveInfoSearchHome({ name: '', location: '' }));
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
          <h2 className="AddPlace_Text">Inscribir sitio</h2> <MdAddBusiness />
        </div>
      </Link>
      </div>
    <div className='AddResetButtom'>
      <div className="ResetHome" onClick={onRefresh}>
          <RiRefreshFill />
      </div>
      <FilterGroup selectedOptions={selectedOptions}
      handleMultiSelectChange={handleMultiSelectChange}
      Caracteristicaslist={Caracteristicaslist}
      handleFilters = {handleFilters}
      filters = {filters}
      special = {special}
      />
      <div className='ToggleFilterButton-Container'>
        <BiFilterAlt className='ToggleFilterButton' onClick={toggleFilterModal
          ? () => setToggleFilterModal(false)
          : () => setToggleFilterModal(true)}/>
        {toggleFilterModal && <FilterGroup selectedOptions={selectedOptions}
      handleMultiSelectChange={handleMultiSelectChange}
      Caracteristicaslist={Caracteristicaslist}
      handleFilters = {handleFilters}
      filters = {filters}
      special = {special}
      />}
          <div className='Map-Toggle-Group' onClick={toggle
            ? () => setToggle(false)
            : () => setToggle(true)}>
          {toggle
            ? <TbMapOff/>
            : <TbMap2/>}
        </div>
      </div>
      </div>
    </div>
  );
};
export default Filters;
