import './LocalInfoComplete.css';
import Select from 'react-select';
import { specialtyList, characteristicsList, paymentList, restaurantTypeList } from './Multiselects/Multiselects';

function LocalInfoComplete ({ inputs, handleChange, setInputs, showShedule, setShowSchedule }) {
  const handleSpecialtyChange = (selectedOptions) => {
    const selectedSpecialty = selectedOptions.map(option => option.label);
    setInputs(inputs => ({ ...inputs, specialty: selectedSpecialty }));
  };
  const handleRestaurantTypeChange = (selectedOptions) => {
    setInputs(inputs => ({ ...inputs, restaurantType: selectedOptions }));
  };
  const handleCharacteristicsChange = (selectedOptions) => {
    const selectedCharacteristics = selectedOptions.map(option => option.value);
    setInputs(inputs => ({ ...inputs, characteristics: selectedCharacteristics }));
  };
  const handlePaymentChange = (selectedOptions) => {
    const selectedPayments = selectedOptions.map(option => option.value);
    setInputs(inputs => ({ ...inputs, payments: selectedPayments }));
  };

  const customStyles = {
    control: (provided) => ({
      ...provided,
      maxHeight: '40px',
      maxWidth: '100%',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      paddingRight: '55px'
    }),
    multiValue: (provided) => ({
      ...provided,
      position: 'relative',
      maxWidth: '80%',
      whiteSpace: 'nowrap',
      overflow: 'auto',
      textOverflow: 'ellipsis'
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      position: 'absolute',
      top: '0px',
      right: '0px',
      border: 'none'

    }),
    clearIndicator: (provided) => ({
      ...provided,
      position: 'absolute',
      top: '0px',
      right: '20px',
      border: 'none'
    })
  };
  return (
    <div className='LocalInfoComplete'>
        <input
        className='Input-C Input-Name-Complete'
        type="text"
        name='name'
        placeholder='Nombre del Local'
        value={inputs.name}
        onChange={handleChange}
        />
        <div className='Add-schelude-button'
        onClick={
          (showShedule
            ? () => setShowSchedule(false)
            : () => setShowSchedule(true))
        }>Agregar Horarios</div>
        <input
        className='Input-C Input-Email-Complete'
        type="number"
        name='phone'
        placeholder='Telefono/Celular'
        value={inputs.phone}
        onChange={handleChange}
        />
        <Select
          isMulti
          name="specialty"
          options={specialtyList}
          placeholder={'Tipo de comida'}
          onChange={handleSpecialtyChange}
          className="specialty-List-Select"
          classNamePrefix="specialty-List"
          menuPlacement="auto"
          styles={customStyles}
        />
        <Select
        name="restaurantType"
        options={restaurantTypeList}
        placeholder={'Tipo de restaurante'}
        onChange={handleRestaurantTypeChange}
        className="restaurant-Type-List-Select"
        classNamePrefix="restaurant-Type-List"
        menuPlacement="auto"
        styles={customStyles}
        />
        <Select
        isMulti
        name="characteristics"
        options={characteristicsList}
        placeholder={'Caracteristicas'}
        onChange={handleCharacteristicsChange}
        className="characteristic-List-Select"
        classNamePrefix="characteristic-List"
        menuPlacement="auto"
        styles={customStyles}
        />
        <Select
        isMulti
        name="payments"
        options={paymentList}
        placeholder={'Metodos de Pago'}
        onChange={handlePaymentChange}
        className="payment-List-Select"
        classNamePrefix="payment-List"
        menuPlacement="auto"
        styles={customStyles}
        />

    </div>
  );
}

export default LocalInfoComplete;
