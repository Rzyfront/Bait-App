import { ORDER, RESET, SEARCH_BY_QUERY } from "../actions/actions";

const initialState = {
  cards: [
    [
      { Name: "Mc Donalls", Location: "Buenos Aires", Rating: 4.2 },
      { Name: "BurgerKing", Location: "Buenos Aires", Rating: 4.3 },
      { Name: "Milanesas jons", Location: "Buenos Aires", Rating: 4.8 },
      { Name: "Asados El boludo", Location: "Santafe", Rating: 5 },
      { Name: "Boldmaunt", Location: "Buenos Aires", Rating: 3.2 },
      { Name: "La esquida del sabor", Location: "Buenos Aires", Rating: 2.1 },
    ],
    [
      { Name: "pechugotas", Location: "Buenos Aires", Rating: 3.0 },
      { Name: "cocora", Location: "Buenos Aires", Rating: 1 },
      { Name: "Periquito", Location: "Buenos Aires", Rating: 2.5 },
      { Name: "Asados El pendejo", Location: "Santafe", Rating: 1.5 },
      { Name: "casaquistan", Location: "Buenos Aires", Rating: 5 },
      { Name: "asado doña florinda", Location: "Buenos Aires", Rating: 4.5 },
    ],

    [
      { Name: "Tacos Al Pastor", Location: "Santafe", Rating: 4.8 },
      { Name: "El Rincón de la Empanada", Location: "Santafe", Rating: 3.5 },
      { Name: "Ceviche Peruvian", Location: "Buenos Aires", Rating: 4.2 },
      { Name: "The Burger Joint", Location: "Santafe", Rating: 4.6 },
      { Name: "La Parrilla de Don Juan", Location: "Santafe", Rating: 4.7 },
      { Name: "Pizzería La Nonna", Location: "Santafe", Rating: 4.1 },
    ],

    [
      { Name: "El Gran Asado", Location: "Buenos Aires", Rating: 4.7 },
      { Name: "La Casa del Taco", Location: "Buenos Aires", Rating: 4.1 },
      { Name: "Sabor Criollo", Location: "Buenos Aires", Rating: 4.4 },
      { Name: "Pizzería Italiana", Location: "Santafe", Rating: 4.5 },
      {
        Name: "El Rey de las Milanesas",
        Location: "Buenos Aires",
        Rating: 4.9,
      },
      { Name: "Mariscos del Pacífico", Location: "Buenos Aires", Rating: 4.2 },
    ],

    [
      {
        Name: "La Parrilla del Charrúa",
        Location: "Buenos Aires",
        Rating: 4.7,
      },
      { Name: "El Rincón del Sándwich", Location: "Buenos Aires", Rating: 4.1 },
      { Name: "Asados Argentinos", Location: "Buenos Aires", Rating: 4.5 },
      { Name: "La Pizzería del Centro", Location: "Santafe", Rating: 4.3 },
      { Name: "Los Tacos del Barrio", Location: "Buenos Aires", Rating: 4.2 },
      { Name: "Cevichería del Mar", Location: "Santafe", Rating: 4.6 },
    ],
    [
      {
        Name: "El Fogón de la Patagonia",
        Location: "Buenos Aires",
        Rating: 4.9,
      },
      { Name: "La Fonda Mexicana", Location: "Buenos Aires", Rating: 4.3 },
      { Name: "Burgers & Beers", Location: "Buenos Aires", Rating: 4.5 },
      { Name: "La Pizzería del Parque", Location: "Santafe", Rating: 4.2 },
      {
        Name: "Las Milanesas de la Nonna",
        Location: "Buenos Aires",
        Rating: 4.7,
      },
      { Name: "Mariscos del Atlántico", Location: "Buenos Aires", Rating: 4.1 },
    ],
    [
      {
        Name: "La Parrilla del Charrúa",
        Location: "Buenos Aires",
        Rating: 4.7,
      },
      { Name: "El Rincón del Sándwich", Location: "Buenos Aires", Rating: 4.1 },
      { Name: "Asados Argentinos", Location: "Buenos Aires", Rating: 4.5 },
      { Name: "La Pizzería del Centro", Location: "Santafe", Rating: 4.3 },
      { Name: "Los Tacos del Barrio", Location: "Buenos Aires", Rating: 4.2 },
      { Name: "Cevichería del Mar", Location: "Santafe", Rating: 4.6 },
    ],
  ],
  tipe: ["italiano", "peruana", "mexicana", "mar", "comida rapida", "bar"],
  reset: [],
};

//action paginate
const paginate = (data) => {
  const size = 6;
  let newarray = [];
  for (var i = 0; i < data.length; i += size) {
    const oneDate = data.slice(i, i + size);
    newarray.push(oneDate);
  }
  return newarray;
};

const rootReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ORDER:
      const newdata = paginate(payload);
      return {
        ...state,
        reset: state.cards,
        cards: newdata,
      };
    case RESET:
      return {
        ...state,
        cards: state.reset,
      };
    case SEARCH_BY_QUERY:
      return {
        ...state,
        cards: payload
      }

    default:
      return { ...state };
  }
};
export default rootReducer;
