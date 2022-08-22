import { useDispatch } from 'react-redux';
import { addToCart } from '../features/cartSlice';
import { useNavigate } from 'react-router-dom';
import Spinner from './Spinner';
import Header from './Header';
import Footer from './Footer';
import MostPopular from './MostPopular';
import { useEffect, useRef } from 'react';
import useGetProducts from '../hooks/useGetProducts';
import { toast } from 'react-toastify';
import { HomeContainer, StyledProducts, StyledProduct, StyledDetails, ProductPrice, LoadMoreButton } from '../global_styles/GlobalStyles.styled';
import { loadMore } from '../features/functions';

const Home = () => {
  
  const {data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading} = useGetProducts();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loadMoreRef = useRef();

  //Function to handle adding a product to the cart
  const handleAddToCart = (product) => {
    try {
      dispatch(addToCart(product));
      navigate("/cart");
    } catch (error) {
      toast.error(`Oops. Something went wrong while trying to add ${product.name} to the cart. Please try again later.`, {
        position: "bottom-left",
        autoClose: 2500,
      });
    } 
  }

  // Load more products on scroll
  useEffect(() => {
    loadMore({ hasNextPage, loadMoreRef, fetchNextPage });
  }, [loadMoreRef.current, hasNextPage]);

  return (
    <HomeContainer>
      <Header />
        <MostPopular />
        <Footer />
        {isLoading ? <Spinner message="Loading products" /> :
        <>
          <h2 id='all-products'>All Products</h2>
          <StyledProducts>
              {data?.pages?.map((page) => page.products?.map((product, i) => <StyledProduct key={i}>
                  <h3>{product.name}</h3>
                  <img src={product.image.url} alt={product.name}
                  onClick={() => navigate(`/product/${product._id}`)} />
                  <StyledDetails>
                      <span>{product.description}</span>
                      <ProductPrice>${product.price}</ProductPrice>
                  </StyledDetails>
                  <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
              </StyledProduct>))}
              {isFetchingNextPage ? <Spinner message='Loading more products' /> : ""}
              {hasNextPage && !isFetchingNextPage && <LoadMoreButton ref={loadMoreRef}
                onClick={() => fetchNextPage()}
                disabled={!hasNextPage|| isFetchingNextPage}>
                </LoadMoreButton>}
          </StyledProducts>
        </>}
    </HomeContainer>
  )
}

export default Home;

