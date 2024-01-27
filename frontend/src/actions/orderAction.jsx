import axios from "axios";
import { clearCartItems } from "./cartActions";
import {
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,
  ORDER_CREATE_RESET,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
} from "../constants/orderConstants";
import { API_ORDER_CREATE, API_ORDER_DETAILS } from "../constants/apiConstants";

export const createOrder = (order) => async (dispatch, getState) => {
  dispatch({ type: ORDER_CREATE_REQUEST, payload: order });
  try {
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.post(API_ORDER_CREATE, order, config);
    dispatch({ type: ORDER_CREATE_SUCCESS, payload: data });
    dispatch(clearCartItems());
  } catch (error) {
    dispatch({ type: ORDER_CREATE_FAIL, payload: error.response && error.response.data.detail ? error.response.data.detail : error.message });
  }
};

export const resetOrder = () => (dispatch) => {
  dispatch({ type: ORDER_CREATE_RESET });
};

export const getOrderDetails = (id) => async (dispatch, getState) => {
  dispatch({ type: ORDER_DETAILS_REQUEST, payload: id });
  try {
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get(`${API_ORDER_DETAILS}/${id}`, config);
    dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: ORDER_DETAILS_FAIL, payload: error.response && error.response.data.detail ? error.response.data.detail : error.message });
  }
};
