import { PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_DETAILS_FAIL } from '../../constants/productConstants'

const initialState = { product: {}, loading: false, error: null }
export const productDetailReducer = (state = initialState, action) => {

    switch (action.type) {
        case PRODUCT_DETAILS_REQUEST:
            return { ...state, loading: true }
        case PRODUCT_DETAILS_SUCCESS:
            return { ...state, loading: false, product: action.payload }
        case PRODUCT_DETAILS_FAIL:
            return { ...state, loading: false, error: action.payload }
        default:
            return state
    }
}
