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
    default:
      return state;
  }
}
