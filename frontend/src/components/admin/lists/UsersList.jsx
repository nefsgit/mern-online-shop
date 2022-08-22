import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useNavigate } from "react-router-dom";
import { handleModal } from "../../../features/functions";
import { usersFetch } from "../../../features/usersSlice";
import { Actions, DeleteBtn, ViewBtn, Admin, Customer } from "../../../global_styles/GlobalStyles.styled";
import DeleteModal from "../../modals/DeleteModal";
import { usersDelete } from "../../../features/usersSlice";

export default function UsersList() {

  const { list } = useSelector(state => state.users);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [user, setUser] = useState({})
  const [userModalOpen, setUserModalOpen] = useState(false);

  useEffect(() => {
    dispatch(usersFetch());
  }, [dispatch])
  

  const rows = list && list.map(user => {
    return {
      id: user._id,
      uName: user.name,
      uEmail: user.email,
      isAdmin: user.isAdmin,
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
          <DeleteBtn onClick={() => handleModal('users/find', setUser, setUserModalOpen, params.row.id)}>Delete</DeleteBtn>
          <ViewBtn onClick={() => navigate(`/user/${params.row.id}`)}>View</ViewBtn>
        </Actions>
        )
      },
    },
    { field: 'id', headerName: 'ID', width: 230 },
    { field: 'uName', headerName: 'Name', width: 280,},
    { field: 'uEmail', headerName: 'Email', width: 350 },
    {
      field: 'isAdmin',
      headerName: 'Role',
      width: 100,
      renderCell: (params) => {
        return (
        <div>
          {params.row.isAdmin ? <Admin>Admin</Admin> :
          <Customer>Customer</Customer>}
        </div>
        )
      },
    },
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
    {userModalOpen && <DeleteModal object={user} setModal={setUserModalOpen} navigateUrl={"/1j34-admin-yt6g/users"} message={`Are you sure you want to delete ${user.name}?`} dispatchFunc={usersDelete} />}
    </>
  );
}