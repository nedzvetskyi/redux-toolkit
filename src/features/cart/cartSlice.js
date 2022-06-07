import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const url = 'https://course-api.com/react-useReducer-cart-project'

export const fetchItems = createAsyncThunk('cart/fetchItems', async () => {
  try {
    const resp = await fetch(url)
    return await resp.json()
  } catch (err) {
    return err
  }
})

const initialState = {
  cartItems: [],
  amount: 1,
  total: 0,
  isLoading: true,
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    clearCart: (state) => {
      state.cartItems = []
    },
    removeItem: (state, action) => {
      const itemId = action.payload
      state.cartItems = state.cartItems.filter((item) => item.id !== itemId)
    },
    increase: (state, { payload: itemId }) => {
      const cartItem = state.cartItems.find((item) => item.id === itemId)
      cartItem.amount += 1
    },
    decrease: (state, { payload: itemId }) => {
      const cartItem = state.cartItems.find((item) => item.id === itemId)
      cartItem.amount -= 1
    },
    calculateTotal: (state) => {
      let amount = 0
      let total = 0
      state.cartItems.forEach((item) => {
        amount += item.amount
        total += item.price * item.amount
      })
      state.amount = amount
      state.total = total
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchItems.pending, (state, action) => {
      state.isLoading = true
    })
    builder.addCase(fetchItems.fulfilled, (state, action) => {
      state.cartItems = action.payload
      state.isLoading = false
    })
  },
})

export const { clearCart, removeItem, increase, decrease, calculateTotal } =
  cartSlice.actions
export default cartSlice.reducer
