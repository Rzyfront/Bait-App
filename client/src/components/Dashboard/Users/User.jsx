import './User.css';
import imageDefault from '../../../assets/imagenDefault.png';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { changeRole, createAdmin, getAllUsers, suspendUser } from '../../../redux/actions/admin';
import { useDispatch, useSelector } from 'react-redux';
import { FiUserX } from 'react-icons/fi';

const User = ({ id, lastname, age, role, image, name, email, filter }) => {
  const { user } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const [selector, setSelector] = useState(role);

  const handleSelect = (event) => {
    const { value } = event.target;
    setSelector(value);
  };

  const changeType = async () => {
    if (selector === 'admin') {
      await dispatch(createAdmin({ id }));
      dispatch(getAllUsers(filter));
    }
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
      dispatch(getAllUsers(filter));
    }
  };

  const suspent = async () => {
    const respuesta = await dispatch(suspendUser({ id }));
    if (respuesta === 201) {
      toast.success(`El usuario ${name + ' ' + lastname} ha sido sancionado efectivamente`, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 4000
      });
    } else {
      toast.error('Ocurrio un error', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000
      });
    }
  };

  return <div className='userContainer'>
        {image ? <img src={image.url} alt='user foto'/> : <img src={imageDefault} alt='default'/>}
        <div className='containerName'>
        <h3>{email}</h3>
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
          {user.role === 'superAdmin' && <option value="admin" >admin</option>}

      </select >
              <button className={selector === role ? 'bottontrue' : 'bottonfalse'} onClick={changeType}>Cambiar</button></div>
        : <div className='selectdata'> <h3>{role}</h3>

        </div>
        }
      <FiUserX className='icon' onClick={suspent}/>

  </div>;
};
export default User;
