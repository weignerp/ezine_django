import { PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_LIST_FAIL } from '../../constants/productConstants'

export const productListReducer = (state = { loading: false, error: null, products: [] }, action) => {
    switch (action.type) {
        case PRODUCT_LIST_REQUEST:
            return { ...state, loading: true, products: [] }
        case PRODUCT_LIST_SUCCESS:
            return { ...state, loading: false, products: action.payload }
        case PRODUCT_LIST_FAIL:
            return { ...state, loading: false, products: [], error: action.payload }
        default:
            return state
    }
}