import './UserProfile.css';
import { Reviews, Navbar } from '../components';
import { useSelector } from 'react-redux';

function Userprofile () {
  const { user } = useSelector((state) => state);
  // const { name, lastName, Image, location, phone, email } = {
  //   name: '',
  //   Image: '',
  //   phone: []
  // };
  return (
    <>
    <Navbar />
      <div className="Userprofile"></div>
      {user && (
          <div className="userInfo">
            {user.Image
              ? (
              <img
                src={user.Image.url}
                className="UserImage"
              />
                )
              : (
            // <img src={Image} className="userImage" />
                  ''
                )}

            <div className="Decorator"></div>
            <div className="Info">
              <h2>{user.name + ' ' + user.lastname }</h2>
             <div className="AgeGroup">
                <h3 className="Age">{user.age}</h3>
            </div>
           <div className="TelGroup">
                <h3>Tel:</h3>
                <p>{user.phone_number}</p>;
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
      )}
   <div className="ContainerSelection">
        Reviews === `ReviewsUsers` && (<Reviews ReviewsList={user.Reviews} />
          )
   </div>
    </>
  );
}

export default Userprofile;