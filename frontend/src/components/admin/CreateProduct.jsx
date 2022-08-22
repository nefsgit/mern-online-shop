import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { productsCreate, productsFetch } from '../../features/productsSlice';
import { CreateProductForm, CreateProductContainer, ImagePreview, ImageCancel, AddProductButton } from '../../global_styles/GlobalStyles.styled';
import { transformFile } from '../../features/functions';

const CreateProduct = () => {
  const dispatch = useDispatch();
  const { items: allcategories } = useSelector(state => state.categories);
  const { items: allsubcategories } = useSelector(state => state.subcategories);
  const [productImg, setProductImg] = useState("");
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  const handleProductImageUpload = (e) => {
    const file = e.target.files[0];

    if(file) {
        transformFile(file, setProductImg);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(productsCreate({
        name,
        category: category.toString(),
        subcategory: subcategory.toString(),
        description,
        price,
        image: productImg
    }));

    dispatch(productsFetch());
  }

  return (
    <>
    <CreateProductContainer>
        <CreateProductForm onSubmit={handleSubmit}>
            <h3>Add a product</h3>

            <label htmlFor='name'>Name:</label>
            <input
            type="text"
            name='name'
            placeholder="Enter the product's name"
            onChange={(e) => setName(e.target.value)}
            required
            />

            <label htmlFor='category'>Category:</label>
            <select
            onChange={(e) => setCategory(e.target.value)}
            required>
              <option value="">Select Category</option>
              {allcategories?.map((cat) => <option key={cat._id} value={cat.name}>{cat.name}</option>)}
            </select>

            <label htmlFor='subcategory'>Subcategory:</label>
            <select
            onChange={(e) => setSubcategory(e.target.value)}
            required>
              <option value="">Select Subcategory</option>
              {allsubcategories?.map((subcat) => <option key={subcat._id} value={subcat.name}>{subcat.name}</option>)}
            </select>

            <label htmlFor='price'>Price:</label>
            <input
            type="number"
            name='price'
            placeholder="Enter the product's price"
            onChange={(e) => setPrice(e.target.value)}
            required
            />

            <label htmlFor='description'>Description:</label>
            <input
            type="text"
            name='description'
            placeholder="Short description of the product"
            onChange={(e) => setDescription(e.target.value)}
            required
            />

            <label htmlFor='image-upload'>Upload an image of the product</label>
            <input
            id="imgUpload"
            name='image-upload'
            accept="image/*"
            type="file"
            onChange={handleProductImageUpload}
            required
            />

            <AddProductButton type='submit'>Add product</AddProductButton>

        </CreateProductForm>
        {productImg ?
        <ImagePreview>    
            <img src={productImg} alt="product" />
            <ImageCancel className='img-cancel' onClick={() => {setProductImg("");
                const imgUploadInput = document.getElementById('imgUpload');
                imgUploadInput.value = ""
                }}>Cancel</ImageCancel>
        </ImagePreview> :
        ""}
        
    </CreateProductContainer>
    
    </>
  )
}

export default CreateProduct;