export const validation = (data) => {
    const errors = {}
    
    if(data.name === "") errors.name = "Este campo es requerido";

    if(data.password === "") errors.password = "Este campo es requerido";

    if(data.password2 === "") errors.password2 = "Este campo es requerido";

    if(data.name.length > 20) errors.name = "Nombre muy grande";

    if(data.phoneNumber.length !== 10){
        errors.phoneNumber = "Ingresa un número de teléfono válido"
    }
    if(data.password !== data.password2){
        errors.password = "Las contraseñas deben coincidir"
    }
    return errors;
}

export const validationLogin = (data) =>{
    const errors = {}

    if(data.email === "") errors.email = "Este campo es requerido";

    if(data.password === "") errors.password = "Este campo es requerido";

    return errors;
}
