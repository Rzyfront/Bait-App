import { TfiClose } from 'react-icons/tfi';
import { FcGoogle } from 'react-icons/fc';
import ojoAbierto from '../../../assets/abrir-ojo.png';
import ojoCerrado from '../../../assets/cerrar-ojo.png';
import { useRef, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { logIn } from '../../../redux/actions/actions';
import { validationLogin } from '../validation';
import { loginWithGoogle } from '../../../helpers/loginWithGoogle';

const LoginForm = ({ setToggleLogin, loginRegister }) => {
  const dispatch = useDispatch();
  const [ojo, setOjo] = useState(false);
  const passRef = useRef();

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

    setErrors(validationLogin({
      ...user,
      [name]: value
    }));
    console.log(errors);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    console.log('bye');
    if (Object.entries(errors).length === 0) return dispatch(logIn(user));
    alert('Invalid data');
    setUser({
      email: '',
      password: ''
    });
  };
  const fn = () => {
    if (!ojo) {
      passRef.current.type = 'text';
      setOjo(true);
    } else {
      passRef.current.type = 'password';
      setOjo(false);
    }
  };
  useEffect(() => {

  }, []);

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
                        <form autoComplete="off" className="form" onSubmit={handleLogin}>
                            <input
                                className="input"
                                type="text"
                                name="email"
                                value={user.email}
                                onChange={handleChange}
                                autoComplete="off"
                                placeholder="Usuario"
                            ></input>
                            {errors.email && <span>{errors.email}</span>}
                            <div className="PasswordGroup">
                                <input
                                    type="password"
                                    name="password"
                                    autoComplete="off"
                                    value={user.password}
                                    onChange={handleChange}
                                    className="input"
                                    placeholder="Contraseña"
                                    ref={passRef}
                                ></input>
                                <img
                                    alt="img"
                                    onClick={() => fn()}
                                    className="ojo"
                                    src={`${ojo ? ojoAbierto : ojoCerrado}`}
                                    width="20px"
                                    ></img>
                                {errors.password && <span>{errors.password}</span>}
                            </div>
                            <button className="button" type="submit">Ingresar</button>
                            <div className="loginwith">
                                <FcGoogle className='google'/>
                                <span className="texto" onClick={() => loginWithGoogle()}>Entra con Google</span>
                            </div>

                            <div className="registrarme" onClick={() => loginRegister()}>
                                <p>¿Aún no tienes cuenta?</p>
                                <h5>Regístrate</h5>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
  );
};

export default LoginForm;
