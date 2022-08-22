import styled from "styled-components";
import { useSelector } from "react-redux";
import { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useNavigate } from "react-router-dom";
import EditProduct from "../../modals/EditProduct";
import { getData, handleModal } from "../../../features/functions";
import { Actions, DeleteBtn, EditBtn, ViewBtn } from "../../../global_styles/GlobalStyles.styled";
import DeleteModal from "../../modals/DeleteModal";
import { productsDelete } from "../../../features/productsSlice";

export default function ProductsList() {

  const { items } = useSelector(state => state.products);
  const navigate = useNavigate();
  const [product, setProduct] = useState({})
  const [productModalOpen, setProductModalOpen] = useState(false);
  const [editProductOpen, setEditProductOpen] = useState(false);
  const [revProds, setRevProds] = useState([]);

  const rows = items && items.map(item => {
    return {
      id: item._id,
      imageUrl: item.image.url,
      pName: item.name,
      pCategory: item.category,
      pSubcategory: item.subcategory,
      pDesc: item.description,
      price: "$" + item.price.toLocaleString(),
      rating: revProds.filter((prod) => prod._id === item._id).length > 0 ?  revProds.map((prod) => prod._id === item._id ? prod.rating.toFixed(2) : 0).filter(val => val !== 0) : 0
    }
  });

  useEffect(() => {
    getData('products/top-rated', setRevProds);
  }, []);

  const columns = [
    {
      field: 'actions',
      headerName: 'Options',
      sortable: false,
      width: 170,
      renderCell: (params) => {
        return (
        <Actions>
          <DeleteBtn onClick={() => handleModal('products/find', setProduct, setProductModalOpen, params.row.id)}>Delete</DeleteBtn>
          <EditBtn onClick={() => handleModal('products/find', setProduct, setEditProductOpen, params.row.id)}>Edit</EditBtn>
          <ViewBtn onClick={() => navigate(`/product/${params.row.id}`)}>View</ViewBtn>
        </Actions>
        )
      },
    },
    { field: 'id', headerName: 'ID', width: 220 },
    { field: 'imageUrl', headerName: 'Image', width: 60,
      renderCell: (params) => {
        return (
        <ImageContainer>
          <img src={params.row.imageUrl} alt="product" />
        </ImageContainer>
        )
      }},
    { field: 'pName', headerName: 'Name', width: 230 },
    { field: 'pCategory', headerName: 'Category', width: 150 },
    { field: 'pSubcategory', headerName: 'Subcategory', width: 150 },
    {
      field: 'pDesc',
      headerName: 'Description',
      width: 430,
    },
    {
      field: 'price',
      headerName: 'Price',
      width: 80,
    },
    {
      field: 'rating',
      headerName: 'Rating',
      width: 180,
    },
  ];

  return (
    <>
    {editProductOpen && <ScrollDown>Scroll down<i className="bi bi-arrow-down" /></ScrollDown>}
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
    {productModalOpen && <DeleteModal object={product} setModal={setProductModalOpen} message={`Are you sure you want to delete ${product.name}?`} dispatchFunc={productsDelete} navigateUrl={'/1j34-admin-yt6g/products'} />}
    {editProductOpen && <EditProduct product={product} setEditProductOpen={setEditProductOpen} />}
    </>
  );
}


const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
    img {
        height: 40px;
        width: 40px;
    }
`;

const ScrollDown = styled.h1`
  color: #bd0505;
`;