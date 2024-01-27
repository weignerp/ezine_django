const initialState = {
  status: "All",
  colors: [],
};

const STATUS_FILTER_CHANGED = "filters/statusFilterChanged";
export default function filtersReducer(state = initialState, action) {
  switch (action.type) {
    case STATUS_FILTER_CHANGED: {
      return {
        // Again, one less level of nesting to copy
        ...state,
        status: action.payload,
      };
    }
    default:
      return state;
  }
}
