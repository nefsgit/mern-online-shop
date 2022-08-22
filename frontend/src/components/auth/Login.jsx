import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser } from '../../features/authSlice';
import clothing from '../../assets/Clothing.mp4';
import { LoginForm, LoginP, FormError, ButtonContainer, ShoppingVideo } from '../../global_styles/GlobalStyles.styled';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth)
  const [user, setUser] = useState({
    email: "",
    password: "",
  })
  
  const handleSubmit = (e) => {
    e.preventDefault();
        dispatch(loginUser(user));
  }

  useEffect(() => {
    if(auth._id) {
        navigate("/cart");
    }
  }, [auth._id, navigate]);

  return (
    <LoginForm onSubmit={handleSubmit}>
        <h2>Login</h2>

        <label htmlFor='email' className='form-label'>Email</label>
        <input type="email" required placeholder='Enter your email' name='email' onChange={(e) => setUser({...user, email: e.target.value})} />

        <label htmlFor='password1' className='form-label'>Password</label>
        <input type="password" required placeholder='Type your password' name='password1' onChange={(e) => setUser({...user, password: e.target.value})} />

        <ButtonContainer>
            <button type="submit" className={auth.loginStatus === "pending" ? "pending-button" : "register-button"}>
                {auth.loginStatus === "pending" ? "Logging" : "Login"}
            </button>
        </ButtonContainer>
        {auth.loginStatus === "rejected" ? <FormError>{auth.loginError}</FormError> : null}
        <LoginP>Don't have an account? <Link to="/register"><span>Create one.</span></Link></LoginP>
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

export default Login;