
import {
  ORDER,
  RESET,
  CREATE_USER,
  HOMEPAGE,
  CHECKUSER,
  RESETUSER,
  POST_MENU,
  ERROR_DISH,
  SUCCESS_DISH,
  SUCCESS_MENU,
  ERROR_MENU,
  SEARCH_BY_FILTERS
} from '../actions/actions';
import { SEARCH_BY_QUERY } from '../actions/cards';
import { DETAIL, SUCCESS, ERROR } from '../actions/local';

const initialState = {
  cards: [],
  reset: [],
  detail: [],
  success: null,
  error: '',
  user: {},
  filters: {},
  totalPages: '',
  successMenu: null,
  errorMenu: '',
  successDish: null,
  errorDish: '',
  newMenu: {},
  menu: []
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
    case ERROR:
      return {
        ...state,
        error: payload
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
    case POST_MENU:
      return {
        ...state,
        newMenu: payload
      };
    case SUCCESS_MENU:
      return {
        ...state,
        successMenu: payload
      };
    case ERROR_MENU:
      return {
        ...state,
        errorMenu: payload
      };
    case SUCCESS_DISH:
      return {
        ...state,
        successDish: payload
      };
    case ERROR_DISH:
      return {
        ...state,
        errorDish: payload

      };
    default:
      return { ...state };
  }
};

export default rootReducer;
