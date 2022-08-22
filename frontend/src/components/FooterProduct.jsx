import styled from "styled-components";
import { Link } from "react-router-dom";

const FooterProduct = ({ product }) => {
  return (
    <FooterProdContainer>
        <Link to={`/product/${product._id}`}>
            <FooterProd>
                <FooterProdImage src={product.image.url} alt='product' />
                <ProdName>{product.name}</ProdName>
                <p>${product.price}</p>
            </FooterProd>
        </Link>
    </FooterProdContainer>
  )
}

export default FooterProduct;

const FooterProdContainer = styled.div`
    a {
        text-decoration: none;
    }
`;

const FooterProd = styled.div`
    cursor: pointer;
    transition: transform 0.5s ease;
    color: #324d67;

    &:hover {
        transform: scale(1.1,1.1)
    }
`;

const FooterProdImage = styled.img`
    border-radius: 15px;
    background-color: #ebebeb;
    transition: transform 0.5s ease;
    max-width: 250px;
    max-height: 250px;
    transition: all 1s ease;
`;

const ProdName = styled.p`
    font-size: 20px;
    font-weight: 500;
    color: #111;
`;