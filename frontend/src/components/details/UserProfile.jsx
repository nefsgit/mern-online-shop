import styled from "styled-components";
import { useState, useEffect } from "react";
import axios from "axios";
import { setHeaders } from "../../features/functions";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import Forbidden from '../Forbidden';
import Spinner from "../Spinner";
import { Admin, Customer } from "../../global_styles/GlobalStyles.styled";

const UserProfile = () => {

  const params = useParams();
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.auth);
  const [user, setUser] = useState({
    name: "",
    email: "",
    isAdmin: false,
    password: "",
    old_password: "",
  });
  const [loading, setLoading] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [passwordOne, setPasswordOne] = useState("");
  const [passwordTwo, setPasswordTwo] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [mismatch, setMismatch] = useState(false);
  const [nameLength, setNameLength] = useState(false);
  const [passLength, setPassLength] = useState(false);
  const [changePass, setChangePass] =useState(false);

  // Sets the current user in the component
  useEffect(() => {
    setLoading(true);
    const fetchUser = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/users/find/${params.id}`, setHeaders());

        setUser({
          ...response.data,
          password: "",
          old_password: ""
        });
      } catch (error) {
        toast.error('Oops. Something went wrong. Please try again later.', {
          position: "bottom-left",
          autoClose: 2500,
        });
      }
      setLoading(false);
    }

    fetchUser();
  }, [params.id])

  // Redirects normal user trying to access another user's profile
  useEffect(() => {
    if (currentUser?._id !== params.id && !currentUser.isAdmin) {
      navigate(`/user/${currentUser._id}`);
      toast.error('You don\'t have permission to view the requested page.', {
        position: "bottom-left",
        autoClose: 2500,
      });
    }
  }, [currentUser._id, currentUser.isAdmin, navigate, params.id])
  
  // Checks for differences in the passwords once the suer starts typing them
  useEffect(() => {
    if(passwordOne === passwordTwo) {
        setMismatch(false);
    } else if(passwordOne !== passwordTwo && passwordOne.length > 0 && passwordTwo.length > 0) {
        setMismatch(true);
    }
  }, [passwordOne, passwordTwo])

  // Checks if username is at least 3 characters long
  useEffect(() => {
    if(user.name.length > 0 && user.name.length < 3) {
        setNameLength(true);
    } else {
        setNameLength(false);
    }
  }, [user.name])

  // Checks if password is at least 6 characters long
  useEffect(() => {
    if(passwordOne.length > 0 && passwordOne.length < 6) {
        setPassLength(true);
    } else {
        setPassLength(false);
    }
  }, [passwordOne])

  // Submits the form
  const handleSubmit = async (e) =>{
    e.preventDefault();
    setUpdating(true);

    try {
      if(!mismatch && !nameLength && user.name.length > 0 && user.email.length > 0 && !passLength && (passwordOne.length === passwordTwo.length)) {
        const response = await axios.put(`${process.env.REACT_APP_API_URL}/users/update/${params.id}`, {
          ...user
        }, setHeaders());

        setUser({...response.data, password: ""});
        toast.success("User updated", {
          position: "bottom-left",
          autoClose: 2500,
        });
        setPasswordOne("");
        setPasswordTwo("");
        setOldPassword("");
      }
    } catch (error) {
      toast.error(error.response.data, {
        position: "bottom-left",
        autoClose: 2500,
      });
      console.log(error);
    }

    setUpdating(false);
  }

  return (
    <>
    {currentUser?._id === params.id || currentUser?.isAdmin ?
    <StyledProfile>
      <ProfileContainer>
        {loading ? (
          <Spinner message="Loading user" />
        ) : (
          <form onSubmit={handleSubmit}>
            <h3>User Profile</h3>
            {user.isAdmin ? (
              <Admin>Admin</Admin>
            ) : (
              <Customer>Customer</Customer>
            )}
            <label htmlFor="name">Name</label>
            <input
              type='text'
              id='name'
              placeholder='Enter your name'
              value={user.name}
              required
              onChange={(e) => setUser({ ...user, name: e.target.value })}
            />
            <label htmlFor="email">Email</label>
            <input
              type='email'
              id='email'
              placeholder='Enter your email address'
              value={user.email}
              required
              readOnly={true}
              //onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
            {changePass && <>
            <label htmlFor="password">Current Password</label>
            <input
              type='password'
              id='password'
              placeholder='Enter your old password'
              value={oldPassword}
              onChange={(e) => {
                setOldPassword(e.target.value);
                setUser({...user, old_password: e.target.value})
              }}
            />
            <label htmlFor="password">New Password</label>
            <input
              type='password'
              id='password'
              placeholder='Enter your new password'
              value={passwordOne}
              onChange={(e) => setPasswordOne(e.target.value)}
            />
            <label htmlFor="password_two">Confirm Password</label>
            <input
              type='password'
              id='password_two'
              placeholder='Reenter your password'
              value={passwordTwo}
              onChange={(e) => {
                setPasswordTwo(e.target.value);
                setUser({...user, password: e.target.value});
                }}
            />
            </>
            }
            <ButtonContainer>
              {changePass ? <EditButton type="button" onClick={() => setChangePass(false)}>Hide</EditButton> :
              <EditButton type="button" onClick={() => setChangePass(true)}>Change Password</EditButton>}
              <button type="submit" className={updating ? "pending-button" : "register-button"}>
                {updating ? "Saving" : "Save"}
              </button>
            </ButtonContainer>
            {mismatch && <FormError>Your passwords do not match.</FormError>}
            {nameLength && <FormError>User name must be at least 3 characters long.</FormError>}
            {passLength && <FormError>Password must be at least 6 characters long.</FormError>}
          </form>
        )}
      </ProfileContainer>
    </StyledProfile> :
    <Forbidden />
    }
    </>
  )
}

export default UserProfile;

const StyledProfile = styled.div`
  margin: 3rem;
  display: flex;
  justify-content: center;
`;

const ProfileContainer = styled.div`
  max-width: 500px;
  width: 100%;
  height: auto;
  display: flex;
  box-shadow: rgba(100,100,111,0.2) 0px 7px 29px 0px;
  border-radius: 5px;
  padding: 2rem;
  form {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    max-width: 100%;

    h3 {
      margin-bottom: 0.5rem;
    }
    label {
      margin-top: 0.8rem;
    }
    input {
      padding: 7px;
      min-height: 30px;
      outline: none;
      border-radius: 5px;
      border: 1px solid rgb(182, 182, 182);
      margin: 0.3rem 0;
      max-width: 100%;

      &:focus {
        border: 1px solid rgb(0, 0, 0);
        box-shadow: 0 2px 5px 1px #111;
      }
    }
    button {
      @media(max-width:440px) {
        height: 60px;
      }
    }
    & > button:active {
      transform: scale(0.9);
    }
  }
`;

const FormError = styled.p`
  color: rgb(233, 2, 2);
  margin-top: 5px;
`;

const ButtonContainer = styled.div`
  width: 100%;
  max-width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 1rem;
  gap: 1rem;
`;

const EditButton = styled.button`
  height: 35px;
  width: 150px;
  max-width: 80%;
  padding: 7px;
  outline: none;
  border-radius: 5px;
  border: none;
  margin-bottom: 1rem;
  color: white;
  cursor: pointer;
  margin-left: auto;
  margin-right: auto;
  background-color: #0270ca;
  &:hover {
      background-color: #47a7f5;
  }
  @media(max-width:440px) {
    height: 60px;
  }
`;