import style from './Dashboard.module.css';
import Users from './Users/Users';
import Restaurantes from './Restaurants/Restaurants';
import Reseñas from './Reviews/Reviews';
import ReseñaDetail from './ReviewDetail/ReviewDetail';
import NavAdmin from './NavAdmin/NavAdmin';
import { useState } from 'react';

const Dashboard = () => {
  const [section, setSection] = useState(0);

  const changeSection = (n, e) => {
    setSection(n);
  // e.target.style.backgroundColor = 'black';
  };

  return (
    <div className={style.container}>
    <NavAdmin section={section} fn={changeSection}/>
    {section === 0 && <Users />}
    {section === 1 && <Restaurantes/> }
    {section === 2 && <Reseñas fn={changeSection}/> }
    {section === 3 && <ReseñaDetail/> }
    </div>
  );
};

export default Dashboard;
