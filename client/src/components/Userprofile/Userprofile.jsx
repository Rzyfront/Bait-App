import './UserProfile.css';
import { useEffect } from 'react';
import { Reviews, Navbar } from '../components';
import { useDispatch, useSelector } from 'react-redux';
import  "./Userprofile.css"
import {getUserProfile} from "../../redux/actions/actions"
import { DetailLocal } from '../../redux/actions/local';
import { useParams } from 'react-router';


function Userprofile () {
  const dispatch = useDispatch();
  const {userId} = useParams()
  const  {user} = useSelector((state) => state.user);
  const  userProfile  = useSelector((state) =>  state.userProfile )
  useEffect(()=>{
   
    dispatch(getUserProfile(userId))
  
  },[])

  userProfile && console.log(userProfile.user?.Reviews);

  

  
  return (
    <div className='userProfileContainer'>
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
            <p>{user.phone_number}</p>
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
      <div className='userReviews'>
        <h1>Tus Reviews </h1>
        {userProfile && userProfile.user?.Reviews.map((review) => {
          return (
            <div key={review.id} className='reviewContainer'>
              <h4>Titulo: {review.title}</h4>
              <h4>Comentario: {review.comment}</h4>
              <h3>Calificaciones:</h3>
               <h2>Food :{review.food}</h2> 
              <h2>Service :{review.service}</h2> 
              <h2>Environment :{review.environment}</h2> 
            </div>
          )
        })}
      </div>
      <input
        type='file'
        name='imagen'
        accept='image/png,image/jpeg,image/jpg,image/gif'
       
      ></input>
      <div className="Userprofile"></div>
     
     
   
    </div>
  );
}

export default Userprofile;