import './User.css';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { deleteUser, changeRole, createAdmin, getAllUsers, suspendUser } from '../../../redux/actions/admin';
import { useDispatch, useSelector } from 'react-redux';
import { AiOutlineSave } from 'react-icons/ai';
import { FiEdit, FiUserMinus } from 'react-icons/fi';
import { BiUserMinus } from 'react-icons/bi';
import { BsArchive } from 'react-icons/bs';
import { MdVerified } from 'react-icons/md';
import { USER_STATE, ROLES, LOWER_USER_STATE } from '../dictionaries';

const imageDefault = 'https://objetivoligar.com/wp-content/uploads/2017/03/blank-profile-picture-973460_1280-580x580.jpg';

const User = ({ id, lastname, age, role, image, name, email, filter, verified, phone_number }) => {
  const { user } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const [selector, setSelector] = useState(role);
  const [stateV, setStateV] = useState(verified);
  const [showSelect, setShowSelect] = useState(false);

  // Update role
  useEffect(() => {
    setSelector(role);
    setStateV(verified);
    dispatch(getAllUsers(filter));
  }, [role, verified, user]);

  const handleSelect = (event) => {
    const { value } = event.target;
    setSelector(value);
  };

  const changeType = async () => {
    setShowSelect(!showSelect);
    if (selector === 'admin') {
      await dispatch(createAdmin({ id }));
      dispatch(getAllUsers(filter));
      setSelector(role);
      setShowSelect(false);
    }
    if (selector === role) {
      toast.error(`No se puede reasignar el rol actual. Rol actual: ${ROLES[role]}`, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000
      });
    } else {
      await dispatch(changeRole({ id, role: selector }));
      toast.success('Rol cambiado satisfactoriamente', {
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
      toast.success(`El nuevo estado de ${name} ${lastname} es ${LOWER_USER_STATE[action]}`, {
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
      dispatch(getAllUsers(filter));
    } else {
      await suspent('suspended');
      dispatch(getAllUsers(filter));
    }
  };

  const deleteUserId = () => {
    dispatch(deleteUser(id));
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
          {
            showSelect
              ? <td><select
              onChange={handleSelect}
            value={selector}
              className='dash-user-rol-select'
            >

              {/* <option value={ROLES[role]}>{ROLES[role]}</option> */}
              <option value=''>Seleccione un rol</option>
              {role !== 'user' && <option value="user" >Usuario</option>}
              {user && user.role === 'superAdmin' && <option value="admin" >Administrador</option>}
            </select ></td>
              : <td>{!showSelect && ROLES[role]}</td>

            }
      <td>
        {ROLES[role] !== 'Súper admin' && <button onClick={() => setShowSelect(!showSelect)} className='dash-user-btn'>{showSelect ? <AiOutlineSave title='Guardar' onClick={changeType}/> : <FiEdit title='Cambiar rol'/>}</button>}
      </td>

      <td>
        {role !== 'superAdmin' && USER_STATE[verified]}
      </td>
      <td>
        {/* STATE COLOR CODE */}
        {verified && role !== 'superAdmin' && <div className={stateV && stateV === 'verified' ? 'green' : stateV === 'unVerified' ? 'orange' : 'red'}></div>}
      </td>
      <td>
        {(verified === 'suspended' || verified === 'unVerified') && ROLES[role] !== 'Súper admin'
          ? <MdVerified className='icon Verified' onClick={handleSuspent} />
          : ROLES[role] !== 'Súper admin' && <FiUserMinus className='iconAction' onClick={handleSuspent} />
        }
      </td>
    </tr>);
};
export default User;
