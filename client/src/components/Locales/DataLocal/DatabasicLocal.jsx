import { Button, Input } from '@nextui-org/react';
import { specialties } from '../../../helpers/specialties';

export default function DatabasicLocal ({ handleChange, inputs, errors, handleSelect, searchCity, mapSearch, handleMap, statesupmit }) {
  console.log(errors);
  return (
    <>

            <Input
                underlined
                labelPlaceholder="Nombre del Local"
                color="dark"
                className='name'
                onChange={handleChange}
                value={inputs.name}
                type='text'
                name='name'
                required
            />
          {statesupmit === true && errors.name && < p style={{ color: 'red' }}>{errors.name}</p >}

            <Input
                underlined
                labelPlaceholder="Correo Electrónico"
                color="dark"
                className='correo'
                onChange={handleChange}
                value={inputs.email}
                type='text'
                name='email'
            />
          {statesupmit === true && errors.email && < p style={{ color: 'red' }}>{errors.email}</p >}
            <Input
                underlined
                labelPlaceholder="Horario"
                color="dark"
                className='horario'
                onChange={handleChange}
                value={inputs.schedule}
                type='text'
                name='schedule'
            />

            <select
                name='specialty'
                className='specialty'
                onChange={handleSelect}
                value={inputs.specialty}
                required
            >
                <option value='' defaultValue>
                    Especialidad
                </option>
                {specialties.map(specialty => (
                    <option key={specialty} value={specialty}>
                        {specialty}
                    </option>
                ))}
                {/* <option value='Otro'>Otro</option> */}
            </select>
          {statesupmit === true && errors.specialty && < p style={{ color: 'red' }}>{errors.specialty}</p >}
            <Input
                underlined
                labelPlaceholder="Nombre de ciudad"
                color="dark"
                className='name'
                onChange={handleMap}
                value={mapSearch}
                type='text'
                // required
            />

            <Button onPress={searchCity}>Buscar Ciudad</Button>
          {statesupmit === true && errors.location && < p style={{ color: 'red' }}>{errors.location}</p >}

        </>
  );
}
