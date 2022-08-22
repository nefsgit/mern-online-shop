import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { categoriesCreate, categoriesFetch } from '../../features/categoriesSlice';
import { AddProductButton, CreateProductForm, CreateProductContainer } from '../../global_styles/GlobalStyles.styled';

const CreateCategory = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(categoriesCreate({
        name,
    }));

    dispatch(categoriesFetch());

    setName("");
  }

  return (
    <>
    <CreateProductContainer>
        <CreateProductForm onSubmit={handleSubmit}>
            <h3>Add a category</h3>

            <label htmlFor='name'>Name:</label>
            <input
            type="text"
            name='name'
            value={name}
            placeholder="Enter the category's name"
            onChange={(e) => setName(e.target.value)}
            required
            />

            <AddProductButton type='submit'>Add category</AddProductButton>

        </CreateProductForm>       
    </CreateProductContainer>
    
    </>
  )
}

export default CreateCategory;

