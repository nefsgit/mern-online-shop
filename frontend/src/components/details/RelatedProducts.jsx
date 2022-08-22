import styled from "styled-components";
import { useState, useEffect } from "react";
import Spinner from "../Spinner";
import { useNavigate } from "react-router-dom";
import { StyledDetails, StyledProduct, ProductPrice, SpinnerDiv } from "../../global_styles/GlobalStyles.styled";
import { getData } from '../../features/functions';

const RelatedProducts = ({ product }) => {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getData('orders/related', setProducts, setLoading, product._id)
  }, [product._id])
  

  return (
    <RelatedContainer>
      <InnerContainer>
        <DivOne>
        <h2>Recommended</h2>
        </DivOne>
        {loading && products.length === 0 && <SpinnerDiv>
              <Spinner message='Loading products' />
          </SpinnerDiv>}
        <DivTwo>
          {products?.length > 0 && products.map((prod, i) =>
          <StyledProduct key={i}>
            <h3>{prod.name}</h3>
            <img src={prod.image.url} alt={prod.name}
            onClick={() => navigate(`/product/${prod._id}`)} />
            <StyledDetails>
                <span>{prod.description}</span>
                <ProductPrice>${prod.price}</ProductPrice>
            </StyledDetails>
          </StyledProduct>)}
      </DivTwo>
      </InnerContainer>
    </RelatedContainer>
  )
}

export default RelatedProducts;

const DivOne = styled.div`
  display: flex;
  max-width: 100%;

  h2 {
    margin-bottom: 1rem;
  }
`;

const DivTwo = styled.div`
  display: flex;
  flex-direction: row;
  max-width: 100%;
  gap: 2rem 0;

  @media (max-width: 800px) {
    flex-direction: column;
  }
`;

const RelatedContainer = styled.div`
    margin: 1rem;
    display: flex;
    justify-content: center;
    max-width: 100%;
    @media(max-width:800px) {
      flex-direction: column;
    }
`;

const InnerContainer = styled.div`
    max-width: 100%;
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: column;
    border-radius: 5px;
    padding: 2rem;
    @media(max-width:800px) {
        flex-direction: column;
        max-width: 100%;
    }
`;