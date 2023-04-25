import './UserProfile.css';
import { Reviews, Navbar } from '../components';
import { useDispatch, useSelector } from 'react-redux';
import  "./Userprofile.css"
import {getReviews, getUserProfile} from "../../redux/actions/actions"
import { DetailLocal } from '../../redux/actions/local';
import { useParams } from 'react-router';
import { useEffect } from 'react';


function Userprofile () {
  const dispatch = useDispatch();
  const {userId} = useParams()
  const  {user} = useSelector((state) => state.user);
  const  userProfile  = useSelector((state) =>  state.userProfile )
  const reviews = useSelector((state) => state.reviews)
  useEffect(()=>{
   
    dispatch(getReviews(userId))
    dispatch(getUserProfile(userId))
  
  },[])

  userProfile && console.log(userProfile.user?.Reviews);
  reviews && console.log(reviews);
  

  
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
        {reviews && reviews.map((review) => {
          return (
            <>
              <div key={review.id} className='reviewContainer'>
                <div className='reviewTitle'>
                  <h3>Titulo: {review.title}</h3>
                </div>

              <div className='reviewInfoContainer'>

                  <div className='reviewCalification'>
                    <p>Comentario: {review.comment}</p>
                    <p>Calificaciones:</p>
                    <p>Food :{review.food}</p>
                    <p>Service :{review.service}</p>
                    <p>Environment :{review.environment}</p>
                  </div>

                  <figure className='imgContainer'>
                    <img src={review.Image?.url} alt="" />
                  </figure>

                

              </div>
                
               
                <div className='reviewButtons'>
                  <button>Modificar</button>
                  <button>Eliminar</button>

                </div>
              </div>
             
            </>
           
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