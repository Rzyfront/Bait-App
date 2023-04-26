import { Input } from '@nextui-org/react';
import { PopComent } from '../../../components';
import { specialties } from '../../../../helpers/specialties';
export default function DatabasicLocal ({ handleChange, inputs, errors, handleSelect, searchCity, mapSearch, handleMap, statesupmit }) {
  console.log(errors);
  return (
    <div className='Basic-Inputs'>
          <div className='Name-Input-Group'>
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
          {statesupmit === true && errors.name && <PopComent text={errors.name}/>}
          </div>
          <div className='Email-Input-Group'>
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
          {statesupmit === true && errors.email && <PopComent text={errors.email}/>}
          </div>
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

          <div className='Especial-Input-Group'>
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
          {statesupmit === true && errors.specialty && <PopComent text={errors.specialty}/>}
          </div>
        </div>
  );
}
