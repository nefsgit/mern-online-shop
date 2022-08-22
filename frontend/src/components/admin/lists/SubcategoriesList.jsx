import { useSelector } from "react-redux";
import { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { handleModal } from "../../../features/functions";
import EditSubcategoryModal from "../../modals/EditSubcategoryModal";
import { Actions, DeleteBtn, EditBtn } from "../../../global_styles/GlobalStyles.styled";
import DeleteModal from "../../modals/DeleteModal";
import { subcategoriesDelete } from "../../../features/subcategoriesSlice";

export default function SubcategoriesList() {

  const { items } = useSelector(state => state.subcategories);
  const [subcategory, setSubcategory] = useState({})
  const [subcategoryModalOpen, setSubcategoryModalOpen] = useState(false);
  const [editSubcategoryOpen, setEditSubcategoryOpen] = useState(false);

  const rows = items && items.map(item => {
    return {
      id: item._id,
      sName: item.name,
    }
  });

  const columns = [
    {
      field: 'actions',
      headerName: 'Options',
      sortable: false,
      width: 120,
      renderCell: (params) => {
        return (
        <Actions>
          <DeleteBtn onClick={() => handleModal('subcategories/find', setSubcategory, setSubcategoryModalOpen, params.row.id)}>Delete</DeleteBtn>
          <EditBtn onClick={() => handleModal('subcategories/find', setSubcategory, setEditSubcategoryOpen, params.row.id)}>Edit</EditBtn>
        </Actions>
        )
      },
    },
    { field: 'id', headerName: 'ID', width: 240 },
    { field: 'sName', headerName: 'Name', width: 280 },
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
    {subcategoryModalOpen && <DeleteModal object={subcategory} setModal={setSubcategoryModalOpen} message={`Are you sure you want to delete ${subcategory.name}?`} subMessage={'This action won\'t affect the products that have this subcategory assigned to them.'} dispatchFunc={subcategoriesDelete} />}
    {editSubcategoryOpen && <EditSubcategoryModal subcategory={subcategory} setEditSubcategoryModalOpen={setEditSubcategoryOpen} />}
    </>
  );
}