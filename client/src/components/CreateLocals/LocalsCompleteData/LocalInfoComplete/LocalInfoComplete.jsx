import './LocalInfoComplete.css';
import Select from 'react-select';

function LocalInfoComplete ({ handleSelect, inputs, handleChange }) {
  const specialtyList = [
    { value: 'Mexican', label: 'Mexicana' },
    { value: 'Argentina', label: 'Argentina' },
    { value: 'China', label: 'China' },
    { value: 'Vegana', label: 'Vegana' },
    { value: 'Italiana', label: 'Italiana' },
    { value: 'Fancesa', label: 'Fancesa' },
    { value: 'India', label: 'India' },
    { value: 'Asiatica', label: 'Asiatica' },
    { value: 'Comida Rapida', label: 'Comida Rapida' },
    { value: 'Parrilla', label: 'Parilla' }
  ];
  const restaurantTypeList = [
    { value: 'Joven', label: 'Joven' },
    { value: 'Elegante', label: 'Elegante' },
    { value: 'Nuevo', label: 'Nuevo' },
    { value: 'Colonial', label: 'Colonial' },
    { value: 'Romantico', label: 'Romantico' },
    { value: 'Ejecutivo', label: 'Ejecutivo' }
  ];
  const characteristicsList = [
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

  const paymentList = [
    { value: 'Efectivo', label: 'Efectivo' },
    { value: 'Tarjeta Debito', label: 'Tarjeta Debito' },
    { value: 'Tarjeta Credito', label: 'Tarjeta Credito' },
    { value: 'Pay Apps', label: 'Pay Apps' }
  ];

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
        <button className='Add-schelude-button'>Agregar Horarios</button>
        <input
        className='Input-C Input-Email-Complete'
        type="text"
        name='email'
        placeholder='E-mail'
        value={inputs.email}
        onChange={handleChange}
        />
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
          value={inputs.specialty}
          placeholder={'Tipo de comida'}
          onChange={handleSelect}
          className="specialty-List-Select"
          classNamePrefix="specialty-List"
          menuPlacement="auto"
        />
        <Select
        isMulti
        name="restaurant-Type"
        options={restaurantTypeList}
        value={inputs.restaurantType}
        placeholder={'Tipo de restaurante'}
        onChange={handleSelect}
        className="restaurant-Type-List-Select"
        classNamePrefix="restaurant-Type-List"
        menuPlacement="auto"
        />
        <Select
        isMulti
        name="Characteristics"
        options={characteristicsList}
        value={inputs.characteristics}
        placeholder={'Caracteristicas'}
        onChange={handleSelect}
        className="characteristic-List-Select"
        classNamePrefix="characteristic-List"
        menuPlacement="auto"
        />
        <Select
        isMulti
        name="payment"
        options={paymentList}
        placeholder={'Metodos de Pago'}
        className="payment-List-Select"
        classNamePrefix="payment-List"
        menuPlacement="auto"
        />

    </div>
  );
}

export default LocalInfoComplete;
