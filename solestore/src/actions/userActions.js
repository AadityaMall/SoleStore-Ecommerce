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
} from "../constants/userConstant";
import axios from "axios";

//login
export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });
    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.post(
      `/api/v1/login`,
      { email, password },
      config
    );
    dispatch({ type: LOGIN_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({ type: LOGIN_FAIL, payload: error.response.data.message });
  }
};

//Register
export const register = (userData) => async (dispatch) => {
  try {
    dispatch({ type: REGISTER_REQUEST });
    const config = { headers: { "Content-Type": "multipart/form-data" } };
    const { data } = await axios.post(`/api/v1/register`, userData, config);
    dispatch({ type: REGISTER_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({ type: REGISTER_FAIL, payload: error.response.data.message });
  }
};

//Load User
export const loadUser = () => async (dispatch) => {
  try {
    dispatch({ type: USERLOAD_REQUEST });
    const { data } = await axios.get(
      `/api/v1/me`,
    );
    dispatch({ type: USERLOAD_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({ type: USERLOAD_FAIL, payload: error.response.data.message });
  }
};

//Clearing the errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
