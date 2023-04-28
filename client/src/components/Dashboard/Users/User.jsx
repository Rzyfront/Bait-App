import './User.css';
import imageDefault from '../../../assets/imagenDefault.png';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { assignLocal, changeRole, createAdmin, getAllLocal, getAllUsers, suspendUser } from '../../../redux/actions/admin';
import { useDispatch, useSelector } from 'react-redux';
import { FiUserX } from 'react-icons/fi';
import { BsFillHouseAddFill } from 'react-icons/bs';

const User = ({ id, lastname, age, role, image, name, email, filter, localId, handleAdd }) => {
  const { user } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const [selector, setSelector] = useState(role);
  // actualizar role
  useEffect(() => {
    setSelector(role);
  }, [role]);

  const handleSelect = (event) => {
    const { value } = event.target;
    setSelector(value);
  };

  const changeType = async () => {
    if (selector === 'admin') {
      await dispatch(createAdmin({ id }));
      dispatch(getAllUsers(filter));
      setSelector(role);
    }
    if (selector === role) {
      toast.error(`El usuario ya es ${role}`, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000
      });
    } else {
      await dispatch(changeRole({ id, role: selector }));
      toast.success('¡Rol cambiado satisfactoriamente!', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000
      });
      dispatch(getAllUsers(filter));
      setSelector(role);
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

  const asigLocal = () => {
    dispatch(assignLocal({ userId: id, localId }));
    handleAdd();
    useDispatch(getAllLocal(1, ''));
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
          defaultValue={role}
          required
      >

          <option value={role}>{role}</option>
                  {role !== 'user' && <option value="user" >user</option>}
                  {role !== 'owner' && <option value="owner" >owner</option>}
          {user && user.role === 'superAdmin' && <option value="admin" >admin</option>}

      </select >
              <button className={selector === role ? 'bottontrue' : 'bottonfalse'} onClick={changeType}>Cambiar</button></div>
        : <div className='selectdata'> <h3>{role}</h3>

        </div>
        }
      <FiUserX className='icon' onClick={suspent}/>
    {localId && <BsFillHouseAddFill className='icon' onClick={asigLocal}/>}

  </div>;
};
export default User;
