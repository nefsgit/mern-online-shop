import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../../features/authSlice';
import clothing from '../../assets/Clothing.mp4';
import { LoginForm, FormError, ButtonContainer, ShoppingVideo } from '../../global_styles/GlobalStyles.styled';

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth)
  const [passwordOne, setPasswordOne] = useState("");
  const [passwordTwo, setPasswordTwo] = useState("");
  const [mismatch, setMismatch] = useState(false);
  const [nameLength, setNameLength] = useState(false);
  const [passLength, setPassLength] = useState(false);
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  })
  
  const handleSubmit = (e) => {
    e.preventDefault();

    if(!mismatch && !nameLength && !passLength) {
        dispatch(registerUser(user));
    }
  }

  useEffect(() => {
    if(auth._id) {
        navigate("/cart");
    }
  }, [auth._id, navigate]);

  useEffect(() => {
    if(passwordOne === passwordTwo) {
        setMismatch(false);
    } else if(passwordOne !== passwordTwo && passwordOne.length > 0 && passwordTwo.length > 0) {
        setMismatch(true);
    }
  }, [passwordOne, passwordTwo])

  useEffect(() => {
    if(user.name.length > 0 && user.name.length < 3) {
        setNameLength(true);
    } else {
        setNameLength(false);
    }
  }, [user.name])

  useEffect(() => {
    if(passwordOne.length > 0 && passwordOne.length < 6) {
        setPassLength(true);
    } else {
        setPassLength(false);
    }
  }, [passwordOne])

  return (
        <LoginForm onSubmit={handleSubmit}>
            <h2>Register</h2>
            <label htmlFor='name'>User Name</label>
            <input type="text" required placeholder='Must be at least 3 characters long' name='name' onChange={(e) => setUser({...user, name: e.target.value})} />

            <label htmlFor='email'>Email</label>
            <input type="email" required placeholder='Must be valid and unique' name='email' onChange={(e) => setUser({...user, email: e.target.value})} />

            <label htmlFor='password1'>Password</label>
            <input type="password" required placeholder='Must be at least 6 characters long' name='password1' onChange={(e) => setPasswordOne(e.target.value)} />

            <label htmlFor='password2'>Confirm Password</label>
            <input type="password" placeholder='Reenter Password' name='password2' onChange={(e) => {
                setPasswordTwo(e.target.value);
                setUser({...user, password: e.target.value});
                }} />
            <ButtonContainer>
                <button type="submit" className={auth.registerStatus === "pending" ? "pending-button" : "register-button"}>
                    {auth.registerStatus === "pending" ? "Submitting" : "Register"}
                </button>
            </ButtonContainer>
            {mismatch && <FormError>Your passwords do not match.</FormError>}
            {nameLength && <FormError>User name must be at least 3 characters long.</FormError>}
            {passLength && <FormError>Password must be at least 6 characters long.</FormError>}
            {auth.registerStatus === "rejected" ? <FormError>{auth.registerError}</FormError> : null}
            <ShoppingVideo 
              src={clothing}
              type="video/mp4"
              loop
              controls={false}
              muted
              autoPlay
            />
        </LoginForm>
  )
}

export default Register;