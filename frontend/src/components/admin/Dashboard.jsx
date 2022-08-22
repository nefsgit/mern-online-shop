import styled from 'styled-components';
import { NavLink, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FaUsers, FaStore, FaClipboard, FaTachometerAlt } from 'react-icons/fa';
import { RiFileListFill, RiFileListLine } from 'react-icons/ri';
import { AiOutlinePlusSquare, AiOutlineStar } from 'react-icons/ai';
import { useEffect, useState } from 'react';

const Dashboard = ({sideNavOpen, setSideNavOpen, navOpen}) => {
  const user = useSelector((state) => state.auth);
  const [loc, setLoc] = useState();

  useEffect(() => {
    const pathname = window.location.pathname;
    setLoc(pathname);
  }, [])
  
  const activeStyle = {
    color: 'rgb(233, 2, 2)',
  };

  const nestedActiveStyle = {
    marginLeft: '15px',
    color: 'rgb(233, 2, 2)',
  };

  const nestedStyle = {
    marginLeft: '15px',
  };

  if(!user.isAdmin) return (
    <AccessDeniedDiv>
      <h2>Access denied</h2>
    </AccessDeniedDiv>)
  return (
    <DashboardDiv>
        <i className={navOpen || sideNavOpen ? 'bi bi-gear-fill nav-open-btn-open' : 'bi bi-gear-fill nav-open-btn'} onClick={() => {if(!navOpen) setSideNavOpen(c => !c)}} />
        {sideNavOpen && 
        <SideNav>
            <h3>Quick links</h3>
            <NavLink style={({isActive}) => isActive ? activeStyle : null} to="/1j34-admin-yt6g/summary" onClick={() => setSideNavOpen(false)}><FaTachometerAlt className="nav-icon" />Summary</NavLink>
            <NavLink style={({isActive}) => isActive ? activeStyle : null} to="/1j34-admin-yt6g/products" onClick={() => setSideNavOpen(false)} ><FaStore className="nav-icon" />Products</NavLink>
            <NavLink style={({isActive}) => isActive ? nestedActiveStyle : nestedStyle} to="/1j34-admin-yt6g/products/create" onClick={() => setSideNavOpen(false)}><AiOutlinePlusSquare className="nav-icon" />Add product</NavLink>
            <NavLink style={({isActive}) => isActive ? activeStyle : null} to="/1j34-admin-yt6g/categories" onClick={() => setSideNavOpen(false)} ><RiFileListFill className="nav-icon" />Categories</NavLink>
            <NavLink style={({isActive}) => isActive ? nestedActiveStyle : nestedStyle} to="/1j34-admin-yt6g/categories/create" onClick={() => setSideNavOpen(false)}><AiOutlinePlusSquare className="nav-icon" />Add category</NavLink>
            <NavLink style={({isActive}) => isActive ? activeStyle : null} to="/1j34-admin-yt6g/subcategories" onClick={() => setSideNavOpen(false)} ><RiFileListLine className="nav-icon" />Subcategories</NavLink>
            <NavLink style={({isActive}) => isActive ? nestedActiveStyle : nestedStyle} to="/1j34-admin-yt6g/subcategories/create" onClick={() => setSideNavOpen(false)}><AiOutlinePlusSquare className="nav-icon" />Add subcategory</NavLink>
            <NavLink style={({isActive}) => isActive ? activeStyle : null} to="/1j34-admin-yt6g/orders" onClick={() => setSideNavOpen(false)}><FaClipboard className="nav-icon" />Orders</NavLink>
            <NavLink style={({isActive}) => isActive ? activeStyle : null} to="/1j34-admin-yt6g/users" onClick={() => setSideNavOpen(false)}><FaUsers className="nav-icon" />Users</NavLink>
            <NavLink style={({isActive}) => isActive ? activeStyle : null} to="/1j34-admin-yt6g/reviews" onClick={() => setSideNavOpen(false)}><AiOutlineStar className="nav-icon" />Reviews</NavLink>
        </SideNav>}
        <div className={sideNavOpen ? 'dashboard-content-open' : 'dashboard-content'}>
            <Outlet />
        </div>
        {loc === '/1j34-admin-yt6g/' || loc === '/1j34-admin-yt6g' ?
          <AccessDeniedDiv>
            <h2>Welcome to the staff area. Please use the settings wheel button to see your navigation options.</h2>
          </AccessDeniedDiv> : null
        }
    </DashboardDiv>
  )
}

export default Dashboard;

const AccessDeniedDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 4rem;

  h2 {
    display: flex;
    text-align: center;
    margin: auto;
  }

  @media(max-width: 800px) {
    margin-left: 1rem;
    margin-right: 1rem;
  }
`;

const SideNav = styled.div`
  border-right: 1px solid gray;
  height: 100%;
  position: fixed;
  top: 70px;
  overflow-y: auto;
  width: 250px;
  max-width: 250px;
  min-width: 150px;
  display: flex;
  flex-direction: column;
  padding: 2rem;
  background-color: rgb(0, 0, 0);
  color: white;
  z-index: 1;
  @media(max-width: 800px) {
    position: fixed;
    top: 0;
    height: 100%;
  }

  h3 {
    margin-top: 2rem;
  }

  a {
    text-decoration: none;
    color: white;
    margin-top: 1rem;

    &:hover {
      color: rgb(233, 2, 2);
    }
  }
`;

const DashboardDiv = styled.div`
  height: 100%;
  max-width: 100%;
`;
