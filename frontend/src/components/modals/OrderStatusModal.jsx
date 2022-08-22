import { useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { ordersEdit } from '../../features/ordersSlice';
import { ModalContainer, YesButton, NoButton } from '../../global_styles/GlobalStyles.styled';

const OrderStatusModal = ({setDispatchOpen, setDeliverOpen, order}) => {
  const dispatch = useDispatch();

  function useOutsideCloser(ref) {
    useEffect(() => {
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
            if (setDispatchOpen) {
                setDispatchOpen(false);
            }
            if (setDeliverOpen) {
                setDeliverOpen(false);
            }
          
        }
      }
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }
  const wrapperRef = useRef(null);
  useOutsideCloser(wrapperRef);

  const handleDispatchOrder = (id) => {
    dispatch(ordersEdit({
        id,
        delivery_status: "dispatched"
    }));
    setDispatchOpen(false);
  }

  const handleDeliverOrder = (id) => {
    dispatch(ordersEdit({
        id,
        delivery_status: "delivered"
    }));
    setDeliverOpen(false);
  }

  return (
    <>
    <ModalContainer ref={wrapperRef}>
        <form onSubmit={(e) => {
                e.preventDefault();
                if (setDeliverOpen) {
                    handleDeliverOrder(order._id);
                }
                if (setDispatchOpen) {
                    handleDispatchOrder(order._id);
                }
              }}>
            <h3>Are you sure you want to proceed?</h3>
            <YesButton type='submit'>Yes</YesButton>
            <NoButton type='button' onClick={() => {
                if (setDeliverOpen) {
                    setDeliverOpen(false);
                }
                if (setDispatchOpen) {
                    setDispatchOpen(false);
                }
            }}>No</NoButton>
        </form>
    </ModalContainer>
    </>
  )
}

export default OrderStatusModal;