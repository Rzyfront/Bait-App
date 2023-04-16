import { useState, useEffect } from "react";
import "./Login.css";
import Register from './Register/Register';
import LoginForm from "./LoginForm/LoginForm";


const Login = ({ setToggleLogin }) => {
  const [animation, setAnimation] = useState(false);
  const [ojo, setOjo] = useState(false);
  // const [login, setLogin] = useState(true);   ---- parece que este componente no usa este estado
  
  useEffect(() => {
    setDataRegister({
      ...dataRegister,
      email: `${Math.random().toString(36).substring(7)}@gmail.com`,
    });
  }, []);

  useEffect(() => {
    setAnimation(true);
  });
  const fn = () => {
    if (!ojo) {
      passRef.current.type = "text";
      imgRef.current.src = "./img/icons/cerrar-ojo.png";
      setOjo(true);
    } else {
      passRef.current.type = "password";
      imgRef.current.src = "./img/icons/abrir-ojo.png";
      setOjo(false);
    }
  };

  return (
    <div className={`LoginContainer ${animation && "scale-up-tr"}`}>
      {login ? (
        <LoginForm setToggleLogin={setToggleLogin} fn={fn}/>
        
      ) : (
          <Register setToggleLogin={setToggleLogin}/>
      )}
    </div>
  );
};

export default Login;
