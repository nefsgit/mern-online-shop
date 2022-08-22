import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../features/authSlice';
import { toast } from 'react-toastify';
import { FaClipboard, FaTachometerAlt, FaPowerOff } from 'react-icons/fa';
import { CgProfile } from 'react-icons/cg';
import { MdPower } from 'react-icons/md';
import { BsPencilSquare } from 'react-icons/bs';

const NavBar = ({ navOpen, setNavOpen, sideNavOpen, setSideNavOpen }) => {
  const navigate = useNavigate();
  const cart = useSelector(state => state.cart);
  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();
  

  return (
    <>
        <DesktopNav>
            <FirstDiv>
                <Link to="/">
                    <h2>Online Shop</h2>
                </Link>
                <Link to="/cart">
                    <NavBag>
                        <i className="bi bi-handbag-fill">
                            {cart.cartTotalQuantity > 0 ? <span>
                                <p>{cart.cartTotalQuantity}</p>
                            </span> : ""}
                        </i>

                    </NavBag>
                </Link>
            </FirstDiv>
            <SecondDiv>
                {
                    auth._id ? <>
                    <Link to="/my-orders" onClick={() => setNavOpen(false)}>Orders</Link>
                    <Link to={`/user/${auth._id}`} onClick={() => setNavOpen(false)}>Profile</Link>
                    {auth.isAdmin && 
                    <div>
                        <Link to="/1j34-admin-yt6g/summary">Admin</Link>
                    </div>
                    }
                    <Logout onClick={() => {
                        dispatch(logoutUser(null));
                        navigate("/");
                        toast.warning("You were logged out.", {
                            position: "bottom-left",
                        })
                    }}>
                        Logout
                    </Logout>
                    </> :
                    <AuthLinks>
                        <Link to="/login">
                            <p>Login</p>
                        </Link>
                        <Link to="/register">
                            <p>Register</p>
                        </Link>
                    </AuthLinks>
                }
            </SecondDiv>
        </DesktopNav>
        <i className={navOpen ? 'bi bi-list side-menu-btn-open' : 'bi bi-list side-menu-btn'} onClick={() => {if(!sideNavOpen) setNavOpen(c => !c)}} />
        {navOpen && <SideMenu>
        <Link to="/" onClick={() => setNavOpen(false)}>
                <h2>Online Shop</h2>
            </Link>
            <Link to="/cart" onClick={() => setNavOpen(false)}>
                <MobileNavBag>
                    <i className="bi bi-handbag-fill" />
                    {cart.cartTotalQuantity > 0 ? <span className="bag-quantity">
                        <p>{cart.cartTotalQuantity}</p>
                    </span> : ""}
                    
                </MobileNavBag>
            </Link>
            {
                auth._id ? <>
                <Link to="/my-orders" onClick={() => setNavOpen(false)}><FaClipboard /> <p>Orders</p></Link>
                <Link to={`/user/${auth._id}`} onClick={() => setNavOpen(false)}><CgProfile /> <p>Profile</p></Link>
                {auth.isAdmin &&
                    <div>
                        <Link to="/1j34-admin-yt6g/summary" onClick={() => setNavOpen(false)}><FaTachometerAlt /> <p>Admin</p></Link>
                    </div>
                }
                <MobileLogout onClick={() => {
                    dispatch(logoutUser(null));
                    setNavOpen(false);
                    navigate("/");
                    toast.warning("You were logged out.", {
                        position: "bottom-left",
                    })
                }}>
                    <FaPowerOff /> <p>Logout</p>
                </MobileLogout>
                </> :
                <MobileAuthLinks>
                    <Link to="/login" onClick={() => setNavOpen(false)}>
                        <MdPower /> <p>Login</p>
                    </Link>
                    <Link to="/register" onClick={() => setNavOpen(false)}>
                        <BsPencilSquare /> <p>Register</p>
                    </Link>
                </MobileAuthLinks>
            }
            </SideMenu>}
    </>
  )
}

export default NavBar;

const DesktopNav = styled.div`
    height: 70px;
    background-color: black;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 4rem;
    box-shadow: 0 2px 5px 1px #111;
    align-items: center;
    position: sticky;
    top: 0;
    z-index: 1;
    @media(max-width: 800px) {
        display: none;
    }

    h2 {
        font-size: 40px;
        text-align: center;
    }

    a {
        text-decoration: none;
        color: white;

        &:hover {
            color:rgb(199, 42, 42);
        }
    }

`;

const FirstDiv = styled.div`
    display: flex;
    flex-direction: row;
    gap: 1rem;

    h2 {
        &:active {
            transform: scale(0.8);
        }
    }
`;

const SecondDiv = styled.div`
    display: flex;
    flex-direction: row;
    gap: 1rem;
`;

const NavBag = styled.div`
    display: flex;
    align-items: center;
    font-size: 30px;
    margin-left: 1rem;
    margin-right: 1rem;
    margin-top: 0.2rem;

    i {
        position: relative;
        &:active {
            transform: scale(0.8);
            transition: ease-out 200ms;
        }
    }

    span {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 25px;
        width: 25px;
        background: rgb(199, 42, 42);
        border-radius: 50%;
        font-size: 14px;
        font-weight: 700;
        color: white;
        inset: 0;
        position: absolute;
        top: 25px;
    }
`;

const Logout = styled.div`
  color: white;
  cursor: pointer;
  display: flex;
  gap: 1rem;
  &:hover {
    color:rgb(199, 42, 42);
  }
`;

const AuthLinks = styled.div`
  color: white;
  cursor: pointer;
  display: flex;
  gap: 1rem;
`;

const SideMenu = styled.div`
  height: 100%;
  position: fixed;
  top: 0;
  overflow-y: auto;
  width: 200px;
  display: flex;
  flex-direction: column;
  padding: 2rem;
  background-color: black;
  color: white;
  box-shadow: -5px -5px 10px rgba(255, 255, 255, 0.5), 2px 2px 5px rgba(94, 104, 121, 0.3);
  gap: 1rem;
  z-index: 1;

  @media(min-width: 800px) {
    display: none;
  }

  h2 {
    font-size: 20px;
    text-align: left;
    margin-top: 2rem;
  }

  a {
    text-decoration: none;
    color: white;
    display: flex;
    align-items: center;
    gap: 0.5rem;

    p {
        margin-top: 3px;
    }

    &:hover {
        color: rgb(233, 2, 2);
    }
  }
`;

const MobileNavBag = styled.div`
    display: flex;
    align-items: center;
    font-size: 30px;
    margin-left: 0;
    margin-right: 1rem;
    margin-top: 0.2rem;
    margin-bottom: 0.8rem;
    i {
        position: relative;
        &:active {
            transform: scale(0.8);
            transition: ease-out 200ms;
        }
    }

    span {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 25px;
        width: 25px;
        background: rgb(199, 42, 42);
        border-radius: 50%;
        font-size: 14px;
        font-weight: 700;
        color: white;
        inset: 0;
        position: absolute;
        top: 140px;
        left: 35px;
    }
`;

const MobileLogout = styled.div`
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    color:rgb(199, 42, 42);
  }
`;

const MobileAuthLinks = styled.div`
  color: white;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;