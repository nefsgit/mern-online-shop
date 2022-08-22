import { useNavigate, Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import { AddProductButton, AdminHeaders } from "../../global_styles/GlobalStyles.styled";

const Categories = () => {

  const navigate = useNavigate();
  const [loc, setLoc] = useState();
  const path = window.location.pathname;

  useEffect(() => {
    const pathname = window.location.pathname;
    setLoc(pathname);
  }, [path])
  

  return (
    <>
    <AdminHeaders>
        <h2 onClick={() => navigate('/1j34-admin-yt6g/categories')} style={{textDecoration: 'underline'}}>Categories</h2>
        {loc !== "/1j34-admin-yt6g/categories/create" &&
          <AddProductButton onClick={() => navigate("/1j34-admin-yt6g/categories/create")}>Create</AddProductButton>
        }
    </AdminHeaders>
    <Outlet />
    </>
  )
}

export default Categories;