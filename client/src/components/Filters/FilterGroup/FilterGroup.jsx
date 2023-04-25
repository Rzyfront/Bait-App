
import { TbMapOff, TbMap2 } from 'react-icons/tb';
import Select from 'react-select';
function FilterGroup ({
  selectedOptions,
  handleMultiSelectChange,
  Caracteristicaslist,
  toggleMapMenu,
  setToggleMapMenu,
  filters,
  handleFilters,
  special
}) {
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
          name = "specialty"
          className="Restriction"
          onChange={handleFilters}
          value={filters.specialty}
        >
          <option value="" disabled> Tipo de comida </option>
          {special?.map((spe, i) => <option key={i} value={spe}>{spe}</option>)}
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
        <option value={'ratingASC'}>Menor rating</option>
        <option value={'ratingDESC'}>Mayor rating</option>
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
