const initialState = {
  categories: [],
  category: [],
  row: {},
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case "LOADING_DATA":
      return {
        ...state,
        loading: true,
      };
    case "SET_CATEGORIES":
      return {
        ...state,
        // could cause error
        categories: action.payload,
        loading: false,
      };
    case "SET_CATEGORY":
      return {
        ...state,
        category: action.payload,
        loading: false,
      };
    case "SET_ROW":
      return {
        ...state,
        row: action.payload,
        loading: false,
      };
    case "POST_ROW":
      return {
        ...state,
        category: [action.payload, ...state.category],
      };
    case "EDIT_ROW":
      return Object.assign({}, state, {
        category: state.category.map((row) => {
          return row.rowId === action.payload.rowId ? action.payload : row;
        }), // replace matched item and returns the array
      });
    case "DELETE_ROW":
      return {
        ...state,
        category: state.category.filter((row) => row.rowId !== action.payload),
      };
    default:
      return state;
  }
}
