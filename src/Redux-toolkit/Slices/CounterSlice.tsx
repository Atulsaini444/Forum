import { createSlice } from '@reduxjs/toolkit'
const initialState = {
  amount: 0,
}
export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      state.amount += 1
    },
    decrement: (state) => {
      state.amount -= 1
    },
    addAmount: (state, action) => {
      state.amount += action.payload
    },
  },
})
export const { increment, decrement, addAmount } = counterSlice.actions
export default counterSlice.reducer
