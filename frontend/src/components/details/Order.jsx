import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { setHeaders } from "../../features/functions";
import axios from "axios";
import NotFound from "../NotFound";
import { useSelector } from "react-redux";
import { toast } from 'react-toastify'; 

const Order = () => {

  const params = useParams();
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.auth);

  const [order, setOrder] = useState({});

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/orders/find/${params.id}`, setHeaders());
        setOrder(response.data);
      } catch (error) {
        if (error.response.status === 403) {
          navigate(`/user/${currentUser._id}`);
          toast.error('You don\'t have permission to view the page you requested.', {
            position: "bottom-left",
            autoClose: 2500,
          });
        } else {
          toast.error('Oops. Something went wrong. Please try again later.', {
            position: "bottom-left",
            autoClose: 2500,
          });
        }
      }
    }

    fetchData();
  }, [params.id])

  const handleProdRedirect = async (name) => {
    try {
      const foundProd = await axios.get(`${process.env.REACT_APP_API_URL}/products/find-by-name/${name}`);

      navigate(`/product/${foundProd.data[0]._id}`);
    } catch (error) {
      toast.error('Oops. Something went wrong. The connection to the server was lost, or the requested product doesn\'t exist anymore.', {
        position: "bottom-left",
        autoClose: 2500,
      });
    }
  }
  
  return (
    <>
    {order ? (
      <>

      <StyledOrder>
        <OrdersContainer>
          <h2>Order Details</h2>
          <DeliveryStatus>
            Delivery status: {" "}
            {
              order.delivery_status === 'pending' ? (
                <Pending>Pending</Pending>
              ) : order.delivery_status === 'dispatched' ? (
                <Dispatched>Dispatched</Dispatched>
              ) : order.delivery_status === 'delivered' ? (
                <Delivered>Delivered</Delivered>
              ) : (
                "An error occured."
              )
            }
          </DeliveryStatus>
          <h3>Ordered Products</h3>
          <Items>
            {order.products?.map((product, i) => (
              <Item key={i} >
                <ProductName onClick={() => handleProdRedirect(product.description)}>{product.description}</ProductName>
                <span>{product.quantity}</span>
                <span>
                  {'$' + (product.amount_total / 100).toLocaleString()}
                </span>
              </Item>
            ))}
          </Items>
          <div>
            <h3>Total Price</h3>
            <p>{'$' + (order.total / 100).toLocaleString()}</p>
          </div>
          <div>
            <h3>Shipping details</h3>
            <p>Customer: {order.shipping_address?.name}</p>
            <p>Address: {order.shipping_address?.address?.line1}</p>
            <p>{order.shipping_address?.address?.line2}</p>
            <p>City: {order.shipping_address?.address?.city}</p>
            <p>Email: {order.shipping_address?.email}</p>
          </div>
        </OrdersContainer>
      </StyledOrder>
    </>) :
    (<NotFound />)
    }
    </>
  )
}

export default Order;

const StyledOrder = styled.div`
  margin: 3rem;
  display: flex;
  justify-content: center;
  h3 {
    margin: 1.5rem 0 0.5rem 0;
  }
`;

const DeliveryStatus = styled.p`
  height: 40px;
`;

const OrdersContainer = styled.div`
  max-width: 500px;
  width: 100%;
  height: auto;
  box-shadow: rgba(100,100,111,0.2) 0px 7px 29px 0px;
  border-radius: 5px;
  padding: 2rem;
  p {
      overflow: auto;
  }
`;

const ProductName = styled.span`
  cursor: pointer;
  color: #04af12;
`;

const Items = styled.div`
  span {
    margin-right: 1.5rem;
    &:first-child {
      font-weight: bold;
    }
  }
  @media(max-width:800px) {
    display: flex;
    flex-direction: column;
  }
`;

const Item = styled.li`
  margin-left: 0.5rem;
  margin-bottom: 0.5rem;
  @media(max-width:800px) {
    display: flex;
    flex-direction: column;
  }
`;

const Pending = styled.span`
  color: rgb(253,181,40);
  background: rgba(253,181,40,0.12);
  padding: 3px 5px;
  border-radius: 3px;
  font-size: 14px;
`;

const Dispatched = styled.span`
  color: rgb(38,198,249);
  background: rgba(38,198,249,0.12);
  padding: 3px 5px;
  border-radius: 3px;
  font-size: 14px;
`;

const Delivered = styled.span`
  color: rgb(102,108,255);
  background: rgba(102,108,255,0.12);
  padding: 3px 5px;
  border-radius: 3px;
  font-size: 14px;
`;