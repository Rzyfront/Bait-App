import { TfiClose } from "react-icons/tfi";
import { useRef, useState } from "react";
import { createUser } from "../../../redux/actions/actions";
import { validation} from "../validation";

const Register = ({ setToggleLogin, loginRegister }) => {

    const passRef = useRef();
    const formRef = useRef();
    const [message, setMessage] = useState(false);
    const[dataRegister, setDataRegister] = useState({
        name: "",
        lastname: "",
        age: "",
        phone_number: "",
        email: "",
        password: "",
        password2: "",
        location: "",
        verified: "",
        isActive: "",
        role: "",
    })

    const [errorsRegister, setErrorsRegister] = useState({
        name: "",
        phone_number: "",
        password: "",
    });
    const handleRegister = (event) => {
        setDataRegister({
            ...dataRegister,
            [event.target.name]: event.target.value,
        });
        setErrorsRegister(
            validation({
                ...dataRegister,
                [event.target.name]: event.target.value,
            })
        );

        // console.log(errorsRegister);
    };



    const sendRegister = (event) => {
        event.preventDefault();
        if (!Object.values(errorsRegister).length) {
            dispatch(createUser(dataRegister));
            setDataRegister({
                name: "",
                lastname: "",
                age: "",
                phone_number: "",
                email: "",
                password: "",
                password2: "",
                location: "",
                verified: "",
                isActive: "",
                role: "",
            });
            alert("Usario creado")
            setErrorsRegister({
                name: "",
                phone_number: "",
                password: "",
            });
        } else {
            alert(
                errorsRegister.name +
                "\n" +
                errorsRegister.password +
                "\n" +
                errorsRegister.phone_number
            );
        }
    };
    return(
        <>
            <div className={`login ${!loginRegister && "scale-up-bottom"}`}>
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
                                type="number"
                                name="age"
                                value={dataRegister.age}
                                onChange={handleRegister}
                                autoComplete="off"
                                placeholder="Apellido"
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
                                placeholder="edad"
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
                                {/* <img
                    alt="img"
                    ref={imgRef}
                    onClick={fn}
                    className="ojo"
                    src="./img/icons/abrir-ojo.png"
                    width="20px"
                  ></img> */}
                            </div>
                            <button className="button" onClick={sendRegister}>
                                Registrarme
                            </button>

                            <div className="registrarme" onClick={() => loginRegister()}>
                                <p>¿Ya tienes cuenta?</p>
                                <h5>Inicia sesión</h5>
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

export default Register;