import { ORDER, RESET,LOADINGLOCALS } from "../actions/actions";

const initialState={
    cards:[],
reset:[]
}

//action paginate
const paginate=(data)=>{
  const size = 6;
  let newarray = [];
    for (var i = 0; i < data.length; i += size) {
      const oneDate = data.slice(i, i + size);
      newarray.push(oneDate);
    }
    return newarray
}





const rootReducer=(state=initialState ,{type,payload})=>{
     switch (type) {
      case LOADINGLOCALS:
      
        return{...state,
          cards:paginate(payload)
        }
   case ORDER:
    return{
        ...state,
        reset:state.cards,
        cards:paginate(payload)
      
    }
    case  RESET:
      return{
        ...state,
        cards:state.reset
      }


           default:
            return{...state}
     }
}
export default rootReducer;