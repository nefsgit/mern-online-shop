import { useNavigate, Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import { AddProductButton, AdminHeaders } from "../../global_styles/GlobalStyles.styled";

const Subcategories = () => {

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
        <h2 onClick={() => navigate('/1j34-admin-yt6g/subcategories')} style={{textDecoration: 'underline'}}>Subcategories</h2>
        {loc !== "/1j34-admin-yt6g/subcategories/create" &&
          <AddProductButton onClick={() => navigate("/1j34-admin-yt6g/subcategories/create")}>Create</AddProductButton>
        }
    </AdminHeaders>
    <Outlet />
    </>
  )
}

export default Subcategories;