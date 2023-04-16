import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TfiClose } from "react-icons/tfi";
import "./Login.css";
import { useDispatch } from "react-redux";
import Register from './Register/Register';
import LoginForm from "./LoginForm/LoginForm";
import { handleInput, handleRegister, sendRegister, handleLogin } from "./helpers";

const Login = ({ setToggleLogin }) => {
  const dispatch = useDispatch();
  const [animation, setAnimation] = useState(false);
  const [ojo, setOjo] = useState(false);
  const [login, setLogin] = useState(true);
  const titleRef = useRef();
  const formRef = useRef();
  const passRef = useRef();
  const imgRef = useRef();
  const [message, setMessage] = useState(false);
  const [form, setForm] = useState({});

  const [dataRegister, setDataRegister] = useState({
    name: "",
    lastname: "MiPapa",
    age: "25",
    phoneNumber: "",
    email: "",
    password: "",
    password2: "",
    location: "Buenos Aires",
    verified: "true",
    isActive: "true",
    role: "user",
  });
  const [errorsRegister, setErrorsRegister] = useState({
    name: "",
    phoneNumber: "",
    password: "",
  });

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
        <LoginForm/>
        
      ) : (
          <Register/>
      )}
    </div>
  );
};

export default Login;
