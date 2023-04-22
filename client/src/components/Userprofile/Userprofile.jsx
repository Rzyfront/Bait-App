import './UserProfile.css';
import { useEffect } from 'react';
import { Reviews, Navbar } from '../components';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import  "./Userprofile.css"
// import { DetailUser } from '../../redux/actions/actions';

function Userprofile () {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.detail);
  const { id } = useParams();
  useEffect(() => {
    dispatch(DetailUser(id));
  }, [id]);

  const { name, lastName, Image, location, phone, email } = {
    name: '',
    Image: '',
    phone: []
  };
  return (
    <>
    <Navbar />
      <h2 className='userProfileText'>perfil de usuario</h2>
      {user && (
      <div className="userInfo">
        <div className="Decorator"></div>
        <div className="Info">
          <figure className="imgProfileContainer">
              <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt="" className="imgProfile" />
          </figure>
          <h2>{user.name + ' ' + user.lastname}</h2>
          <div className="AgeGroup">
            <h3 className="Age">{user.age}</h3>
          </div>
          <div className="TelGroup">
            <h3>Tel:</h3>
            {phone.map((t, i) => {
              return <p key={i}>{t} |</p>;
            })}
          </div>
          <div className="EmailGroup">
            <h3>E-mail:</h3>
            <p>{user.email}</p>
          </div>
          <div className="LocationGroup">
            <h3 className="Location">{user.location}</h3>
          </div>
        </div>
      </div>
      )
}
      <input
        type='file'
        name='imagen'
        accept='image/png,image/jpeg,image/jpg,image/gif'
       
      ></input>
      <div className="Userprofile"></div>
     
   <div className="ContainerSelection">
        `{Reviews === `ReviewsUsers` && (<Reviews ReviewsList={user.Reviews} />
          ) }` 
   </div>
   
    </>
  );
}

export default Userprofile;