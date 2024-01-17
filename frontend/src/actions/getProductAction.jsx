import axios from "axios";
import { PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_DETAILS_FAIL } from "../constants/productConstants";
import { API_PRODUCT_DETAILS } from '../constants/apiConstants';

const fetchProductRequest = () => {

    return ({ type: PRODUCT_DETAILS_REQUEST });
};

const fetchProductSuccess = (product) => {

    return ({ type: PRODUCT_DETAILS_SUCCESS, payload: product });
};

const fetchProductFail = (error) => {
    return ({
        type: PRODUCT_DETAILS_FAIL,
        payload: error.reponse && error.response.data.detail ? error.response.data.detail : error.message
    });
};

export const getProductAction = (id) => async (dispatch) => {

    try {
        dispatch(fetchProductRequest());
        const { data } = await axios.get(`${API_PRODUCT_DETAILS}/${id}`);
        dispatch(fetchProductSuccess(data));
    } catch (error) {
        dispatch(fetchProductFail(error));
    }
}