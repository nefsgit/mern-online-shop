import styled from "styled-components";
import HeaderImg from '../assets/HeadPhones.webp';
import { HashLink } from 'react-router-hash-link';


const Header = () => {
  return (
    <StyledHeader>
        <div>
            <HeaderP>New In Stock</HeaderP>
            <h3>Headphones</h3>
            <h1>Big bass</h1>
            <HeaderImage src={HeaderImg} alt="Current Product" />

            <div>
                <HashLink smooth to="/#all-products"><button>Explore</button></HashLink>

                <Desc>
                    <h5>Promotion!</h5>
                    <p>From $50</p>
                </Desc>
            </div>
        </div>
    </StyledHeader>
  )
}

export default Header;

const StyledHeader = styled.div`
  padding: 100px 40px;
  background-color: #01010168;
  border-radius: 15px;
  position: relative;
  height: 500px;
  line-height: 0.9; 
  width: 100%;

  @media(max-width: 800px) {
        display: none;
    }

  button {
    border-radius: 15px;
    padding: 10px 16px;
    background-color: #f02d34;
    color: white;
    border: none;
    margin-top: 40px;
    font-size: 18px;
    font-weight: 500;
    cursor: pointer;
    z-index:10000 !important;
  }

  h3 {
    font-size: 4rem;
    margin-top: 4px;
  }

  h1 {
    color: white;
    font-size: 10em;
    margin-left: -20px;
    text-transform: uppercase;
    max-width: 100%;
  }
`;

const HeaderP = styled.p`
  font-size: 20px;
`;

const HeaderImage = styled.img`
    position: absolute;
    top: 0%;
    right:10%;
    max-width: 550px;
    max-height: 550px;
    border-radius: 10px;
`;

const Desc = styled.div`
    position: absolute;
    right: 10%;
    bottom: 5%;
    width: 300px;
    line-height: 1.3;
    display: flex;
    flex-direction: column;
    color: #9b050a;

    h5 {
        margin-bottom: 12px;
        font-weight: 700;
        font-size: 16px;
        align-self: flex-end;
    }

    p {
        color: #000000;
        font-weight: 400;
        text-align: end;
    }
`;