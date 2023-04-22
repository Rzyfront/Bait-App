
import { ORDER, RESET, SEARCH_BY_QUERY, DETAIL, CREATE_USER, HOMEPAGE, SUCCESS, ERROR, SUCCESS_RESET, ERROR_RESET, CHECKUSER, RESETUSER, SEARCH_BY_FILTERS } from '../actions/actions';

const initialState = {
  cards: [],
  reset: [],
  detail: [],
  success: null,
  error: '',
  user: {},
  filters: {},
  totalPages: ''
};
const rootReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ORDER:
      return {
        ...state,
        filters: payload
      };
    case RESET:
      return {
        ...state,
        cards: { ...state, cards: { ...state.cards, filters: payload } }
      };
    case SEARCH_BY_QUERY:
      return {
        ...state,
        cards: payload
      };
    case DETAIL:
      return {
        ...state,
        detail: payload
      };
    case CREATE_USER:
      return {
        ...state,
        createdUserMessage: payload
      };
    case HOMEPAGE:
      return {
        ...state,
        cards: payload
      };
    case SUCCESS:
      return {
        ...state,
        success: payload
      };
    case SUCCESS_RESET:
      return {
        ...state,
        success: null
      };
    case ERROR:
      return {
        ...state,
        error: payload
      };
    case ERROR_RESET:
      return {
        ...state,
        error: null
      };

    case CHECKUSER:
      return {
        ...state,
        user: payload
      };
    case RESETUSER:
      return {
        ...state,
        user: {}
      };
    case SEARCH_BY_FILTERS:
      return {
        ...state,
        cards: payload.locals,
        filters: payload.filters,
        totalPages: payload.totalPages
      };
    default:
      return { ...state };
  }
};

export default rootReducer;
