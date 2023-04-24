import './Filters.css';
import { MdAddBusiness } from 'react-icons/md';
import { RiRefreshFill } from 'react-icons/ri';
import { BiFilterAlt } from 'react-icons/bi';
import FilterGroup from './FilterGroup/FilterGroup';
import { Link } from 'react-router-dom';

// import { TbToolsKitchen2 } from "react-icons/tb";
import { useDispatch, useSelector } from 'react-redux';
import { order, reset } from '../../redux/actions/actions';
import { useState } from 'react';
// import Filtertype from "./filtertype/Filtertype";
const Filters = ({ toggleMapMenu, setToggleMapMenu }) => {
  const [toggleFilterModal, setToggleFilterModal] = useState(false);
  const [filterState, setFilterState] = useState(false);
  const [selectOrder, setSelectOrder] = useState('');
  const dispatch = useDispatch();
  const ContainerCards = useSelector((state) => state.cards);
  const [selectedOptions, setSelectedOptions] = useState([]);

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

  const handlecafication = () => {
    if (selectOrder !== '') {
      setSelectOrder('');
    }
    if (filterState === false) {
      dispatch(order(ContainerCards, 'best'));
      setFilterState(true);
    } else {
      dispatch(reset());
      setFilterState(false);
    }
  };

  const handleSelect = (e) => {
    if (filterState === true) {
      handlecafication();
    }
    console.log(e.target.value);
    setSelectOrder(e.target.value);
    dispatch(order(ContainerCards, e.target.value));
  };

  const handleMultiSelectChange = (selectedOptions) => {
    setSelectedOptions(selectedOptions);
    console.log(selectedOptions);
  };

  return (
    <div className="Filters">
      <div className='Left-Home-Buttons'>
        <Link to="/map">
        <div className="AddPlace">
          <h2 className="AddPlace_Text">Inscribir sitio</h2> <MdAddBusiness />
        </div>
      </Link>
      <Link to="/home/1?name=&city=">
        <div className="ResetHome">
          <RiRefreshFill />
        </div>
      </Link>
      </div>

      <FilterGroup selectedOptions={selectedOptions}
      handleMultiSelectChange={handleMultiSelectChange}
      Caracteristicaslist={Caracteristicaslist}
      handleSelect={handleSelect}
      selectOrder={selectOrder}
      toggleMapMenu={toggleMapMenu}
      setToggleMapMenu={setToggleMapMenu}
      />

      <div className='ToggleFilterButton' onClick={toggleFilterModal
        ? () => setToggleFilterModal(false)
        : () => setToggleFilterModal(true)}>
        <BiFilterAlt/>
        {toggleFilterModal && <FilterGroup selectedOptions={selectedOptions}
      handleMultiSelectChange={handleMultiSelectChange}
      Caracteristicaslist={Caracteristicaslist}
      handleSelect={handleSelect}
      selectOrder={selectOrder}
      toggleMapMenu={toggleMapMenu}
      setToggleMapMenu={setToggleMapMenu}
      />}
      </div>
    </div>
  );
};
export default Filters;
