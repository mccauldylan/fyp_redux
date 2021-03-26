// import {
//     SET_USER,

//     SET_AUTHENTICATED,
//     SET_UNAUTHENTICATED} from '../types'

const initialState = {
  authenticated: false,
  credentials: {},
  approves: [],
  disapproves: [],
  notApplicables: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case "SET_AUTHENTICATED":
      return {
        ...state,
        authenticated: true,
      };
    case "SET_UNAUTHENTICATED":
      return initialState;
    case "SET_USER":
      return {
        authenticated: true,
        loading: false,
        credentials: action.payload.credentials,
        approves: action.payload.approves,
        disapproves: action.payload.disapproves,
        notApplicables: action.payload.notApplicables,
      };
    case "LOADING_USER":
      return {
        ...state,
        loading: true,
      };
    case "APPROVE_ROW":
      return {
        ...state,
        approves: [
          ...state.approves,
          {
            username: state.credentials.username,
            rowId: action.payload.rowId,
          },
        ],
      };
    case "DISAPPROVE_ROW":
      return {
        ...state,
        disapproves: [
          ...state.disapproves,
          {
            username: state.credentials.username,
            rowId: action.payload.rowId,
          },
        ],
      };
    case "NOT_APPLICABLE_ROW":
      return {
        ...state,
        notApplicables: [
          ...state.notApplicables,
          {
            username: state.credentials.username,
            rowId: action.payload.rowId,
          },
        ],
      };

    case "UNDO_NOT_APPLICABLE_ROW":
      return {
        ...state,
        notApplicables: state.notApplicables.filter(
          (notApplicable) => notApplicable.rowId !== action.payload.rowId
        ),
      };

    case "UNAPPROVE_ROW":
      return {
        ...state,
        approves: state.approves.filter(
          (approve) => approve.rowId !== action.payload.rowId
        ),
      };
    case "UNDODISAPPROVE_ROW":
      return {
        ...state,
        disapproves: state.disapproves.filter(
          (disapprove) => disapprove.rowId !== action.payload.rowId
        ),
      };

    default:
      return state;
  }
}
