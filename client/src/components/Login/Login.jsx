import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TfiClose } from "react-icons/tfi";
import "./Login.css";

const Login = ({ setToggleLogin }) => {
  const [animation, setAnimation] = useState(false);
  const [ojo, setOjo] = useState(false);
  const [login, setLogin] = useState(true);
  const titleRef = useRef();
  const formRef = useRef();
  const passRef = useRef();
  const imgRef = useRef();
  const [message, setMessage] = useState(false);
  const [form, setForm] = useState({});

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

  const handleInput = (e) => {
    const property = e.target.name;
    const value = e.target.value;
    setForm({ ...form, [property]: value });
  };

  return (
    <div className={`LoginContainer ${animation && "scale-up-tr"}`}>
      {login ? (
        <div className="login">
          <TfiClose
            className="CloseIcon"
            onClick={() => {
              setToggleLogin(false);
            }}
          />
          <div className="title" ref={titleRef}>
            <h3 className="Iniciar">Iniciar</h3>
            <h3 className="Sesion">sesion</h3>
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
                <div className="PasswordGroup">
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
                    width="20px"
                  ></img>
                </div>
                <button className="button">Ingresar</button>
                <div className="loginwith">
                  <img
                    alt="img"
                    src="./img/icons/google.png"
                    className="google"
                    width="30px"
                  ></img>
                  <span className="texto">Entra con Google</span>
                </div>

                <div className="registrarme" onClick={() => setLogin(!login)}>
                  <p>¿Aun no tienes cuenta?</p>
                  <h5>Registrate</h5>
                </div>
              </form>
            </div>
          </div>
          {message && (
            <h3 className="invalid">Los datos ingresados no son validos</h3>
          )}
        </div>
      ) : (
        <div className={`login ${!login && "scale-up-bottom"}`}>
          <TfiClose
            className="CloseIcon"
            onClick={() => {
              setToggleLogin(false);
            }}
          />

          <h3 className="Registro">Registro</h3>

          <div className="formulario">
            <div className="container" ref={formRef}>
              <form autoComplete="off" className="form">
                <input
                  className="input"
                  type="text"
                  name="User"
                  value={form.User}
                  onChange={handleInput}
                  autoComplete="off"
                  placeholder="Usuario"
                ></input>
                <input
                  className="input"
                  type="number"
                  name="Tel"
                  value={form.Tel}
                  onChange={handleInput}
                  autoComplete="off"
                  placeholder="Telefono"
                ></input>
                <input
                  className="input"
                  type="password"
                  name="Password"
                  value={form.Password}
                  onChange={handleInput}
                  autoComplete="off"
                  placeholder="Contraseña"
                ></input>
                <div className="PasswordGroup">
                  <input
                    type="password"
                    name="Password2"
                    autoComplete="off"
                    value={form.Password2}
                    onChange={handleInput}
                    className="input"
                    placeholder="Repetir contraseña"
                    ref={passRef}
                  ></input>
                  {/* <img
                    alt="img"
                    ref={imgRef}
                    onClick={fn}
                    className="ojo"
                    src="./img/icons/abrir-ojo.png"
                    width="20px"
                  ></img> */}
                </div>
                <button className="button">Registrarme</button>

                <div className="registrarme" onClick={() => setLogin(!login)}>
                  <p>¿Ya tienes cuenta?</p>
                  <h5>Inicia sesion</h5>
                </div>
              </form>
            </div>
          </div>
          {message && (
            <h3 className="invalid">Los datos ingresados no son validos</h3>
          )}
        </div>
      )}
    </div>
  );
};

export default Login;
