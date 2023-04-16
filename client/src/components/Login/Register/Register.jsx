import { handleRegister, sendRegister } from "../helpers";

export const Register = () => {

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