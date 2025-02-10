import {
  CHECK_IF_SUBSCIRBED,
} from "../constants/newsLetterConstants";

export const newsLetterReducer = (state = {}, action) => {
  switch (action.type) {
    case CHECK_IF_SUBSCIRBED:
      return {
        ...state,
        subscriptionStatus: action.payload,
      };

    default:
      return state;
  }
};
