import styled from "styled-components";
import { useState, useEffect } from "react";
import FooterProduct from "./FooterProduct";
import { SpinnerDiv } from "../global_styles/GlobalStyles.styled";
import Spinner from "./Spinner";
import { getData } from "../features/functions";

const Footer = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
  
    useEffect(() => {
      getData('products/latest', setProducts, setLoading);
    }, [])

  return (
    <LatestProductsDiv>
        <h2>Latest</h2>
        {loading ? <SpinnerDiv>
          <Spinner message='Loading products' />
        </SpinnerDiv> :
        <Marquee>
            <Track>
                {products && products.map((product, i) => (
                    <FooterProduct product={product} key={i} />
                ))}
            </Track>
        </Marquee>
        }
    </LatestProductsDiv>
  )
}

export default Footer;

const LatestProductsDiv = styled.div`
    margin-top: 3rem;

    h2 {
        font-size: 40px;
        font-weight: 600;
        text-align: center;
        margin-top: 2rem;
    }
`;

const Marquee = styled.div`
    position: relative;
    height: 400px;
    width: 100%;
    overflow-x: hidden;
`;

const Track = styled.div`
    @keyframes bannermove {
    0% {
        margin-left: 0px;
    }
    100% {
        margin-left: -1767px;
    }

    }

    display: flex;
    justify-content: center;
    gap: 15px;
    margin-top: 20px;
    animation: bannermove 30s linear infinite;
    width: 2650px;

    &:hover {
        animation-play-state: paused;
    }
`;