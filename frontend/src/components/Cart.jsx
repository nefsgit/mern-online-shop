import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { addToCart, decreaseCart, removeFromCart, getTotals, clearCart } from '../features/cartSlice';
import DeleteModal from './modals/DeleteModal';
import PayButton from './PayButton';

const Cart = () => {
  const cart = useSelector(state => state.cart)
  const dispatch = useDispatch();
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();
  const auth = useSelector(state => state.auth);

  useEffect(() => {
    dispatch(getTotals());
  }, [cart, dispatch])

  const handleRemoveFromCart = (cartItem) => {
    dispatch(removeFromCart(cartItem));
  }
  const handleDecreaseCart = (cartItem) => {
    dispatch(decreaseCart(cartItem));
  }
  const handleIncreaseCart = (cartItem) => {
    dispatch(addToCart(cartItem));
  }

  return (
    <CartContainer>
      <h2>Shopping Cart</h2>
      {cart.cartItems.length === 0 ? (
        <CartEmpty>
          <p>Your cart is currently empty.</p>
          <StartShopping>
            <Link to="/">
              <i className='bi bi-arrow-left' />
              <span>Start shopping</span>
            </Link>
          </StartShopping>
        </CartEmpty>
      ) : (
        <div>
          <Titles>
            <ProductTitle>Product</ProductTitle>
            <h3>Price</h3>
            <h3>Quantity</h3>
            <Total>Total</Total>
          </Titles>
          <div>
            {cart.cartItems?.map(cartItem => (
              <CartItem key={cartItem._id}>
                <CartProduct>
                  <img src={cartItem.image.url} alt={cartItem.name}
                  onClick={() => navigate(`/product/${cartItem._id}`)} />
                  <div>
                    <h3>{cartItem.name}</h3>
                    <p>{cartItem.description}</p>
                    <button onClick={() => handleRemoveFromCart(cartItem)}>Remove</button>
                  </div>
                </CartProduct>
                <div>
                  ${cartItem.price}
                </div>
                <CartProductQuantity>
                  <QuantityButton onClick={() => handleDecreaseCart(cartItem)}>-</QuantityButton>
                  <Count>{cartItem.cartQuantity}</Count>
                  <QuantityButton onClick={() => handleIncreaseCart(cartItem)}>+</QuantityButton>
                </CartProductQuantity>
                <ProductTotalPrice>
                  ${cartItem.price * cartItem.cartQuantity}
                </ProductTotalPrice>
              </CartItem>
            ))}
          </div>
          <CartSummary>
            <ClearCartButton onClick={() => setModalOpen(true)}>Clear Cart</ClearCartButton>
            <CartCheckout>
              <Subtotal>
                <span>Subtotal:</span>
                <SubtotalAmount>${cart.cartTotalAmount}</SubtotalAmount>
              </Subtotal>
              <p>Taxes and shipping calculated at checkout</p>
              {auth._id ? <PayButton cartItems={cart.cartItems} /> :
              <CheckoutLoginButton onClick={() => navigate("/login")}>Login to checkout</CheckoutLoginButton>}
              
              <ContinueShopping>
                <Link to="/">
                  <i className='bi bi-arrow-left' />
                  <span>Continue shopping</span>
                </Link>
              </ContinueShopping>
            </CartCheckout>
          </CartSummary>
          {modalOpen && <DeleteModal setModal={setModalOpen} message={'Are you sure you want to remove all the items from your cart?'} dispatchFunc={clearCart} />}
        </div>
      )}
    </CartContainer>
  )
}

export default Cart;

const CartContainer = styled.div`
  padding: 2rem 4rem;

  h2 {
    font-weight: 400;
    font-size: 30px;
    text-align: center;
  }
`;

const CartEmpty = styled.div`
  font-size: 20px;
  margin-top: 2rem;
  color: rgb(84, 84, 84);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StartShopping = styled.div`
  margin-top: 1rem;

  i {
    width: 20px;
    height: 20px;
    margin-bottom: 9px;
  }

  a {
    color: gray;
    text-decoration: none;
    display: flex;
    align-items: center;
  }

  span {
    margin-left: 0.5rem;
  }
`;

const Titles = styled.div`
  margin: 2rem 0 1rem 0;
  display: grid;
  align-items: center;
  grid-template-columns: 3fr 1fr 1fr 1fr;
  column-gap: 0.5rem;

  h3 {
    font-size: 14px;
    font-weight: 500;
    text-transform: uppercase;
    @media(max-width:800px) {
      display: none;
    }
  }
`;

const ProductTitle = styled.h3`
  padding-left: 0.5rem;
`;

const Total = styled.h3`
  padding-right: 0.5rem;
  justify-self: right;
`;

const CartItem = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 3fr 1fr 1fr 1fr;
  column-gap: 0.5rem;
  border-top: 1px solid rgb(187, 187, 187);
  padding: 1rem 0;

  @media(max-width:800px) {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
`;

const CartProduct = styled.div`
  display: flex;

  img {
    width: 100px;
    max-width: 100%;
    margin-right: 1rem;
    cursor: pointer;
  }

  h3 {
    font-weight: 400;
  }

  button {
    border: none;
    outline: none;
    margin-top: 0.7rem;
    cursor: pointer;
    background: none;
    color: gray;

    &:hover {
      color: black;
      transform: scale(1.2);
    }
  }
`;

const CartProductQuantity = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  width: 130px;
  max-width: 100%;
  border: 0.5px solid rgb(177, 177, 177);
  border-radius: 5px;
`;

const QuantityButton = styled.button`
  border: none;
  outline: none;
  background: none;
  padding: 0.7rem 1.5rem;
  cursor: pointer;
  &:hover {
    color: black;
    transform: scale(1.5);
  }
  &:active {
    transform: scale(0.7);
  }
`;

const Count = styled.div`
  padding: 0.7rem 0;
`;

const ProductTotalPrice = styled.div`
  justify-self: right;
  padding-right: 0.5rem;
  font-weight: 700;
`;

const CartSummary = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  border-top: 1px solid rgb(187, 187, 187);
  padding-top: 2rem;
  @media(max-width:800px) {
    gap: 1rem;
  }
`;

const ClearCartButton = styled.button`
  width: 130px;
  max-width: 100%;
  height: 40px;
  border-radius: 5px;
  font-weight: 400;
  letter-spacing: 1.15px;
  border: 1px solid rgb(187, 187, 187);
  color: gray;
  background: none;
  outline: none;
  cursor: pointer;

  &:hover {
    border: 1px solid rgb(68, 68, 68);
    color: rgb(68, 68, 68);
  }
`;

const CartCheckout = styled.div`
  width: 270px;
  max-width: 100%;

  p {
    font-size: 14px;
    font-weight: 200;
    margin: 0.5rem 0;
  }
`;

const Subtotal = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 20px;
`;

const SubtotalAmount = styled.span`
  font-weight: 700;
`;

const CheckoutLoginButton = styled.button`
  width: 100%;
  height: 40px;
  border-radius: 5px;
  font-weight: 400;
  border: none;
  outline: none;
  cursor: pointer;
  background-color: #cab705;
  color: white;
  letter-spacing: 1.15px;

  &:hover {
    background-color: #f8e112;
  }
`;

const ContinueShopping = styled.div`
  margin-top: 1rem;

  a {
    color: gray;
    text-decoration: none;
    display: flex;
    align-items: center;

    span {
      margin-left: 0.5rem;
    }
  }
`;