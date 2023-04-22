import { Input } from '@nextui-org/react';
import { specialties } from '../../../helpers/specialties';

export default function DataLocal ({ handleChange, inputs, errors, handleSelect }) {
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
            {errors.name && <p className='danger'>{errors.name}</p>}

            <select
                name='location'
                className='location'
                onChange={handleSelect}
                value={inputs.location}
                required
            >
                <option value='value2' defaultValue>
                    Ubicacion
                </option>
                <option value='Cordoba'>Córdoba</option>
                <option value='Buenos Aires'>Buenos Aires</option>
                <option value='Corrientes'>Corrientes</option>
            </select>

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
            {errors.email && <p className='danger'>{errors.email}</p>}

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
            {/* <input
                onChange={handleChange}
                value={inputs.schedule}
                type='text'
                name='schedule'
                required
            /> */}
            {errors.schedule && <p className='danger'>{errors.schedule}</p>}

            <Input
                underlined
                labelPlaceholder="Telefono"
                color="dark"
                className='telefono'
                onChange={handleChange}
                value={inputs.phone}
                type='number'
                name='phone'
            />
            {/* <input
                className='telefono'
                onChange={handleChange}
                value={inputs.phone}
                type='tel'
                name='phone'
                pattern='[0-9]{10}'
                placeholder='Escribe tu número de teléfono...'
                required
            /> */}
            {errors.phone && <p className='danger'>{errors.phone}</p>}

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
            {/* {inputs.specialty === 'Otro' && (
                <>
                    <Input
                        underlined
                        labelPlaceholder="Especialidad"
                        color="dark"
                        className='other-specialty'
                        onChange={handleChange}
                        value={inputs.otherSpecialty}
                        type='text'
                        name='otherSpecialty'
                        required
                    />
                    <br />
                </>
            )} */}

        </>
  );
}
