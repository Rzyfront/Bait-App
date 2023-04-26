
import { ORDER, RESET, CREATE_USER, HOMEPAGE, CHECKUSER, RESETUSER, GET_REVIEWS } from '../actions/actions';
import { POST_MENU, ERROR_DISH, SUCCESS_DISH, SUCCESS_MENU, ERROR_MENU, GET_MENU } from '../actions/menuDish';
import { SEARCH_BY_QUERY, SEARCH_BY_FILTERS, SAVE_SEARCH_HOME } from '../actions/cards';
import { DETAIL, SUCCESS, ERROR } from '../actions/local';
import { FOCO, UBICATIONDATA } from '../actions/ubication';
import { GET_ALL_USERS, GET_ALL_REVIEWS } from '../actions/admin';

const initialState = {
  cards: {},
  detail: [],
  error: '',
  errorDish: '',
  errorMenu: '',
  foco: { lat: null, lng: null },
  menu: [],
  newMenu: {},
  reset: [],
  reviews: [],
  searchName: { input: '', map: '' },
  success: null,
  successDish: null,
  successMenu: null,
  ubication: { lat: -34.60762000391614, lng: -58.381592, city: 'buenos aires', gps: false },
  user: {},
  users: {},
  adminReviews: {}
};

const rootReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case UBICATIONDATA:
      return {
        ...state,
        ubication: payload
      };

    case ORDER:
      return {
        ...state,
        reset: state.cards,
        cards: payload
      };
    case RESET:
      return {
        ...state,
        cards: state.reset
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
    case GET_MENU:
      return {
        ...state,
        menu: payload
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

    case GET_REVIEWS:
      return {
        ...state,
        reviews: [...state.reviews, ...payload]
      };
    case FOCO:
      return {
        ...state,
        foco: payload
      };
    case SAVE_SEARCH_HOME:
      return {
        ...state,
        searchName: payload
      };
    case SEARCH_BY_FILTERS:
      return {
        ...state,
        cards: payload
      };
    case GET_ALL_USERS:
      return {
        ...state,
        users: payload
      };
    case GET_ALL_REVIEWS:
      return {
        ...state,
        adminReviews: payload
      };
    default:
      return { ...state };
  }
};

export default rootReducer;
