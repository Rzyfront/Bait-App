export default function DataLocal ({ handleChange, inputs, errors, handleSelect }) {
  return (
        <>
            <label>Nombre Local: </label>
            <input
                className='name'
                onChange={handleChange}
                value={inputs.name}
                type='text'
                name='name'
                placeholder='Escribe el nombre del Local...'
            />
            {errors.name && <p className='danger'>{errors.name}</p>}
            <hr />
            <label>Ubicacion: </label>
            <select
                name='location'
                className='location'
                onChange={handleSelect}
                value={inputs.location}
            >
                <option value='value2' defaultValue>
                    Selecciona
                </option>
                <option value='Cordoba'>Cordoba</option>
                <option value='Buenos Aires'>Buenos Aires</option>
                <option value='Corrientes'>Corrientes</option>
            </select>
            <hr />
            <label>Correo Electronico: </label>
            <input
                className='correo'
                onChange={handleChange}
                value={inputs.email}
                type='text'
                name='email'
                placeholder='Escribe tu email...'
            />
            <hr />
            <label>Horario: </label>
            <input
                onChange={handleChange}
                value={inputs.schedule}
                type='text'
                name='schedule'
                placeholder='Escribe tu email...'
            />
            {errors.email && <p className='danger'>{errors.schedule}</p>}
            <hr />
            <label>Telefono: </label>
            <input
                className='telefono'
                onChange={handleChange}
                value={inputs.phone}
                type='tel'
                name='phone'
                pattern='[0-9]{10}'
                placeholder='Escribe tu numero de telefono...'
            />
            {errors.message && <p className='danger'>{errors.phone}</p>}
            <hr />
        </>
  );
}
