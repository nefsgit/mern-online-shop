import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { CreateProductForm, CreateProductContainer, AddProductButton } from '../../global_styles/GlobalStyles.styled';
import { subcategoriesCreate, subcategoriesFetch } from '../../features/subcategoriesSlice';

const CreateSubcategory = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(subcategoriesCreate({
        name,
    }));

    dispatch(subcategoriesFetch());

    setName("");
  }

  return (
    <>
    <CreateProductContainer>
        <CreateProductForm onSubmit={handleSubmit}>
            <h3>Add a subcategory</h3>

            <label htmlFor='name'>Name:</label>
            <input
            type="text"
            name='name'
            value={name}
            placeholder="Enter the subcategory's name"
            onChange={(e) => setName(e.target.value)}
            required
            />

            <AddProductButton type='submit'>Add subcategory</AddProductButton>

        </CreateProductForm>       
    </CreateProductContainer>
    
    </>
  )
}

export default CreateSubcategory;