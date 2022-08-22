import styled from "styled-components";
import firework from '../assets/Firework.mp4';
import { useNavigate } from 'react-router-dom';

const CheckoutSuccess = () => {

  const navigate = useNavigate();

  return (
    <SuccessDiv>
        <h2>Order placed!</h2>
        <h3>Your products will be with you soon</h3>
        <p onClick={() => navigate('/my-orders')}>View your orders</p>
        <FireworkVideo 
          src={firework}
          type="video/mp4"
          loop
          controls={false}
          muted
          autoPlay
        />
    </SuccessDiv>
  )
}

export default CheckoutSuccess;

const SuccessDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: rgb(0, 0, 0);
  min-height: 80vh;

  h2 {
    margin-top: 2rem;
    margin-left: auto;
    margin-right: auto;
    text-align: center;
    font-size: 50px;

    @media(max-width: 800px) {
      font-size: 25px;
    }
  }

  p {
    color: #059411;
    cursor: pointer;
    margin-top: 1rem;
    font-size: 20px;
    font-weight: 500;
  }

  img {
    max-width: 45%;
    border-radius: 50%;

    @media(max-width: 800px) {
      max-width: 90%;
    }
  }
`;

const FireworkVideo = styled.video`

  position: fixed;
  right: 0;
  bottom: 0;
  min-width: 100%;
  min-height: 100%;
  z-index: -1;
  
  @media(max-width: 1000px) {
    max-height: 100%;
  }
`;