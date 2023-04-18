
import { ORDER, RESET, SEARCH_BY_QUERY, DETAIL,CREATE_USER, HOMEPAGE } from "../actions/actions";

const initialState={
cards:[],
reset:[],
detail:[]
}
const rootReducer=(state=initialState ,{type,payload})=>{
     switch (type) {
   case ORDER:
    return{
        ...state,
        reset:state.cards,
        cards:payload  
    }
    case  RESET:
      return{
        ...state,
        cards: state.reset,
      };
    case SEARCH_BY_QUERY:
      return {
        ...state,
        cards: payload
      }
    case DETAIL:
      return{
        ...state,
        detail:payload
      }
      case CREATE_USER:
        return {
          ...state,
          createdUserMessage:payload
        }
      case HOMEPAGE:{
        return {
          ...state,
          cards:payload
        }
      }
    default:
      return { ...state };
  }
};

      



export default rootReducer;
