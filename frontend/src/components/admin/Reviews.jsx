import { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import moment from "moment";
import { Actions, DeleteBtn } from "../../global_styles/GlobalStyles.styled";
import { Link } from 'react-router-dom';
import { getData, handleModal } from '../../features/functions';
import DeleteModal from '../modals/DeleteModal';

export default function Reviews() {

  const [reviews, setReviews] = useState([]);
  const [cReview, setCReview] = useState({});
  const [reviewModal, setReviewModal] = useState(false);
  const [exRev, setExRev] = useState("");

  useEffect(() => {
    getData('reviews', setReviews);
  }, [reviewModal])
  
  const rows = reviews && reviews.map(review => {
    return {
      id: review._id,
      userId: review.userId,
      userName: review.userName,
      productId: review.productId,
      productName: review.productName,
      classification: review.classification,
      content: review.content,
      date: moment(review.createdAt).format('dddd, YYYY-MM-DD, HH:mm:ss')
    }
  });

  const columns = [
    {
      field: 'actions',
      headerName: 'Options',
      sortable: false,
      width: 80,
      renderCell: (params) => {
        return (
        <Actions>
          <DeleteBtn onClick={() => handleModal('reviews/find', setCReview, setReviewModal, params.row.id)}>Delete</DeleteBtn>
        </Actions>
        )
      },
    },
    { field: 'id', headerName: 'ID', width: 250 },
    { field: 'userId', headerName: 'Posting User\'s Id', width: 230,
    renderCell: (params) => (
      <Link className='rev-link' to={`/user/${params.value}`}>{params.value}</Link>
    ) },
    { field: 'userName', headerName: 'Posting User\'s Name', width: 180 },
    { field: 'productId', headerName: 'Product\'s Id', width: 230,
    renderCell: (params) => (
      <Link className='rev-link' to={`/product/${params.value}`}>{params.value}</Link>
    ) },
    { field: 'productName', headerName: 'Product\'s Name', width: 180 },
    { field: 'classification', headerName: 'Rating', width: 80 },
    { field: 'content', headerName: 'Content', width: 240 },
    {
      field: 'date',
      headerName: 'Date',
      width: 260,
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
    {reviewModal ? <DeleteModal object={cReview} setModal={setReviewModal} optionalProp={setExRev} message={'Are you sure you want to delete this review?'} objectUrl={'reviews/delete'} deleteFunc={'deleteReview'} /> : null}
    </>
  );
}

