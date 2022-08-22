import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useNavigate } from "react-router-dom";
import { ordersFetch } from "../../../features/ordersSlice";
import moment from "moment";
import OrderStatusModal from "../../modals/OrderStatusModal";
import { Actions, ViewBtn, Pending, Dispatched, Delivered } from "../../../global_styles/GlobalStyles.styled";
import { handleModal } from "../../../features/functions";

export default function OrdersList() {

  const { list } = useSelector(state => state.orders);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [currentOrder, setCurrentOrder] = useState({})
  const [dispatchOpen, setDispatchOpen] = useState(false);
  const [deliverOpen, setDeliverOpen] = useState(false);

  useEffect(() => {
    dispatch(ordersFetch())
  }, [dispatch])
  

  const rows = list && list.map(order => {
    return {
      id: order._id,
      cName: order.shipping_address.name,
      amount: "$" + (order.total / 100)?.toLocaleString(),
      dStatus: order.delivery_status,
      date: moment(order.createdAt).format('dddd, YYYY-MM-DD, HH:mm:ss')
    }
  });

  const columns = [
    {
      field: 'actions',
      headerName: 'Options',
      sortable: false,
      width: 280,
      renderCell: (params) => {
        return (
        <Actions>
          <DispatchBtn onClick={() => handleModal('orders/find', setCurrentOrder, setDispatchOpen, params.row.id)}>Dispatch</DispatchBtn>
          <DeliveryBtn onClick={() => handleModal('orders/find', setCurrentOrder, setDeliverOpen, params.row.id)}>Mark Delivered</DeliveryBtn>
          <ViewBtn onClick={() => navigate(`/order/${params.row.id}`)}>View</ViewBtn>
        </Actions>
        )
      },
    },
    { field: 'id', headerName: 'ID', width: 250 },
    { field: 'cName', headerName: 'Customer', width: 230 },
    { field: 'amount', headerName: 'Value', width: 80 },
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
    <div style={{ height: 700, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
        checkboxSelection
        disableSelectionOnClick
      />
    </div>
    {deliverOpen && <OrderStatusModal order={currentOrder} setDeliverOpen={setDeliverOpen} setDispatchOpen={null} />}
    {dispatchOpen && <OrderStatusModal order={currentOrder} setDeliverOpen={null} setDispatchOpen={setDispatchOpen} />}
    </>
  );
}

const DispatchBtn = styled.button`
    background-color: rgb(38,198,249);
`;

const DeliveryBtn = styled.button`
    background-color: rgb(102,108,255);
`;