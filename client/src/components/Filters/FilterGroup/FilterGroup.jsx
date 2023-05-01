import Select from 'react-select';
function FilterGroup ({
  selectedOptions,
  handleMultiSelectChange,
  Caracteristicaslist,
  filters,
  handleFilters,
  special
}) {
  return (
     <div className="FiltersGroup" onClick={(e) => { e.stopPropagation(); }}>

        <Select
          value={selectedOptions}
          onChange={handleMultiSelectChange}
          options={Caracteristicaslist}
          placeholder={'Características'}
          className='MultiSelect-filters'
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
      </div>
  );
}

export default FilterGroup;
