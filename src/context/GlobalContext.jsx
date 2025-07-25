import { createContext, useReducer, useContext } from "react";

const GlobalContext = createContext();

const initialState = {
  favorites: [],
};

const reducer = (state, action) => {
  switch(action.type) {
    case "TOGGLE_FAVORITE":
      const exists = state.favorites.find(fav => fav.uid === action.payload.uid && fav.type === action.payload.type);
      return {
        ...state,
        favorites: exists
          ? state.favorites.filter(fav => !(fav.uid === action.payload.uid && fav.type === action.payload.type))
          : [...state.favorites, action.payload]
      };
    default:
      return state;
  }
};

export const GlobalProvider = ({ children }) => {
  const [store, dispatch] = useReducer(reducer, initialState);
  return (
    <GlobalContext.Provider value={{ store, dispatch }}>
      {children}
    </GlobalContext.Provider>
  );
};

// Named export for hook
export const useGlobalReducer = () => useContext(GlobalContext);
