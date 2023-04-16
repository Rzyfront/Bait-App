import { handleInput, handleRegister, handleLogin } from "../helpers";
import { TfiClose } from "react-icons/tfi";
import { useRef, useState } from "react";

 const LoginForm = ({ setToggleLogin, fn }) => {
    const titleRef = useRef();
    const passRef = useRef();
    const imgRef = useRef();
    const [message, setMessage] = useState(false);
    const [form, setForm] = useState({});

    return(
        <>
            <div className="login">
                <TfiClose
                    className="CloseIcon"
                    onClick={() => {
                        setToggleLogin(false);
                    }}
                />
                <div className="title" ref={titleRef}>
                    <h3 className="Iniciar">Iniciar</h3>
                    <h3 className="Sesion">sesión</h3>
                </div>
                <div className="formulario">
                    <div className="container" ref={formRef}>
                        <form autoComplete="off" className="form">
                            <input
                                className="input"
                                type="text"
                                name="name"
                                value={dataRegister.name}
                                onChange={handleRegister}
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
                            <button className="button" onSubmit={handleLogin}>Ingresar</button>
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
                                <p>¿Aún no tienes cuenta?</p>
                                <h5>Regístrate</h5>
                            </div>
                        </form>
                    </div>
                </div>
                {message && (
                    <h3 className="invalid">Los datos ingresados no son válidos</h3>
                )}
            </div>
        </>
    )
}

export default LoginForm