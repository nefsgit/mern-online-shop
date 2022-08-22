import { useSelector } from "react-redux";
import { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import EditCategoryModal from "../../modals/EditCategoryModal";
import { Actions, DeleteBtn, EditBtn } from "../../../global_styles/GlobalStyles.styled";
import { handleModal } from "../../../features/functions";
import DeleteModal from "../../modals/DeleteModal";
import { categoriesDelete } from "../../../features/categoriesSlice";

export default function CategoriesList() {

  const { items } = useSelector(state => state.categories);
  const [category, setCategory] = useState({});
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [editCategoryOpen, setEditCategoryOpen] = useState(false);

  // Rows for the table
  const rows = items && items.map(item => {
    return {
      id: item._id,
      cName: item.name,
    }
  });

  // Columns for the table
  const columns = [
    {
      field: 'actions',
      headerName: 'Options',
      sortable: false,
      width: 120,
      renderCell: (params) => {
        return (
        <Actions>
          <DeleteBtn onClick={() => handleModal('categories/find', setCategory, setCategoryModalOpen, params.row.id)}>Delete</DeleteBtn>
          <EditBtn onClick={() => handleModal('categories/find', setCategory, setEditCategoryOpen, params.row.id)}>Edit</EditBtn>
        </Actions>
        )
      },
    },
    { field: 'id', headerName: 'ID', width: 240 },
    { field: 'cName', headerName: 'Name', width: 280 },
  ];

  return (
    <>
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
    {categoryModalOpen && <DeleteModal object={category} setModal={setCategoryModalOpen} message={`Are you sure you want to delete ${category.name}?`} subMessage={'This action won\'t affect the products that have this category assigned to them.'} dispatchFunc={categoriesDelete} />}
    {editCategoryOpen && <EditCategoryModal category={category} setEditCategoryModalOpen={setEditCategoryOpen} />}
    </>
  );
}