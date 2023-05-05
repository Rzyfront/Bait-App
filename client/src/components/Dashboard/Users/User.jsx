import './User.css';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { DeleteUser, changeRole, createAdmin, getAllUsers, suspendUser } from '../../../redux/actions/admin';
import { useDispatch, useSelector } from 'react-redux';
import { AiFillDelete } from 'react-icons/ai';
import { FiUserX } from 'react-icons/fi';
import { MdVerified } from 'react-icons/md';
import { USER_STATE, ROLES } from '../dictionaries';

const imageDefault = 'https://objetivoligar.com/wp-content/uploads/2017/03/blank-profile-picture-973460_1280-580x580.jpg';

const User = ({ id, lastname, age, role, image, name, email, filter, localId, handleAdd, verified, phone_number }) => {
  const { user } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const [selector, setSelector] = useState(role);
  const [stateV, setStateV] = useState(verified);

  // Update role
  useEffect(() => {
    setSelector(role);
  }, [role, verified]);

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

  const suspent = async (action) => {
    const respuesta = await dispatch(suspendUser({ id, action }));

    if (respuesta === 201) {
      toast.success(`El usuario ${name + ' ' + lastname} su estado es ${action}`, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 4000
      });
      setStateV(action);
    } else {
      toast.error('Ocurrió un error', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000
      });
    }
  };

  const handleSuspent = async () => {
    if (verified === 'suspended') {
      await suspent('verified');
    } else {
      await suspent('suspended');
    }
  };

  const deleteUserId = () => {
    dispatch(DeleteUser(id));
  };

  return (
    <tr>
      <td>
        {image ? <img src={image.url} alt='user foto' className='dash-user-img' /> : <img src={imageDefault} alt='default' className='dash-user-img' />}
      </td>
      <td>{name}</td>
      <td>{age}</td>
      <td>{email}</td>
      <td>{phone_number}</td>
      {ROLES[role] !== 'Súper admin'
        ? <td>
          <select
            onChange={handleSelect}
            defaultValue={ROLES[role]}
            className='dash-user-rol-select'
          >

            <option value={ROLES[role]}>{ROLES[role]}</option>
            {role !== 'user' && <option value="user" >Usuario</option>}
            {role !== 'owner' && <option value="owner" >Propietario</option>}
            {user && user.role === 'superAdmin' && <option value="admin" >Administrador</option>}

          </select >
          <button className={selector === role ? 'bottontrue' : 'bottonfalse'} onClick={changeType}>Cambiar</button></td>
        : <td>{ROLES[role]}</td>
      }
      <td>
        {USER_STATE[verified]}
      </td>
      <td>
        {/* STATE COLOR CODE */}
        {verified && <div className={stateV && stateV === 'verified' ? 'green' : stateV === 'unVerified' ? 'orange' : 'red'}></div>}
      </td>
      <td>
        {(verified === 'suspended' || verified === 'unVerified') && ROLES[role] !== 'Súper admin' && <MdVerified className='icon Verified' onClick={handleSuspent} />}
      </td>
      <td>
        {verified !== 'iconSuspended' && ROLES[role] !== 'Súper admin' && <FiUserX className='icon Action' onClick={handleSuspent} />}
      </td>
      <td>
        {ROLES[role] !== 'Súper admin' && <AiFillDelete className='icon delete' onClick={deleteUserId} />}
      </td>
    </tr>);
};
export default User;
