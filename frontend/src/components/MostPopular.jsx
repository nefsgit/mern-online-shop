import { useNavigate } from 'react-router-dom';
import Spinner from './Spinner';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../features/cartSlice';
import { getData } from '../features/functions';
import { StyledProducts, StyledProduct, StyledDetails, ProductPrice, SpinnerDiv } from '../global_styles/GlobalStyles.styled';

const MostPopular = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [popular, setPopular] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getData('orders/most-popular', setPopular, setLoading);
  }, [])

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    navigate("/cart");
  }

  return (
    <>
      <h2>Popular</h2>
      {loading ? <SpinnerDiv><Spinner message="Fetching products" /></SpinnerDiv> : <>
      <StyledProducts>
          {popular.map((inner) => inner.map((product, i) => <StyledProduct key={i}>
              <h3>{product?.name}</h3>
              <img src={product?.image?.url} alt={product?.name}
              onClick={() => navigate(`/product/${product?._id}`)} />
              <StyledDetails>
                  <span>{product?.description}</span>
                  <ProductPrice>${product?.price}</ProductPrice>
              </StyledDetails>
              <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
          </StyledProduct>))}
      </StyledProducts>
      </>}
    </>)
}

export default MostPopular;