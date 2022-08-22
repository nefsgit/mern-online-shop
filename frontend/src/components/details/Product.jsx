import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { setHeaders } from "../../features/functions";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../features/cartSlice";
import { productsDelete } from "../../features/productsSlice";
import NotFound from "../NotFound";
import EditProductModal from "../modals/EditProductModal";
import { SpinnerDiv } from "../../global_styles/GlobalStyles.styled";
import Spinner from "../Spinner";
import { toast } from "react-toastify";
import RelatedProducts from "./RelatedProducts";
import ProductReviews from "./ProductReviews";
import { Rating } from "@mui/material";
import DeleteModal from "../modals/DeleteModal";

const Product = () => {

  //Functions and Variables

  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth);
  const [productModalOpen, setProductModalOpen] = useState(false);
  const [editProductModalOpen, setEditProductModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState("");
  const [classification, setClassification] = useState(0);
  const [exRev, setExRev] = useState("");

  const [product, setProduct] = useState(null);

  /* Finds the product from the id in the browser URL.
  The function is not declared inside the useEffect so we can pass it to the
  edit modal child and use it there to update the parent in case of changes */
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/products/find/${params.id}`, setHeaders());
      if (response.data.name) {
        setProduct(response.data);
      }
    } catch (error) {
      console.log('Product not found.');
    }
    setLoading(false);
  }
  
  useEffect(() => {
    fetchData();
  }, [params.id])

  // Looks for a review from the current user
  useEffect(() => {
    setLoading(true);
    setExRev("");
    async function fetchReview() {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/reviews/product-user/${params.id}`, setHeaders());

        if (response.data) {
          setExRev(response.data);
        } 
      } catch (error) {
        console.log('No reviews from current user.');
      }
      setLoading(false);
    }

    fetchReview();
  }, [params.id])

  // Adds the current product to the cart
  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    navigate("/cart");
  }

  // Submits a review
  const handleReviewSubmit = (e) => {
    e.preventDefault();
    axios.post(`${process.env.REACT_APP_API_URL}/reviews/${product._id}`, {
      userId: user._id,
      userName: user.name,
      productName: product.name,
      content,
      classification,
    }, setHeaders()).then((res) => {
      if (res.status === 200) {
        toast.success("Review posted!",
          {
              position: "bottom-left",
              autoClose: 2500,
          });
          setExRev('done');
          setContent("");
          setClassification(0);
      }
    }).catch((error) => {
      toast.error("Oops. Something went wrong. Please try again.",
        {
            position: "bottom-left",
            autoClose: 2500,
        })
    });
  }

  // Component

  return (
    <>
    {/* If it's fetching the product a spinner is displayed */}
    {loading && <SpinnerDiv><Spinner message='Loading product' /></SpinnerDiv>}
    {/* If the product is not found a Not Found component is displayed */}
    {!loading && !product && <NotFound />}
    
    {/* Desktop */}

    {product ? (
    <>
    <DesktopContainer>
      <DividerOne>
        <StyledProduct>
          <ProductReviews product={product} setExRev={setExRev} />
        </StyledProduct>
      </DividerOne>
      <DividerTwo>
        <StyledProduct>
          <ProductContainer>
            <DivOne>
              <ImageContainer>
                <img src={product.image?.url} alt="product" />
              </ImageContainer>
              <ProductDetails>
                  <h3>{product.name}</h3>
                  <p><span>Description: </span>{product.description}</p>
                  {
                    user?.isAdmin && <>
                      <p><span>Category: </span>{product.category}</p>
                      <p><span>Subcategory: </span>{product.subcategory}</p>
                    </>
                  }
                  <Price>${product.price?.toLocaleString()}</Price>
                  <AddToCartButton onClick={() => handleAddToCart(product)}>Add to Cart</AddToCartButton>
              </ProductDetails>
            </DivOne>
              {user._id && !exRev && !loading &&
              <CreateProductForm onSubmit={handleReviewSubmit}>
                <h4>Post a review</h4>
                <textarea
                  placeholder='Tell everyone your thoughts on this product'
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  required
                />
                <label htmlFor="simple-controlled">Rate {product.name}</label>
                <Rating
                  name="simple-controlled"
                  value={classification}
                  onChange={(event, newValue) => {
                    setClassification(newValue);
                  }}
                  required
                />
                <AddProductButton type='submit'>Post Review</AddProductButton>
              </CreateProductForm>}
          </ProductContainer>
        </StyledProduct>
        {product && <RelatedProducts product={product} />}
        {user?.isAdmin && <AdminOptions>
          <ProductsButton onClick={() => navigate("/1j34-admin-yt6g/products")}>All Products</ProductsButton>
          <EditButton onClick={() => setEditProductModalOpen(true)}>Edit</EditButton>
          <DeleteButton onClick={() => setProductModalOpen(true)}>Delete</DeleteButton>
        </AdminOptions>}
      </DividerTwo>
    </DesktopContainer>
    </>) :
      ""
      }

  {/* Mobile */}

  {product ? (
    <>
    <MobileContainer>
      <MobDivOne>
        <MobProdContainer>
          <ImageContainer>
            <img src={product.image?.url} alt="product" />
          </ImageContainer>
          <ProductDetails>
              <h3>{product.name}</h3>
              <p><span>Description: </span>{product.description}</p>
              {
                user?.isAdmin && <>
                  <p><span>Category: </span>{product.category}</p>
                  <p><span>Subcategory: </span>{product.subcategory}</p>
                </>
              }
              <Price>${product.price?.toLocaleString()}</Price>
              <AddToCartButton onClick={() => handleAddToCart(product)}>Add to Cart</AddToCartButton>
          </ProductDetails>
          {user._id && !exRev && !loading &&
          <CreateProductForm onSubmit={handleReviewSubmit}>
            <h4>Post a review</h4>
            <textarea
              placeholder='Tell everyone your thoughts on this product'
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
            <label htmlFor="simple-controlled">Rate {product.name}</label>
            <Rating
              name="simple-controlled"
              value={classification}
              onChange={(event, newValue) => {
                setClassification(newValue);
              }}
              required
            />
            <AddProductButton type='submit'>Post Review</AddProductButton>
          </CreateProductForm>}
        </MobProdContainer>
        {user?.isAdmin && <AdminOptions>
          <ProductsButton onClick={() => navigate("/1j34-admin-yt6g/products")}>All Products</ProductsButton>
          <EditButton onClick={() => setEditProductModalOpen(true)}>Edit</EditButton>
          <DeleteButton onClick={() => setProductModalOpen(true)}>Delete</DeleteButton>
        </AdminOptions>}
        {product && <RelatedProducts product={product} />}
        <ProductReviews product={product} setExRev={setExRev} />
      </MobDivOne>
    </MobileContainer>
    </>) :
      ""
      }
      {productModalOpen && user?.isAdmin && <DeleteModal object={product} setModal={setProductModalOpen} message={`Are you sure you want to delete ${product.name}?`} dispatchFunc={productsDelete} navigateUrl={'/1j34-admin-yt6g/products'} />}
      {editProductModalOpen && user?.isAdmin && <EditProductModal product={product} setEditProductModalOpen={setEditProductModalOpen} fetchData={fetchData} />}
    
    </>
  )
}

export default Product;

// Styled

const DesktopContainer = styled.div`
  display: flex;
  flex-direction: row;
  max-width: 100%;
  margin-bottom: 2rem;

  @media(max-width:800px) {
    display: none;
  }
`;

const MobileContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 100%;
  margin-bottom: 2rem;
  padding: 3rem 2rem 2rem 2rem;

  @media(min-width:800px) {
    display: none;
  }
`;

const MobDivOne = styled.div`
    display: flex;
    flex-direction: column;
    max-width: 100%;
    align-items: center;
`;

const MobProdContainer = styled.div`
  max-width: 100%;
  margin: 0 3rem 3rem 3rem;
  height: auto;
  display: flex;
  flex-direction: column;
  box-shadow: rgba(100,100,111,0.2) 0px 7px 29px 0px;
  border-radius: 5px;
  padding: 2rem;
`;

const DividerOne = styled.div`
  width: 500px;
  max-width: 30%;
  display: flex;
  flex-direction: column;
  align-items: start;

  @media(max-width:800px) {
    max-width: 100%;
    align-items: center;
  }
`;

const DividerTwo = styled.div`
  max-width: 70%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  @media(max-width:800px) {
    flex-direction: column;
    max-width: 100%;
    align-items: center;
    margin: 1.5rem;
  }
`;

const DivOne = styled.div`
  display: flex;
  flex-direction: row;
  max-width: 100%;

  @media(max-width:800px) {
    flex-direction: column;
  }
`;

const StyledProduct = styled.div`
  margin: 3rem;
  display: flex;
  justify-content: center;
  max-width: 100%;
  @media(max-width:800px) {
    flex-direction: column;
  }
`;

const ProductContainer = styled.div`
  max-width: 500px;
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  box-shadow: rgba(100,100,111,0.2) 0px 7px 29px 0px;
  border-radius: 5px;
  padding: 2rem;
  @media(max-width:800px) {
    flex-direction: column;
    margin: 3rem;
    max-width: 100%;
  }
`;

const ImageContainer = styled.div`
  flex: 1;
  img {
    width: 100%;
  }
  @media(max-width:800px) {
    flex: 1;
    width: 500px;
    max-width: 100%;
    img {
      width: 500px;
      max-width: 100%;
    }
  }
`;

const ProductDetails = styled.div`
  flex: 2;
  margin-left: 1rem;
  h3 {
    font-size: 35px;
  }
  p span {
    font-weight: bold;
  }
  @media(max-width:800px) {
    flex: 1;
    width: 500px;
    max-width: 100%;
    margin-left: 0;
  }
`;

const AdminOptions = styled.div`
  display: flex;
  justify-content: center;
  max-width: 100%;
  gap: 1rem;
  margin-left: 3rem;
  margin-bottom: 1rem;
  @media(max-width:800px) {
    gap: 0.5rem;
    max-width: 100%;
    margin-left: 3rem;
    margin-right: 3rem;
  }
`;

const AddToCartButton = styled.button`
  width: 100%;
  max-width: 100%;
  height: 40px;
  border-radius: 5px;
  font-weight: 400;
  border: none;
  outline: none;
  cursor: pointer;
  background-color: #1fa504;
  color: white;
  letter-spacing: 1.15px;
  &:hover {
    background-color: #23ca02;
  }
`;

const Price = styled.div`
  margin: 1rem 0;
  font-weight: bold;
  font-size: 25px;
`;

const ProductsButton = styled.button`
  width: 150px;
  max-width: 100%;
  height: 40px;
  border-radius: 5px;
  margin-top: 2rem;
  font-weight: 400;
  border: none;
  outline: none;
  cursor: pointer;
  background-color: #000000;
  color: white;
  letter-spacing: 1.15px;
  padding: 5px;
  &:hover {
    background-color: #474747;
  }
  @media(max-width:800px) {
      max-width: 50%;
      height: 50px;
    }
`;

const DeleteButton = styled.button`
  width: 150px;
  max-width: 100%;
  height: 40px;
  border-radius: 5px;
  margin-top: 2rem;
  font-weight: 400;
  border: none;
  outline: none;
  cursor: pointer;
  background-color: #ee2e2e;
  color: white;
  letter-spacing: 1.15px;
  padding: 5px;
  &:hover {
    background-color: rgb(245, 90, 90);
  }
  @media(max-width:800px) {
      max-width: 30%;
      height: 50px;
    }
`;

const EditButton = styled.button`
  width: 150px;
  max-width: 100%;
  height: 40px;
  border-radius: 5px;
  margin-top: 2rem;
  font-weight: 400;
  border: none;
  outline: none;
  cursor: pointer;
  background-color: #0270ca;
  color: white;
  letter-spacing: 1.15px;
  padding: 5px;
  &:hover {
    background-color: #47a7f5;
  }
  @media(max-width:800px) {
      max-width: 30%;
      height: 50px;
    }
`;

const CreateProductForm = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 100%;
  margin-top: 2rem;
  @media(max-width: 800px) {
    width: 100%;
    max-width: 100%;
  }

  label {
    margin-top: 0.8rem;
    font-weight: 600;
  }

  input {
    padding: 7px;
    min-height: 30px;
    outline: none;
    border-radius: 5px;
    border: 1px solid rgb(182, 182, 182);
    margin: 0.3rem 0;

    &:focus {
      border: 1px solid rgb(0, 0, 0);
      box-shadow: 0 2px 5px 1px #111;
    }
  }

  textarea {
    padding: 7px;
    outline: none;
    border-radius: 5px;
    border: 1px solid rgb(182, 182, 182);
    margin: 0.3rem 0;
    resize: none;

    @media(max-width:800px) {
      min-height: 100px;
    }

    &:focus {
      border: 1px solid rgb(0, 0, 0);
      box-shadow: 0 2px 5px 1px #111;
    }
  }
`;

const AddProductButton = styled.button`
  background-color: #1fa504;
  color: white;
  border: none;
  outline: none;
  border-radius: 5px;
  padding: 10px;
  max-width: 170px;
  margin-top: 1rem;
  margin-left: auto;
  margin-right: auto;
  cursor: pointer;

  &:hover {
    background-color: #23ca02;
  }
  &:active {
    transform: scale(0.9);
  }
`;