import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { categoriesEdit, categoriesFetch } from '../../features/categoriesSlice'; 
import { useOutsideCloser } from '../../features/functions';
import { AddProductButton, EditModalContainer, EditForm, CancelProductButton, FormButtonsContainer, TestDiv } from '../../global_styles/GlobalStyles.styled';

const EditCategoryModal = ({setEditCategoryModalOpen, category}) => {
  const dispatch = useDispatch();
  const [name, setName] = useState(category.name);
  const [loc, setLoc] = useState(window.location.pathname);

  const wrapperRef = useRef(null);
  useOutsideCloser(wrapperRef, setEditCategoryModalOpen);
  
  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(categoriesEdit({
        category: {
            ...category,
            name
        }
    }));

    dispatch(categoriesFetch());

    setEditCategoryModalOpen(false);
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
            placeholder="Enter the category's name"
            onChange={(e) => setName(e.target.value)}
            value={name}
            required
            />
            <FormButtonsContainer>
              <AddProductButton type='submit'>Save</AddProductButton>
              <CancelProductButton type='button' onClick={() => setEditCategoryModalOpen(false)}>Cancel</CancelProductButton>
            </FormButtonsContainer>
        </EditForm>
    </EditModalContainer>
    </TestDiv>
    </>
  )
}

export default EditCategoryModal;