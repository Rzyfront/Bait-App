import './User.css';
import imageDefault from '../../../assets/imagenDefault.png';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { changeRole } from '../../../redux/actions/admin';
import { useDispatch } from 'react-redux';

const User = ({ id, lastname, age, role, image, name }) => {
  const dispatch = useDispatch();
  const [selector, setSelector] = useState(role);

  const handleSelect = (event) => {
    const { value } = event.target;
    setSelector(value);
  };

  const changeType = () => {
    if (selector === role) {
      toast.error(`El usuario ya es ${role}`, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000
      });
    } else {
      dispatch(changeRole({ id, role: selector }));
      toast.success('¡Rol cambiado satisfactoriamente!', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000
      });
    }
  };

  return <div className='userContainer'>
        {image ? <img src={image.url} alt='user foto'/> : <img src={imageDefault} alt='default'/>}
        <div className='containerName'>
        <h3>{name} {lastname}</h3>
        </div>
      {role !== 'superAdmin' && role !== 'admin'
        ? <div className='selectdata'>
        <select
          onChange={handleSelect}
          value={selector}
          required
      >
          <option value={role} defaultValue>{role}</option>
                  {role !== 'user' && <option value="user" >user</option>}
                  {role !== 'owner' && <option value="owner" >owner</option>}

      </select >
              <button className={selector === role ? 'bottontrue' : 'bottonfalse'} onClick={changeType}>Cambiar</button></div>
        : <div className='selectdata'> <h3>{role}</h3></div>}

  </div>;
};
export default User;
