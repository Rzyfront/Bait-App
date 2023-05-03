import './UserDetail.css';
import { AiFillDelete } from 'react-icons/ai';
import { FiUserX } from 'react-icons/fi';
import { MdVerified } from 'react-icons/md';
const UserDetail = ({ id, lastname, age, role, name, email, verified, handledetail, DeleteUserid, suspent, phone_number }) => {
  const deleteDetail = async () => {
    await DeleteUserid();
    handledetail();
  };
  const handleSuspent = async () => {
    if (verified === 'suspended') {
      await suspent('verified');
      handledetail();
    } else {
      await suspent('suspended');
      handledetail();
    }
  };

  return <div className="detailcontainer">

      <div className='containerAll'>
      <p>user id:{id}</p>
      <p>nombre:{name} {lastname}</p>
      <p>celular:{phone_number}</p>
    </div>
    <div className='containerAll'>
      <p>email:{email}</p>
      <p>rol:{role}</p>
      <p>age:{age}</p>
    </div>
    <div className='containerAll'>
      <p>estado:{verified}</p>

    </div>
    <table className='tableActions'>
      <tr>
        <th>Borrar</th>
        <th>verificar</th>
        <th>Sancionar</th>
      </tr>
      <tr>
        <td><AiFillDelete className='iconAction' onClick={deleteDetail} /></td>
        <td>{(verified === 'suspended' || verified === 'unVerified') && <MdVerified className='iconVerified' onClick={handleSuspent} />}</td>
        <td> {verified !== 'suspended' && <FiUserX className='iconAction' onClick={handleSuspent} />} </td>
      </tr>
    </table>
    </div>;
};
export default UserDetail;
