import { TfiClose } from "react-icons/tfi";
import { useRef, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { logIn } from "../../../redux/actions/actions";
import validation from "../validation"


const LoginForm = ({ setToggleLogin, fn, loginRegister }) => {
    const dispatch = useDispatch();
    const imgRef = useRef();
    const [message, setMessage] = useState(false);

    const [user, setUser] = useState({
        email: '',
        password: ''
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;

        setUser({
            ...user,
            [name]: value
        });

        setErrors(validation({
            ...user,
            [name]: value
        }));
    }

    const handleLogin = (e) => {
        e.preventDefault();

        console.log('entro')
        if (Object.entries(errors).length === 0) return dispatch(logIn(user));
        alert("Invalid data");
    }

    useEffect(() => {

    }, [user])

    return (
        <>
            <div className="login">
                <TfiClose
                    className="CloseIcon"
                    onClick={() => {
                        setToggleLogin(false);
                    }}
                />
                <div className="title">
                    <h3 className="Iniciar">Iniciar</h3>
                    <h3 className="Sesion">sesión</h3>
                </div>
                <div className="formulario">
                    <div className="container">
                        <form autoComplete="off" className="form">
                            <input
                                className="input"
                                type="text"
                                name="email"
                                value={user.email}
                                onChange={handleChange}
                                autoComplete="off"
                                placeholder="Usuario"
                            ></input>
                            <div className="PasswordGroup">
                                <input
                                    type="password"
                                    name="password"
                                    autoComplete="off"
                                    value={user.password}
                                    onChange={handleChange}
                                    className="input"
                                    placeholder="Contraseña"
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
                            <button className="button" type="submit" onSubmit={handleLogin}>Ingresar</button>
                            <div className="loginwith">
                                <img
                                    alt="img"
                                    src="./img/icons/google.png"
                                    className="google"
                                    width="30px"
                                ></img>
                                <span className="texto">Entra con Google</span>
                            </div>

                            <div className="registrarme" onClick={() => loginRegister()}>
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

export default LoginForm;