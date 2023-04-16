import { useRef, useState } from "react";
import { createUser } from "../../../redux/actions/actions";
import LoginErrors from "../LoginErros";

const Register = ({ setToggleLogin }) => {

    const passRef = useRef();
    const formRef = useRef();
    const [message, setMessage] = useState(false);

    const [errorsRegister, setErrorsRegister] = useState({
        name: "",
        phoneNumber: "",
        password: "",
    });
    const handleRegister = (event) => {
        setDataRegister({
            ...dataRegister,
            [event.target.name]: event.target.value,
        });
        setErrorsRegister(
            LoginErrors({
                ...dataRegister,
                [event.target.name]: event.target.value,
            })
        );

        console.log(errorsRegister);
    };

    const [dataRegister, setDataRegister] = React.useState({
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

    const sendRegister = (event) => {
        event.preventDefault();
        if (!Object.values(errorsRegister).length) {
            dispatch(createUser(dataRegister));
            setDataRegister({
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
            setErrorsRegister({
                name: "",
                phoneNumber: "",
                password: "",
            });
        } else {
            alert(
                errorsRegister.name +
                "\n" +
                errorsRegister.password +
                "\n" +
                errorsRegister.phoneNumber
            );
        }
    };
    return(
        <>
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
                                name="name"
                                value={dataRegister.name}
                                onChange={handleRegister}
                                autoComplete="off"
                                placeholder="Usuario"
                            ></input>
                            <input
                                className="input"
                                type="number"
                                name="phoneNumber"
                                value={dataRegister.phoneNumber}
                                onChange={handleRegister}
                                autoComplete="off"
                                placeholder="Telefono"
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
                                    value={dataRegister.paswword2}
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
        </>
    )

}

export default Register;