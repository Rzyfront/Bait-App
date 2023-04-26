import { TfiClose } from 'react-icons/tfi';
import { useRef, useState } from 'react';
import { createUser } from '../../../redux/actions/actions';
import { validation } from '../validation';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginWithGoogle } from '../../../helpers/loginWithGoogle';
import { FcGoogle } from 'react-icons/fc';

const Register = ({ setToggleLogin, loginRegister, login }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const passRef = useRef();
  const formRef = useRef();
  const [dataRegister, setDataRegister] = useState({
    name: '',
    lastname: '',
    age: '',
    phone_number: '',
    email: '',
    password: '',
    password2: '',
    location: '',
    verified: '',
    isActive: '',
    role: ''
  });

  const [errorsRegister, setErrorsRegister] = useState({
    name: '',
    phone_number: '',
    password: ''
  });
  const handleRegister = (event) => {
    setDataRegister({
      ...dataRegister,
      [event.target.name]: event.target.value
    });
    setErrorsRegister(
      validation({
        ...dataRegister,
        [event.target.name]: event.target.value
      })
    );
  };

  const sendRegister = (event) => {
    event.preventDefault();
    if (!Object.values(errorsRegister).length) {
      dispatch(createUser(dataRegister));
      setDataRegister({
        name: '',
        lastname: '',
        age: '',
        phone_number: '',
        email: '',
        password: '',
        password2: '',
        location: '',
        verified: '',
        isActive: '',
        role: ''
      });
      setErrorsRegister({});
      toast.success('Hemos enviado un email de verificacion', {
        position: toast.POSITION.TOP_CENTER
      });
    } else {
      toast.error(errorsRegister.name +
                '\n' +
                errorsRegister.password +
                '\n' +
                errorsRegister.phone_number, {
        position: toast.POSITION.TOP_CENTER
      });
    }
  };
  return (
        <>
            <div className={`${!login && 'register scale-up-bottom'}`} onClick={(e) => e.stopPropagation()}>
              <ToastContainer className="notify" theme="colored"/>
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
                                name="name"
                                value={dataRegister.name}
                                onChange={handleRegister}
                                autoComplete="off"
                                placeholder="Nombre"
                            ></input>
                            <input
                                className="input"
                                type="text"
                                name="lastname"
                                value={dataRegister.lastname}
                                onChange={handleRegister}
                                autoComplete="off"
                                placeholder="Apellido"
                            ></input>
                            <input
                                className="input"
                                type="number"
                                name="age"
                                value={dataRegister.age}
                                onChange={handleRegister}
                                autoComplete="off"
                                placeholder="Edad"
                            ></input>
                            <input
                                className="input"
                                type="text"
                                name="phone_number"
                                value={dataRegister.phone_number}
                                onChange={handleRegister}
                                autoComplete="off"
                                placeholder="Telefono"
                            ></input>
                            <input
                                className="input"
                                type="text"
                                name="email"
                                value={dataRegister.email}
                                onChange={handleRegister}
                                autoComplete="off"
                                placeholder="Email"
                            ></input>  <input
                                className="input"
                                type="text"
                                name="location"
                                value={dataRegister.location}
                                onChange={handleRegister}
                                autoComplete="off"
                                placeholder="Ciudad"
                            ></input>
                            <input
                                className="input"
                                type="password"
                                name="password"
                                value={dataRegister.password}
                                onChange={handleRegister}
                                autoComplete="off"
                                placeholder="Contraseña"
                            ></input>
                            <div className="PasswordGroup">
                                <input
                                    type="password"
                                    name="password2"
                                    autoComplete="off"
                                    value={dataRegister.password2}
                                    onChange={handleRegister}
                                    className="input"
                                    placeholder="Repetir contraseña"
                                    ref={passRef}
                                ></input>
                            </div>
                            <button className="button" onClick={sendRegister}>
                                Registrarme
                            </button>

                              <div className="loginwith">
                                <FcGoogle className='google'/>
                                <span className="texto" onClick={() => loginWithGoogle()}>Entra con Google</span>
                            </div>
                            <div className="registrarme" onClick={() => loginRegister()}>
                                <p>¿Ya tienes cuenta?</p>
                                <h5>Inicia sesión</h5>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
  );
};

export default Register;
