import { Input } from '@nextui-org/react';
import { PopComent } from '../../../components';
// import { specialties } from '../../../../helpers/specialties';
import './DatabasicLocal.css';
export default function DatabasicLocal ({ handleChange, inputs, errors, handleSelect, searchCity, mapSearch, handleMap, statesupmit }) {
  console.log(errors);
  return (
    <div className='Basic-Inputs-Component'>
          <div className='Name-Input-Group'>
            <Input
                underlined
                labelPlaceholder="Nombre del Local"
                color="default"
                className='Inputs-Data-Basic'
                onChange={handleChange}
                value={inputs.name}
                borderWeight='bold'
                size='lg'
                type='text'
                name='name'
                required
            />
          {statesupmit === true && errors.name && <PopComent text={errors.name}/>}
           </div>
          {/* <div className='Email-Input-Group'>
            <Input
                underlined
                labelPlaceholder="Correo Electrónico"
                color="default"
                className='correo Inputs-Data-Basic'
                onChange={handleChange}
                value={inputs.email}
                type='text'
                name='email'
            />
          {statesupmit === true && errors.email && <PopComent text={errors.email}/>}
          </div> */}
            {/* <Input
                underlined
                labelPlaceholder="Horario"
                color="dark"
                className='horario Inputs-Data-Basic'
                onChange={handleChange}
                value={inputs.schedule}
                type='text'
                name='schedule'
            /> */}

               <Input
                underlined
                labelPlaceholder="Ciudad"
                color="default"
                className='name Inputs-Data-Basic'
                onChange={handleMap}
                borderWeight='bold'
                value={mapSearch}
                size='lg'
                type='text'
                required
            />

          {/* <div className='Especial-Input-Group'>
            <select
                name='specialty'
                className='specialty Inputs-Data-Basic'
                onChange={handleSelect}
                value={inputs.specialty}
                required
            >
                <option value='' defaultValue>
                    Tipo de comida
                </option>
                {specialties.map(specialty => (
                    <option key={specialty} value={specialty}>
                        {specialty}
                    </option>
                ))}

            </select>
          {statesupmit === true && errors.specialty && <PopComent text={errors.specialty}/>}
          </div> */}
        </div>
  );
}
