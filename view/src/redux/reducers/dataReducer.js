const initialState = {
  categories: [],
  category: {},
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
      };
    default:
      return state;
  }
}
