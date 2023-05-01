import { useState, useEffect } from 'react';
import './Login.css';
import Register from './Register/Register';
import LoginForm from './LoginForm/LoginForm';

const Login = ({ setToggleLogin }) => {
  const [animation, setAnimation] = useState(false);
  const [login, setLogin] = useState(true);

  const loginRegister = () => {
    setLogin(!login);
  };

  useEffect(() => {
    setAnimation(true);
  });

  return (
    <div className='LoginContainer scale-up-tr' onClick={() => setToggleLogin(false)}>
      {login
        ? (
        <LoginForm setToggleLogin={setToggleLogin} loginRegister={loginRegister}/>

          )
        : (
          <Register setToggleLogin={setToggleLogin} loginRegister={loginRegister} login={login} />
          )}
    </div>
  );
};

export default Login;
