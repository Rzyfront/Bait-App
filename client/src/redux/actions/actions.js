import axios from 'axios';
/// ///names/////////////
export const ORDER = 'ORDER';
export const RESET = 'RESET';
export const SEARCH_BY_QUERY = 'SEARCH_BY_QUERY';
export const DETAIL = 'DETAIL';
export const LOGIN = 'LOGIN';
export const COMENTARIE = 'COMENTARIE';
export const CREATE_USER = 'CREATE_USER';
export const HOMEPAGE = 'HOMEPAGE';

/// ///////actions////////////////////////////
export const reset = () => {
  return {
    type: RESET,
    payload: ''
  };
};
/// loadinglocals

/// Create user
export const createUser = ({ name, lastname, age, phone_number, email, password, location, verified, isActive, role }) => {
  return async (dispatch) => {
    try {
      await axios.post('http://localhost:3001/user', {
        name,
        lastname,
        age: Number(age),
        phone_number,
        email,
        password,
        location,
        verified,
        isActive,
        role
      });
      return dispatch({ type: CREATE_USER, payload: 'Usuario Creado Correctamente' });
    } catch (error) {
      console.log(error);
      console.log(error.message);
    }
  };
};
// Detail id
export const DetailLocal = (id) => {
  return async dispatch => {
    try {
      const datos = await axios.get(`/locals/${id}`);
      dispatch({
        type: DETAIL,
        payload: datos.data
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};

// correguir imagen cuando este listo la ruta
export const createLocal = (inputs, chekinputs) => {
  const images = [];
  inputs.imagen.forEach(data => {
    images.push({ id: data.id });
  });
  return async dispatch => {
    try {
      await axios.post('/locals', {
        name: inputs.name,
        location: inputs.location,
        schedule: inputs.schedule,
        email: inputs.email,
        images,
        characteristics: {
          wifi: chekinputs.wifi,
          parking_lot: chekinputs.parking_lot,
          outdoor_seating: chekinputs.outdoor_seating,
          live_music: chekinputs.live_music,
          table_service: chekinputs.table_service,
          family_style: chekinputs.family_style,
          romantic: chekinputs.romantic,
          big_group: chekinputs.big_group,
          work_friendly: chekinputs.work_friendly,
          pet_friendly: chekinputs.pet_friendly
        }
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};

// order and filters and cards
export const order = (data, actions) => {
  console.log(data);
  const datas = data.flat();
  switch (actions) {
    case 'best':
      for (let j = 0; j < datas.length; j++) {
        for (let i = 0; i < datas.length - 1; i++) {
          if (datas[i + 1].rating > datas[i].rating) {
            const auxiliar = datas[i];
            datas[i] = datas[i + 1];
            datas[i + 1] = auxiliar;
          }
        }
      }
      return {
        type: ORDER,
        payload: datas
      };
    case 'A-Z':
      const az = datas.sort((a, b) => a.name.localeCompare(b.name));
      return {
        type: ORDER,
        payload: az
      };
    case 'Z-A':
      const za = datas.sort((a, b) => b.name.localeCompare(a.name));
      return {
        type: ORDER,
        payload: za
      };

    default:
      break;
  }
  // adgorithm aordering
};
export const searchByQuery = (name, city) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`/locals?name=${name}&location=${city}`);
      const info = response.data;
      return dispatch({ type: SEARCH_BY_QUERY, payload: info });
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const logIn = (credentials) => {
  console.log('haciendo dispatch');
  return async (dispatch) => {
    const res = await axios.post('/login', credentials);
    return dispatch({
      type: LOGIN,
      payload: res.data
    });
  };
};

export const comentarie = (calificationFood, calificationQaPrice, calificationEnvironment, calificationService, calculateAverage, inputs, id, token) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(`/reviews/${id}`, {
        title: inputs.title,
        rating: calculateAverage,
        comment: inputs.comment,
        image: inputs.image,
        food: calificationFood,
        service: calificationService,
        environment: calificationEnvironment,
        qaPrice: calificationQaPrice
      }, {
        headers: {
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imp1YW5jYW1pbG8xNDc4QGdtYWlsLmNvbSIsImlkIjoxLCJyb2xlIjoidXNlciIsInZlcmlmaWVkIjoidmVyaWZpZWQiLCJpYXQiOjE2ODE4NDQ1NTV9.EhvevCRgCT38ujSsKwOJTvrQbX8knXalLItzj71HJto', // Aquí agregas tu header personalizado
          'Content-Type': 'application/json' // También puedes agregar otros headers estándar
        }
      });
      console.log(response.data); // Aquí puedes hacer algo con la respuesta del servidor
    } catch (error) {
      console.log(error);
    }
  };
};
/// / home pages
export const homepage = (id) => {
  return async dispatch => {
    try {
      const response = await axios.get(`/locals/page/${id}`);
      dispatch({
        type: HOMEPAGE,
        payload: response.data
      });
    } catch (error) {
      console.log(error.message);
    };
  };
};
