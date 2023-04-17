import axios from "axios";
//////names/////////////
export const FILTERS="FILTERS";
export const ORDER="ORDER";
export const RESET="RESET";
export const LOADINGLOCALS="LOADINGLOCALS";
export const LOGIN = 'LOGIN';
export const CREATE_USER = 'CREATE_USER';


//////////actions////////////////////////////

//filter
export const filter=()=>{
    // const datapaginada=paginado(data)
    return {
        type:FILTERS,
        payload:data
    }
}
//order
export const order=(data,actions)=>{
   const datas= data.flat()
    switch (actions) {
      case "best":
        for (let j = 0; j < datas.length; j++) {
          for (let i = 0; i < datas.length - 1; i++) {
            if (datas[i + 1].Rating > datas[i].Rating) {
              const auxiliar = datas[i];
              datas[i] = datas[i + 1];
              datas[i + 1] = auxiliar;
            }
          }
        }
    return {
        type:ORDER,
        payload:datas
    }
      case "A-Z":
        const az = datas.sort((a, b) => a.Name.localeCompare(b.Name));
        return{
            type:ORDER,
            payload:az
        }
      case "Z-A":
         const za = datas.sort((a, b) => b.Name.localeCompare(a.Name));
        return{
            type:ORDER,
            payload:za
        }
    


      default:
        break;
    }


   //adgorithm aordering
     
}
export const reset=()=>{
  return{
    type:RESET,
    payload:""
  }
}
/// loadinglocals
export const loadingLocals=async()=>{
try {
  const response=await axios.get("http://localhost:3001/locals")
return {
    type:LOADINGLOCALS,
    payload:response.data
  }
} catch (error) {
  console.log(error.message)
}


  
}
/// Create user
export const createUser=({name,lastname,age,phone_number,email,password,location,verified,isActive,role})=>{

  return async(dispatch)=>{
    try {
       await axios.post("http://localhost:3001/user", {
        name,
        lastname,
        age,
        phone_number,
        email,
        password,
        location,
        verified,
        isActive,
        role
      })
      return dispatch({ type: CREATE_USER, payload: "Usuario Creado Correctamente" })

      console.log("Usuario Creado mi vale");
    } catch (error) {
      console.log(error.message)
    }
  }

}


export const createLocal=async(inputs, chekinputs)=>{
        try{
    await axios.post("http://localhost:3001/locals",{
    "name":inputs.name, 
    "location":inputs.location, 
    "schedule":inputs.schedule,
    "email":inputs.email,
    "images":inputs.imagen  ,
    "characteristics":{
			"wifi": chekinputs.wifi,
			"parking_lot": chekinputs.parking_lot,
			"outdoor_seating": chekinputs.outdoor_seating,
			"live_music": chekinputs.live_music,
			"table_service": chekinputs.table_service,
			"family_style": chekinputs.family_style,
			"romantic": chekinputs.romantic,
			"big_group": chekinputs.big_group,
			"work_friendly": chekinputs.work_friendly,
			"pet_friendly": chekinputs.pet_friendly
		}
    })
        }catch(error){
            console.log(error.message)
        }
}

export const logIn = (credentials) => {
  console.log('haciendo dispatch')
  return async (dispatch) => {
    const res = await axios.post("http://localhost:3001/login", credentials);
    return dispatch({
      type: LOGIN,
      payload: res.data
    })
  }
}