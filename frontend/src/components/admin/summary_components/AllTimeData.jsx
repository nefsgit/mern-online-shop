import styled from "styled-components";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { getData } from "../../../features/functions";

const AllTimeData = () => {

  const { items } = useSelector(state => state.products);
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [sum, setSum] = useState(0)

  // Data for All time - Orders
  useEffect(() => {
    getData('orders/all-orders', setOrders);
  }, [])

  // Data for All time - Earnings
  useEffect(() => {
    getData('orders/all-time-earnings', setSum);
  }, [])

  // Data for All time - Users
  useEffect(() => {
    getData('users/all-users', setUsers);
  }, [])

  return (
    <Main>
        <h3>All time</h3>
        <Info>
            <Title>Users</Title>
            <Data>{users?.length}</Data>
        </Info>
        <Info>
            <Title>Products</Title>
            <Data>{items?.length}</Data>
        </Info>
        <Info>
            <Title>Orders</Title>
            <Data>{orders?.length}</Data>
        </Info>
        <Info>
            <Title>Earnings</Title>
            <Data>${sum}</Data>
        </Info>
    </Main>
  )
}

export default AllTimeData;

const Main = styled.div`
    background: rgb(48,51,78);
    color: rgba(234,234,255,0.87);
    margin-top: 1.5rem;
    border-radius: 5px;
    padding: 1rem;
    font-size: 14px;
`;

const Info = styled.div`
    display: flex;
    margin-top: 1rem;
    border-radius: 3px;
    background: rgba(38,198,249,0.12);
    padding: 0.5rem;

    &:nth-child(even) {
        background: rgba(102,108,255,0.12);
    }
`;

const Title = styled.div`
    flex: 1;
`;

const Data = styled.div`
    flex: 1;
    font-weight: 700;
`;