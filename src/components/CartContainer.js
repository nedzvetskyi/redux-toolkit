import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchItems, calculateTotal } from '../features/cart/cartSlice'
import { openModal } from '../features/modal/modalSlice'
import CartItem from './CartItem'
import Loading from './Loading'

const CartContainer = () => {
  const { cartItems, amount, total, isLoading } = useSelector(
    (store) => store.cart
  )
  const dispatch = useDispatch()

  useEffect(() => {
      dispatch(fetchItems())
    }, [])

    useEffect(() => {
      dispatch(calculateTotal())
    }, [cartItems])

  if (isLoading) {
    return (
      <section className='cart'>
        <header>
          <h2>your bag</h2>
        </header>
        <div>
          <Loading />
        </div>
      </section>
    )
  }

  if (amount < 1) {
    return (
      <section className='cart'>
        {/* cart header */}
        <header>
          <h2>your bag</h2>
          <h4 className='empty-cart'>is currently empty</h4>
        </header>
      </section>
    )
  }

  return (
    <section className='cart'>
      {/* cart header */}
      <header>
        <h2>your bag</h2>
      </header>
      {/* cart items */}
      <div>
        {cartItems.map((item) => {
          return <CartItem key={item.id} {...item} />
        })}
      </div>
      {/* cart footer */}
      <footer>
        <hr />
        <div className='cart-total'>
          <h4>
            total <span>${total.toFixed(2)}</span>
          </h4>
        </div>
        <button className='btn clear-btn' onClick={() => dispatch(openModal())}>
          clear cart
        </button>
      </footer>
    </section>
  )
}

export default CartContainer
