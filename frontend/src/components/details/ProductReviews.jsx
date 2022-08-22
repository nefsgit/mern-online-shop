import styled from "styled-components";
import { useEffect, useRef, useState } from "react";
import Spinner from "../Spinner";
import moment from "moment";
import useGetProdReviews from '../../hooks/useGetProdReviews';
import { Rating } from "@mui/material";
import { BsTrash } from 'react-icons/bs';
import { useSelector } from "react-redux";
import DeleteModal from "../modals/DeleteModal";
import { loadMore } from "../../features/functions";
import { LoadMoreButton, SpinnerDiv } from "../../global_styles/GlobalStyles.styled";
import { handleModal } from "../../features/functions";

const ProductReviews = ({ product, setExRev }) => {

  const {data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading} = useGetProdReviews(product._id);
  const loadMoreRef = useRef();
  const user = useSelector((state) => state.auth);
  const [currentRev, setCurrentRev] = useState({});
  const [deleteRev, setDeleteRev] = useState(false);

  const negativeReview = {
    boxShadow: '-5px -5px 10px rgba(255, 255, 255, 0.5), 2px 2px 5px rgba(243, 108, 108, 0.3)',
  };

  const positiveReview = {
    boxShadow: '-5px -5px 10px rgba(255, 255, 255, 0.5), 2px 2px 5px rgba(20, 196, 20, 0.3)',
  };

  useEffect(() => {
    loadMore({ hasNextPage, loadMoreRef, fetchNextPage });
  }, [loadMoreRef.current, hasNextPage]);

  return (
    <div>
        <h2>Reviews</h2>
        {
            isLoading && <SpinnerDiv>
                <Spinner message='Loading reviews' />
            </SpinnerDiv>
        }
        {
            data?.pages?.map((page) => page.reviews?.map((rev, i) =>
            <ReviewContainer key={i} style={rev.classification >= 3 ? positiveReview : negativeReview}>
              <h3>{rev.userName}</h3>
              <p>{rev.content}</p>
              <Rating name="read-only" value={rev.classification} readOnly />
              <RevDate>
                {moment(rev.createdAt).format('dddd, YYYY-MM-DD, HH:mm')}
                {user?._id === rev.userId && <BsTrash onClick={() => handleModal('reviews/find', setCurrentRev, setDeleteRev, rev._id)} />}
              </RevDate>
            </ReviewContainer>))
        }
        {deleteRev && <DeleteModal object={currentRev} setModal={setDeleteRev} optionalProp={setExRev} message={'Are you sure you want to delete this review?'} objectUrl={'reviews/delete'} deleteFunc={'deleteReview'} />}
        {isFetchingNextPage && <Spinner message='Loading more products' />}
        {
            !isLoading && data?.pages[0]?.reviews?.length === 0 && <p>No reviews for this product yet.</p>
        }
        {hasNextPage && !isFetchingNextPage && <LoadMoreButton ref={loadMoreRef}
            onClick={() => fetchNextPage()}
            disabled={!hasNextPage|| isFetchingNextPage}>
        </LoadMoreButton>}
    </div>
  )
}

export default ProductReviews;

const ReviewContainer = styled.div`
    display: flex;
    flex-direction: column;
    max-width: 100%;
    margin: 1rem;
    padding: 1rem;
    border-radius: 15px;
    box-shadow: -5px -5px 10px rgba(255, 255, 255, 0.5), 2px 2px 5px rgba(94, 104, 121, 0.3);
`;

const RevDate = styled.p`
    color: #464646;
    font-size: 12px;
    display: flex;
    align-items: center;
    gap: 0.5rem;

    svg {
      color: #ee2e2e;
      cursor: pointer;
    }
`;