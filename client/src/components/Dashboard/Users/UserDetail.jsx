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
       <AiFillDelete className='icon' onClick={deleteDetail} />
      {verified === 'suspended' && <MdVerified onClick={handleSuspent}/>}

      {verified !== 'suspended' && <FiUserX className='icon' onClick={handleSuspent} />}
    </div>
    </div>;
};
export default UserDetail;
