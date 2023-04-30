import { Button, Input } from '@nextui-org/react';
import { specialties } from '../../../../helpers/specialties';

export default function DataLocal ({ handleChange, inputs, errors, handleSelect, searchCity, mapSearch, handleMap }) {
  return (
    <>
            <Input
                underlined
                labelPlaceholder="Nombre del Local"
                color="default"
                className='name'
                onChange={handleChange}
                value={inputs.name}
                type='text'
                name='name'
                required
            />
            {errors.name && <p className='danger'>{errors.name}</p>}

            <Input
                underlined
                labelPlaceholder="Correo Electrónico"
                color="default"
                className='correo'
                onChange={handleChange}
                value={inputs.email}
                type='text'
                name='email'
            />
            {errors.email && <p className='danger'>{errors.email}</p>}

            <Input
                underlined
                labelPlaceholder="Horario"
                color="default"
                className='horario'
                onChange={handleChange}
                value={inputs.schedule}
                type='text'
                name='schedule'
            />

            <Input
                underlined
                labelPlaceholder="Telefono"
                color="default"
                className='telefono'
                onChange={handleChange}
                value={inputs.phone}
                type='number'
                name='phone'
            />

            <select
                name='specialty'
                className='specialty'
                onChange={handleSelect}
                value={inputs.specialty}
                required
            >
                <option value='value2' defaultValue>
                    Especialidad
                </option>
                {specialties.map(specialty => (
                    <option key={specialty} value={specialty}>
                        {specialty}
                    </option>
                ))}
                {/* <option value='Otro'>Otro</option> */}
            </select>
          <Input
              underlined
              labelPlaceholder="Nombre de ciudad"
              color="default"
              className='name'
              onChange={handleMap}
              value={mapSearch}
              type='text'
          // required
          />
          <Button onPress={searchCity}>Buscar ciudad</Button>

        </>
  );
}
