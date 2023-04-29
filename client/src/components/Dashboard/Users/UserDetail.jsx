import imageDefault from '../../../assets/imagenDefault.png';
import './UserDetail.css';
import { AiFillDelete } from 'react-icons/ai';
import { FiUserX } from 'react-icons/fi';
const UserDetail = ({ id, lastname, age, role, image, name, email, filter, verified, handledetail, DeleteUserid, suspent }) => {
  const deleteDetail = async () => {
    console.log(id);
    await DeleteUserid();
    handledetail();
  };
  const handleSuspent = async () => {
    await suspent();
    handledetail();
  };

  return <div className="detailcontainer">
    <div className='containerDetail'>
      <button onClick={handledetail}>cerrar</button>
      {image && image.length ? <img src={image.url} alt='user foto' /> : <img src={imageDefault} alt='default' />}
      <p>user id:{id}</p>
      <p>nombre:{name} {lastname}</p>
      <p>email:{email}</p>
      <p>rol:{role}</p>
      <p>age:{age}</p>
      <AiFillDelete className='icon' onClick={deleteDetail} />
      <FiUserX className='icon' onClick={handleSuspent} />
    </div>
    </div>;
};
export default UserDetail;
