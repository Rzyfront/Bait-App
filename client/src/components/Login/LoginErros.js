const LoginErrors=(data)=>{
    const erros={}
    if(data.name==="")
    {
        erros.name="No tiene nada escrito"
    }
     if(data.password==="")
    {
        erros.password="no tiene nada escrito"
    }
    if(data.password2==="")
    {
        erros.password2="no tiene nada escrito"
    }
    if(data.name.length>20)
    {
        erros.name="Nombre muy grande"
    }
    if(data.phoneNumber.length!==10){
        erros.phoneNumber="No es un numero de telefono"
    }
    if(data.password!==data.password2){
        erros.password="No coinsiden las contraseñas"
    }
    return erros
}
export default LoginErrors