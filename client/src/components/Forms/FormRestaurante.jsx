import { useState } from "react";

const FormRest =() => {

    const [FormRest, setFormRest] = useState({
        location: "",
        name: "",
        imagen: "",
        calendar: "", 
        email: "", 
        phone: "",
        categories:[]
    })

    const [Errors, setErrors] = useState({
        location: "",
        name: "",
        imagen: "",
        calendar: "", 
        email: "", 
        phone: "",
        categories:[]
    })

    const changeHandler =(event) =>{
       const property = event.target.name;
       const value = value.target.value;
       setForm ({... FormRest, [property]: value})
       validate(FormRest)
    }

    const validate = (FormRest) => {
      if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(FormRest.email)){

      }

    }

    return (
        <FormRest>
            <div> 
                <label for = "location">Ubicacion</label>
                <input type="text" value= {FormRest.location}  onchange={changeHandler} required></input>
            </div>
            <div> 
                <label for = "name">Nombre</label>
                <input type="text" value= {FormRest.name}  onchange={changeHandler} required></input>
            </div>
            <div> 
                <label for = "imagen">Imagenes</label>
                <input  type="file" id="imagen" name="imagen" accept="image/*" multiple value= {FormRest.imagen} onchange={changeHandler} required></input>
            </div>
            <div> 
                <label for="calendar">Agenda</label>
                <input type="date" value= {FormRest.calendar} onchange={changeHandler} ></input>
            </div> 
            <div> 
                <label for="email">Correo Electronico:</label>
                <input type="email" name= "email" placeholder="example@example.com" value= {FormRest.email} onchange={changeHandler} required></input>
            </div>
            <div> 
                <label for = "phone">Telefono:</label>
                <input type="tel" name="phone" pattern="[0-9]{10}" title="Ingrese un número de teléfono válido de 13 dígitos" value= {FormRest.phone} onchange={changeHandler} required></input>
            </div>
            <div> 
                <label for = "categories">Categoria(s):</label>
                <input type="list" name="categories" value= {FormRest.categories} onchange={changeHandler} required></input>
            </div>
        </FormRest>
    )
}
export default FormRest; 