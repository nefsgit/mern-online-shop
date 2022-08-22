import { useEffect } from 'react';
import { useDispatch , useSelector} from 'react-redux';
import { clearCartNoToast, getTotals } from '../features/cartSlice';
import { useNavigate } from 'react-router-dom';

const PreCheckout = () => {
  const cart = useSelector(state => state.cart)
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if(cart.cartItems.length > 0) {
        localStorage.removeItem("cartItems");
        dispatch(clearCartNoToast());
        dispatch(getTotals())
        navigate("/checkout-success");
      } else {
        navigate("/checkout-success");
      }
  }, [cart, dispatch, navigate])
  
  
  

  return (
    <></>
  )
}

export default PreCheckout;