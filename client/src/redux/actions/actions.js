//////names/////////////
import axios from 'axios';
export const FILTERS="FILTERS";
export const ORDER="ORDER";
export const RESET="RESET";
export const GET_REV_DETAIL = 'GET_REV_DETAIL';
export const POST_REV = 'POST_REV';
export const UPDATE_REVIEW = 'UPDATE_REVIEW';
export const DELETE_REVIEW = 'DELETE_REVIEW';

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

export const getRevDetail = () => {

}


