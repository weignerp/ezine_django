import { combineReducers } from 'redux'

// import todosReducer from './features/todos/todosSlice'
// import filtersReducer from './features/filters/filtersSlice'
import { productListReducer } from './features/loaders/productListReducer'
import { productDetailReducer } from './features/loaders/productDetailReducer'
import cartReducer from './features/loaders/cartReducers'
import { userDetailsReducer, userLoginReducer, userRegisterReducer, userUpdateProfileReducer } from './features/loaders/userReducer'
import { orderCreateReducer, orderDetailsReducer } from './features/loaders/orderReducer'

const rootReducer = combineReducers({
    // Define a top-level state field named `todos`, handled by `todosReducer`
    // todos: todosReducer,
    // filters: filtersReducer,
    products: productListReducer,
    product: productDetailReducer,
    cart: cartReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer
})

export default rootReducer