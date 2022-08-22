import { useRef, useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { ModalContainer, YesButton, NoButton } from '../../global_styles/GlobalStyles.styled';
import { useOutsideCloser, setHeaders } from '../../features/functions';
import { useNavigate } from 'react-router-dom';

const DeleteModal = ({ setModal, object, objectUrl, message, subMessage, dispatchFunc, deleteFunc, optionalProp, navigateUrl }) => {
    
    const wrapperRef = useRef(null);
    useOutsideCloser(wrapperRef, setModal);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loc, setLoc] = useState(window.location.pathname);

    const handleDelete = async () => {
        // If the current object is handled by redux
        if (dispatchFunc) {
            if (object) {
                dispatch(dispatchFunc(object._id));
            } else {
                dispatch(dispatchFunc());
            }
            setModal(false);
            if (navigateUrl) {
                navigate(navigateUrl);
            }
        }
        // If the current object is handled by axios
        if (deleteFunc) {
            await axios.delete(`${process.env.REACT_APP_API_URL}/${objectUrl}/${object._id}`, setHeaders()).then((res) => {
            if (res.status === 200) {
                toast.error("Successfully deleted.",
                {
                    position: "bottom-left",
                    autoClose: 2500,
                });
                setModal(false);
                // The optional prop is to set the review from current user to none
                if (optionalProp) {
                    optionalProp("");
                }               
            }}).catch((error) =>{
                toast.error("Oops. Something went wrong.",
                {
                    position: "bottom-left",
                    autoClose: 2500,
                });
            });
        }
    }
  
    return (
        <ModalContainer ref={wrapperRef} loc={loc}>
        <form onSubmit={(e) => {
                e.preventDefault();
                if (object) {
                    handleDelete(object._id);
                } else {
                    handleDelete();
                }
              }}>
            <h3>{message}</h3>
            {subMessage ? <p>{subMessage}</p> : ''}
            <YesButton type='submit'>Yes</YesButton>
            <NoButton type='button' onClick={() => setModal(false)}>No</NoButton>
        </form>
    </ModalContainer>
  )
}

export default DeleteModal;