import axios from "axios";
import { PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_LIST_FAIL } from "../constants/productConstants";
import { API_PRODUCT_LIST } from '../constants/apiConstants';

/**
 * Fetches the product request.
 *
 * @return {Object} The product list request.
 */
const fetchProductRequest = () => {
    return ({

        type: PRODUCT_LIST_REQUEST

    });
};
/**
 * Fetches the product list successfully.
 *
 * @param {Array} products - The list of products fetched.
 * @return {Object} - An action object with the type `PRODUCT_LIST_SUCCESS` and the payload as the list of products.
 */
const fetchProductSuccess = (products) => {
    return ({

        type: PRODUCT_LIST_SUCCESS,
        payload: products

    });
};

/**
 * Create an action to handle a failed product fetch.
 *
 * @param {Error} error - The error object that occurred during the fetch.
 * @return {Object} An action object with the type "PRODUCT_LIST_FAIL" and the error payload.
 */
const fetchProductFail = (error) => {
    return ({

        type: PRODUCT_LIST_FAIL,
        payload: error.response && error.response.data.detail ? error.response.data.detail : error.message

    });
}

/**
 * Executes an asynchronous action to fetch a list of products.
 *
 * @param {function} dispatch - A function to dispatch Redux actions.
 * @returns {Promise} A Promise that resolves when the action is completed.
 */
export const listProductAction = () => async (dispatch) => {
    try {
        dispatch(fetchProductRequest());
        const { data } = await axios.get(API_PRODUCT_LIST);
        dispatch(fetchProductSuccess(data));
    } catch (error) {
        dispatch(fetchProductFail(error));
    }
}
