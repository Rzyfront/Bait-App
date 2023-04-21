import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { foodTypes } from '../../helpers/foodTypes';

const MenuForm = () => {
  const [menu, setMenu] = useState({
    type: ''
  });
  const handleSelect = (event) => {
    const { name, value } = event.target;
    setMenu({
      [name]: value
    });
  };

  return (
        <div>
            <form>
                <label>Selecciona la sección del menú</label>
              <select
                  name='type'
                  className='type'
                  onChange={handleSelect}
                  value={inputs.type}
                  required
              >
                  <option value='value2' defaultValue>
                      Selecciona
                  </option>
                  {foodTypes.map(type => (
                      <option key={type} value={type}>
                          {type}
                      </option>
                  ))}
                  {/* <option value='Otro'>Otro</option> */}
              </select>
            </form>
        </div>
  );
};

export default MenuForm;
