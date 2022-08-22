import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { subcategoriesEdit, subcategoriesFetch } from '../../features/subcategoriesSlice'; 
import { useOutsideCloser } from '../../features/functions';
import { AddProductButton, EditModalContainer, EditForm, CancelProductButton, FormButtonsContainer, TestDiv } from '../../global_styles/GlobalStyles.styled';

const EditSubcategoryModal = ({setEditSubcategoryModalOpen, subcategory}) => {
  const dispatch = useDispatch();
  const [name, setName] = useState(subcategory.name);
  const [loc, setLoc] = useState(window.location.pathname);

  const wrapperRef = useRef(null);
  useOutsideCloser(wrapperRef, setEditSubcategoryModalOpen);
  
  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(subcategoriesEdit({
        subcategory: {
            ...subcategory,
            name,
        }
    }));

    dispatch(subcategoriesFetch());

    setEditSubcategoryModalOpen(false);
  }

  return (
    <>
    <TestDiv>
    <EditModalContainer ref={wrapperRef} loc={loc}>
        <EditForm onSubmit={handleSubmit}>
            <label htmlFor='name'>Name:</label>
            <input
            type="text"
            name='name'
            placeholder="Enter the subcategory's name"
            onChange={(e) => setName(e.target.value)}
            value={name}
            required
            />
            <FormButtonsContainer>
              <AddProductButton type='submit'>Save</AddProductButton>
              <CancelProductButton type='button' onClick={() => setEditSubcategoryModalOpen(false)}>Cancel</CancelProductButton>
            </FormButtonsContainer>
        </EditForm>
    </EditModalContainer>
    </TestDiv>
    </>
  )
}

export default EditSubcategoryModal;