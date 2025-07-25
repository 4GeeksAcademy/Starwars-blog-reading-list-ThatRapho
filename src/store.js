export const initialStore=()=>{
  return{
    favorites: [],
    message: null,
    todos: [
      {
        id: 1,
        title: "Make the bed",
        background: null,
      },
      {
        id: 2,
        title: "Do my homework",
        background: null,
      }
    ]
  }
}

export default function storeReducer(store, action = {}) {
  switch (action.type) {
    case "TOGGLE_FAVORITE":
      const exists = state.favorites.find(
        fav => fav.uid === action.payload.uid && fav.type === action.payload.type
      );
      return {
        ...state,
        favorites: exists
          ? state.favorites.filter(
              fav => !(fav.uid === action.payload.uid && fav.type === action.payload.type)
            )
          : [...state.favorites, action.payload]
      };

    default:
      return state;
  }
}