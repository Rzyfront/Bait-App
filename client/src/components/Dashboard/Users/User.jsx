import './User.css';
import imageDefault from '../../../assets/imagenDefault.png';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { DeleteUser, assignLocal, changeRole, createAdmin, getAllUsers, suspendUser } from '../../../redux/actions/admin';
import { useDispatch, useSelector } from 'react-redux';
import { BsFillHouseAddFill } from 'react-icons/bs';
import UserDetail from './UserDetail';
const User = ({ id, lastname, age, role, image, name, email, filter, localId, handleAdd, verified, phone_number }) => {
  const { user } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const [selector, setSelector] = useState(role);
  const [detailon, setdetailon] = useState(false);
  const [stateV, setStateV] = useState(verified);
  // actualizar role
  useEffect(() => {
    setSelector(role);
    setdetailon(verified);
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
      toast.error('Ocurrio un error', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000
      });
    }
  };

  const asigLocal = async () => {
    if (role === 'owner') {
      dispatch(assignLocal({ userId: id, localId }));
      handleAdd();
    }
    if (role === 'user') {
      await dispatch(changeRole({ id, role: 'owner' }));
      dispatch(assignLocal({ userId: id, localId }));
      handleAdd();
    }
  };

  const DeleteUserid = () => {
    dispatch(DeleteUser(id));
  };
  const handledetail = () => {
    if (detailon === true) {
      setdetailon(false);
    } else {
      setdetailon(true);
    }
  };

  return (
    <div className='userContainer'>
      {image ? <img src={image.url} alt='user foto' /> : <img src={imageDefault} alt='default' />}

      <div className='containerName'>
        <h3>{email}</h3>
      </div>
      {role !== 'superAdmin'
        ? <div className='selectdata'>
          <select
            onChange={handleSelect}
            defaultValue={role}
          >

            <option value={role}>{role}</option>
            {role !== 'user' && <option value="user" >Usuario</option>}
            {role !== 'owner' && <option value="owner" >Propietario</option>}
            {user && user.role === 'superAdmin' && <option value="admin" >Administrador</option>}

          </select >
          <button className={selector === role ? 'bottontrue' : 'bottonfalse'} onClick={changeType}>Cambiar</button></div>
        : <div className='selectdata'> <h3>{role}</h3>
        </div>
      }
      {/* colores estado cuenta */}

      {!localId && <button onClick={handledetail} className='botton'>{detailon && detailon === true
        ? 'Ocultar'
        : 'Detalles'}</button>}
      {verified && <div className={stateV && stateV === 'verified' ? 'green' : stateV === 'unVerified' ? 'orange' : 'red'}></div>}
      {localId && (role === 'owner' || role === 'user') && <BsFillHouseAddFill className='icon' onClick={asigLocal} />}
      {detailon && detailon === true && <UserDetail id={id} lastname={lastname} age={age} role={selector} image name={name} email={email} verified={stateV} handledetail={handledetail} DeleteUserid={DeleteUserid} suspent={suspent} phone_number={phone_number} />}

    </div>);
};
export default User;
