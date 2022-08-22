import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { productsEdit } from '../../features/productsSlice'; 
import { useOutsideCloser, transformFile } from '../../features/functions';
import { EditForm, ImagePreview, AddProductButton, CancelProductButton, FormButtonsContainer, TestDiv, CurrentOption, EditModalContainer } from '../../global_styles/GlobalStyles.styled';

const EditProductModal = ({setEditProductModalOpen, product, fetchData}) => {
  const dispatch = useDispatch();
  const { items: allcategories } = useSelector(state => state.categories);
  const { items: allsubcategories } = useSelector(state => state.subcategories);
  const [productImg, setProductImg] = useState("");
  const [name, setName] = useState(product.name);
  const [price, setPrice] = useState(product.price);
  const [category, setCategory] = useState(product.category);
  const [subcategory, setSubcategory] = useState(product.subcategory);
  const [description, setDescription] = useState(product.description);
  const [previewImg, setPreviewImg] = useState(product.image.url);
  const [loc, setLoc] = useState(window.location.pathname);

  const wrapperRef = useRef(null);
  useOutsideCloser(wrapperRef, setEditProductModalOpen);

  const handleProductImageUpload = (e) => {
    const file = e.target.files[0];

    if(file) {
        transformFile(file, setProductImg, setPreviewImg);
    }
    
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(productsEdit({
        productImg,
        product: {
            ...product,
            name: name,
            price: price,
            category: category,
            subcategory: subcategory,
            description: description,
        }
    }));

    setEditProductModalOpen(false);
    fetchData();
  }

  return (
    <>
    <TestDiv>
      <EditModalContainer ref={wrapperRef} loc={loc} >
        <EditForm onSubmit={handleSubmit}>
          <label htmlFor='name'>Name:</label>
          <input
          type="text"
          name='name'
          placeholder="Enter the product's name"
          onChange={(e) => setName(e.target.value)}
          value={name}
          required
          />

          <label htmlFor='price'>Price:</label>
          <input
          type="number"
          name='price'
          placeholder="Enter the product's price"
          onChange={(e) => setPrice(e.target.value)}
          value={price}
          required
          />

          <label htmlFor='category'>Category:</label>
          <select
          onChange={(e) => setCategory(e.target.value)}
          required>
            <CurrentOption value={category}>{category}</CurrentOption>
            {allcategories?.filter((c) => c.name !== category).map((cat) => <option key={cat._id} value={cat.name}>{cat.name}</option>)}
          </select>

          <label htmlFor='subcategory'>Subcategory:</label>
          <select
          onChange={(e) => setSubcategory(e.target.value)}
          required>
            <CurrentOption value={subcategory}>{subcategory}</CurrentOption>
            {allsubcategories?.filter((sc) => sc.name !== subcategory).map((subcat) => <option key={subcat._id} value={subcat.name}>{subcat.name}</option>)}
          </select>

          <label htmlFor='description'>Description:</label>
          <input
          type="text"
          name='description'
          placeholder="Short description of the product"
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          required
          />

          <label htmlFor='image-upload'>Upload an image of the product</label>
          <input
          id="imgUpload"
          name='image-upload'
          accept="image/*"
          type="file"
          onChange={handleProductImageUpload}
          />
          <FormButtonsContainer>
            <AddProductButton type='submit'>Save</AddProductButton>
            <CancelProductButton type='button' onClick={() => setEditProductModalOpen(false)}>Cancel</CancelProductButton>
          </FormButtonsContainer>
        </EditForm>
          {previewImg &&
          <ImagePreview>    
              <img src={previewImg} alt="product" />
          </ImagePreview>
          }
      </EditModalContainer>
    </TestDiv>
    </>
  )
}

export default EditProductModal;