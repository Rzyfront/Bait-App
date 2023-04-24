import './UserProfile.css';
import { useEffect } from 'react';
import { Reviews, Navbar } from '../components';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { DetailUser } from '../../redux/actions/actions';

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
      <div className="Userprofile"></div>
      {users && (
          <div className="userInfo">
            {users.Images.length
              ? (
              <img
                src={users.Images[0].url}
                className="UserImage"
              />
                )
              : (
              <img src={Image} className="userImage" />
                )}

            <div className="Decorator"></div>
            <div className="Info">
              <h2>{users.name + ' ' + users.lastname }</h2>
             <div className="AgeGroup">
                <h3 className="Age">{users.age}</h3>
            </div>
           <div className="TelGroup">
                <h3>Tel:</h3>
                {phone.map((t, i) => {
                  return <p key={i}>{t} |</p>;
                })}
              </div>
            <div className="EmailGroup">
                <h3>E-mail:</h3>
                <p>{users.email}</p>
              </div>
            <div className="LocationGroup">
                <h3 className="Location">{users.location}</h3>
            </div>
              </div>
              </div>
      )}
   <div className="ContainerSelection">
        Reviews === `ReviewsUsers` && (<Reviews ReviewsList={users.Reviews} />
          )
   </div>
    </>
  );
}

export default Userprofile;
