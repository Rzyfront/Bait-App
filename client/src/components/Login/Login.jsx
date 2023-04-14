import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import axios from "axios"

const Login = () => {
  let ojo = false
  const [login, setLogin] = useState(true)
  const titleRef = useRef()
  const formRef = useRef()
  const passRef = useRef()
  const imgRef = useRef()
  const [message, setMessage] = useState(false)
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const fn = () => {
    if (!ojo) {
      passRef.current.type = "text";
      imgRef.current.src = "./img/icons/cerrar-ojo.png";
      ojo = true;
    } else {
      passRef.current.type = "password";
      imgRef.current.src = "./img/icons/abrir-ojo.png";
      ojo = false;
    }
  };

  const handleInput = (e) => {
    const property = e.target.name;
    const value = e.target.value
    setForm({...form, [property]:value})
  };

  return (
    <>
    { login ?
    <div className="login">
        <div className="titles" ref={titleRef}>
          <h3 className="title">Iniciar</h3>
          <h3 className="title1">sesion</h3>
        </div>
        <div className="formulario">
        <div className="container" ref={formRef}>
          <form autoComplete="off" className="form">
            <input
              className="input"
              type="text"
              name="username"
              value={form.username}
              onChange={handleInput}
              autoComplete="off"
              placeholder="Usuario"
            ></input>
            <input
              type="password"
              name="password"
              autoComplete="off"
              value={form.password}
              onChange={handleInput}
              className="input"
              placeholder="Contraseña"
              ref={passRef}
            ></input>
            <img
              alt="img"
              ref={imgRef}
              onClick={fn}
              className="ojo"
              src="./img/icons/abrir-ojo.png"
            ></img>
            <button className="button">
              Ingresar
            </button>
            <div className="loginwith">
              <img alt="img" src="./img/icons/google.png" className="google"></img>
              <span className="texto">Entra con Google</span>
            </div>
            <div className="registro">¿Aun no tienes cuenta?</div>
            <div className="registrarme" onClick={() => setLogin(!login)}>Registrate</div>
          </form>
        </div>
        </div>
        {message && <h3 className="invalid">Los datos ingresados no son validos</h3>}
        </div>
        :<div className="login">
        <div className="titles" ref={titleRef}>
          <h3 className="title">Registro</h3>
        </div>
        <div className="formulario">
        <div className="container" ref={formRef}>
          <form autoComplete="off" className="form">
            <input
              className="input"
              type="text"
              name="username"
              value={form.username}
              onChange={handleInput}
              autoComplete="off"
              placeholder="Usuario"
            ></input>
            <input
              className="input"
              type="text"
              name="username"
              value={form.username}
              onChange={handleInput}
              autoComplete="off"
              placeholder="Telefono"
            ></input>
            <input
              className="input"
              type="text"
              name="username"
              value={form.username}
              onChange={handleInput}
              autoComplete="off"
              placeholder="Contraseña"
            ></input>
            <input
              type="password"
              name="password"
              autoComplete="off"
              value={form.password}
              onChange={handleInput}
              className="input"
              placeholder="Repetir contraseña"
              ref={passRef}
            ></input>
            <img
              alt="img"
              ref={imgRef}
              onClick={fn}
              className="ojo"
              src="./img/icons/abrir-ojo.png"
            ></img>
            <button className="button">
              Registrarme
            </button>
            <div className="registro">¿Ya tienes cuenta?</div>
            <div className="registrarme" onClick={() => setLogin(!login)}>Inicia sesion</div>
          </form>
        </div>
        </div>
        {message && <h3 className="invalid">Los datos ingresados no son validos</h3>}
        </div>}
        </>
  );
};

export default Login;
