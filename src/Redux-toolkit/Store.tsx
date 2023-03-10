import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './Slices/CounterSlice'
const store = configureStore({
  reducer: { counterReducer },
})
export default store
