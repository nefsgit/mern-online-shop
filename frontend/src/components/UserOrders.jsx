import styled from "styled-components";
import { useSelector } from "react-redux";
import { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useNavigate, Link } from "react-router-dom";
import moment from "moment";
import Spinner from "./Spinner";
import { getData } from "../features/functions";
import { Actions, ViewBtn, Pending, Dispatched, Delivered, SpinnerDiv } from "../global_styles/GlobalStyles.styled";

export default function UserOrders() {

  const user = useSelector(state => state.auth);
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getData('orders/user-orders', setOrders, setLoading);
  }, [])
  

  const rows = orders && orders?.map((order) => {
    return {
      id: order._id,
      amount: "$" + (order.total / 100)?.toLocaleString(),
      dStatus: order.delivery_status,
      date: moment(order.createdAt).format('dddd, YYYY-MM-DD, HH:mm')
    }
  })

  const columns = [
    { field: 'id', headerName: 'Id', width: 20, hide: true },
    {
      field: 'actions',
      headerName: 'Options',
      sortable: false,
      width: 80,
      renderCell: (params) => {
        return (
        <Actions>
          <ViewBtn onClick={() => navigate(`/order/${params.row.id}`)}>View</ViewBtn>
        </Actions>
        )
      },
    },
    { field: 'amount', headerName: 'Value', width: 100 },
    {
      field: 'dStatus',
      headerName: 'Delivery Status',
      width: 130,
      renderCell: (params) => {
        return (
        <div>
            {params.row.dStatus === 'pending' ?
            <Pending>
                Pending
            </Pending> : params.row.dStatus === 'dispatched' ?
            <Dispatched>
                Dispatched
            </Dispatched> :
            <Delivered>
                Delivered
            </Delivered>
            }
        </div>
        )
      },
    },
    {
      field: 'date',
      headerName: 'Date',
      width: 330,
    },
  ];

  return (
    <>
    <StyledContainer>
        {loading ? <SpinnerDiv>
          <Spinner message='Loading orders' />
        </SpinnerDiv> : orders?.length > 0 ?
        <div style={{ height: 700, width: '800px', maxWidth: '100%' }}>
        <h3>My Orders</h3>
        <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10]}
            checkboxSelection
            disableSelectionOnClick
        />
        </div> : !user?._id ?
        <div className="cart-empty">
            <h2>You need to <Link to="/login">
                <span>login</span>
            </Link> to see your orders.</h2>
        </div> :
        <div className="cart-empty">
            <p>You have no orders yet.</p>
            <div className="start-shopping">
            <Link to="/">
                <i className='bi bi-arrow-left' />
                <span>Start shopping</span>
            </Link>
            </div>
        </div>
        }
        
    </StyledContainer>
    </>
  );
}

const StyledContainer = styled.div`
    margin: 3rem 2rem;
    display: flex;
    justify-content: center;

    h3 {
        margin-bottom: 1rem;
    }

    a {
      text-decoration: none;
      color: #1fa504;
    }
`;