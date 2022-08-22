import styled from 'styled-components';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const PayButton = ({cartItems}) => {

  const user = useSelector((state) => state.auth)
  const handleCheckout = () => {
    axios.post(`${process.env.REACT_APP_API_URL}/stripe/create-checkout-session`, {
        cartItems,
        userId: user._id
    }).then((res) => {
        if(res.data.url) {
            window.location.href = res.data.url
        }
    }).catch((err) => {
      toast.error('Oops. Something went wrong. Please try again later.', {
        position: "bottom-left",
        autoClose: 2500,
      });
    })
      
  }

  return (
    <>
        <CheckoutButton onClick={() => handleCheckout()}>
            Checkout
        </CheckoutButton>
    </>
  )
}

export default PayButton;

const CheckoutButton = styled.button`
  width: 100%;
  height: 40px;
  border-radius: 5px;
  font-weight: 400;
  border: none;
  outline: none;
  cursor: pointer;
  background-color: #1fa504;
  color: white;
  letter-spacing: 1.15px;
`;