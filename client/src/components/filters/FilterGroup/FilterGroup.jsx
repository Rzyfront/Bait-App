
import { TbMapOff, TbMap2 } from 'react-icons/tb';
import Select from 'react-select';
function FilterGroup ({ selectedOptions, handleMultiSelectChange, Caracteristicaslist, handleSelect, selectOrder, toggleMapMenu, setToggleMapMenu }) {
  return (
     <div className="FiltersGroup">

        <Select
          value={selectedOptions}
          onChange={handleMultiSelectChange}
          options={Caracteristicaslist}
          placeholder={'Caracteristicas'}
          className='MultiSelect-filters'
          styles={{ color: '#343434', backgroundColor: '#f4f4f4' }}
          isMulti
        />
        <select
          className="Restriction"
          onChange={handleSelect}
          value={selectOrder}
        >
          <option value="" disabled>
            Tipo de comida
          </option>
          <option value={'mayor'}>Vegana</option>
          <option value={'menor'}>Libre de gluten</option>
          <option value={'mayor'}>Keto diet</option>
          <option value={'mayor'}>Mexicana</option>
          <option value={'mayor'}>Argentina</option>
          <option value={'mayor'}>Italiana</option>
          <option value={'mayor'}>Peruana</option>
        </select>
        <select
          className="RatingOrder"
          onChange={handleSelect}
          value={selectOrder}
        >
          <option value="" disabled>
            Ordena por Rating
          </option>
          <option value={'mayor'}>Mayor rating</option>
          <option value={'menor'}>Menor rating</option>
        </select>

        <select
          className="AlphaOrder"
          onChange={handleSelect}
          value={selectOrder}
        >
          <option value="" disabled>
            Ordena Alfabeticamente
          </option>
          <option value={'A-Z'}>A-Z</option>
          <option value={'Z-A'}>Z-A</option>
        </select>
        <div className='Map-Toggle-Group' onClick={toggleMapMenu
          ? () => setToggleMapMenu(false)
          : () => setToggleMapMenu(true)}>
          {toggleMapMenu
            ? <TbMapOff/>
            : <TbMap2/>}
        </div>
      </div>
  );
}

export default FilterGroup;
