import {
  LOGIN_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  CLEAR_ERRORS,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  REGISTER_REQUEST,
  USERLOAD_REQUEST,
  USERLOAD_FAIL,
  USERLOAD_SUCCESS,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
  USERUPDATE_SUCCESS,
  USERUPDATE_REQUEST,
  USERUPDATE_FAIL,
  USERUPDATE_RESET,
  UPDATE_PASSWORD_FAIL,
  UPDATE_PASSWORD_REQUEST,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_RESET,
  FORGOT_PASSWORD_FAIL,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAIL,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  ALL_USERS_FAIL,
  ALL_USERS_REQUEST,
  ALL_USERS_SUCCESS,
  USER_DETAIL_FAIL,
  USER_DETAIL_REQUEST,
  USER_DETAIL_SUCCESS,
  USER_DELETE_FAIL,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  ADMIN_USER_UPDATE_FAIL,
  ADMIN_USER_UPDATE_REQUEST,
  ADMIN_USER_UPDATE_SUCCESS,
  ADMIN_USER_UPDATE_RESET,
  USER_DELETE_RESET,
} from "../constants/userConstant";
export const userReducer = (state = { user: [] }, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
    case REGISTER_REQUEST:
    case USERLOAD_REQUEST:
      return {
        loading: true,
        isAuthenticated: false,
      };
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
    case USERLOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload,
      };
    case LOGOUT_SUCCESS:
      return {
        loading: false,
        user: null,
        isAuthenticated: false,
      };
    case LOGOUT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case LOGIN_FAIL:
    case REGISTER_FAIL:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        user: null,
        error: action.payload,
      };
    case USERLOAD_FAIL:
      return {
        loading: false,
        user: null,
        isAuthenticated: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
export const profileReducer = (state = {}, action) => {
  switch (action.type) {
    case USERUPDATE_REQUEST:
    case UPDATE_PASSWORD_REQUEST:
    case ADMIN_USER_UPDATE_REQUEST:
    case USER_DELETE_REQUEST:
      return {
        loading: true,
        ...state,
      };
    case USERUPDATE_SUCCESS:
    case UPDATE_PASSWORD_SUCCESS:
    case ADMIN_USER_UPDATE_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };
    case USER_DELETE_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload.success,
        message:action.payload.message
      };
    case USERUPDATE_FAIL:
    case UPDATE_PASSWORD_FAIL:
    case ADMIN_USER_UPDATE_FAIL:
    case USER_DELETE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case USERUPDATE_RESET:
    case UPDATE_PASSWORD_RESET:
    case ADMIN_USER_UPDATE_RESET:
      return {
        ...state,
        isUpdated: false,
      };
    case USER_DELETE_RESET:
      return {
        ...state,
        isDeleted: false,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
export const forgotPasswordReducer = (state = {}, action) => {
  switch (action.type) {
    case FORGOT_PASSWORD_REQUEST:
    case RESET_PASSWORD_REQUEST:
      return {
        loading: true,
        ...state,
        error: null,
      };
    case FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        message: action.payload,
      };
    case RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        success: action.payload,
      };
    case FORGOT_PASSWORD_FAIL:
    case RESET_PASSWORD_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
export const allUsersReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case ALL_USERS_REQUEST:
      return {
        loading: true,
        ...state,
      };

    case ALL_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        users: action.payload,
      };
    case ALL_USERS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
export const userDetailsReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case USER_DETAIL_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case USER_DETAIL_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload,
      };

    case USER_DETAIL_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};
