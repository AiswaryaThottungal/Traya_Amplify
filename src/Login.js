import React, { useState } from "react";
import styled from 'styled-components';
import { Button } from './styles/Button';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, Toaster } from 'react-hot-toast';
import { useAuth } from './context/AuthContext';
import { useCartContext } from "./context/CartContext";
import Cookies from 'universal-cookie';

const Login = () => {
    const LOGIN_URL = process.env.REACT_APP_USER_URL.concat('login');
     const { authUser,
         setAuthUser,
         isLoggedIn,
         setIsLoggedIn,
         userLogin
     } = useAuth();

   // const { loginState, setLoginState } = useAuth();
    const { getUserCart } = useCartContext();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })


    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    axios.defaults.withCredentials = true;
    const handleSubmit = async (e) => {
        e.preventDefault();
        let validationErrors = {};
        if (formData.email === '' || formData.email === null) {
            validationErrors.email = "Email Required";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            validationErrors.email = "Email is not Valid";
        }
        if (formData.password === '' || formData.password === null) {
            validationErrors.password = "Password Required";
        } else if (formData.password.length < 8) {
            validationErrors.password = "Password should containn atleast 8 characters";
        }
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            try {
                //const response = await axios.post(LOGIN_URL, formData);
                
                //document.getElementById("login-form").reset();
                const response = await userLogin(formData);
                if (response.status === 400) {
                    toast.error("Invalid Credentials! Please try again.")
                    //throw new Error("Invalid Credentials")
                }
                else {
                    const userData = response.data;
                    const accessToken = userData.token;
                    console.log(accessToken)
                    console.log(response);
                    const cookies = new Cookies();
                    cookies.set("accessToken", accessToken);
                    toast.success("User Logged In");
                    const newUser = {
                        userId: userData._id,
                        firstName: userData.firstname,
                        lastName: userData.firstname,
                        email: userData.email,
                        address: userData.address,
                        wishlist: userData.wishlist
                    }
                    setAuthUser(newUser);

                    setIsLoggedIn(true);


                    // get user cart from DB
                    let cart = await getUserCart();
                    console.log("Get User Cart")
                    console.log(cart);

                    navigate('/');

                }               
                 
                
            }
            catch (error) {
                console.log(error.response)
                toast.error(error?.response?.data?.message)
            }

        }


    }
    function handleChange(e) {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }
    return (
        <>
            <LoginWrapper>
                <div className='login-container'>
                    <form className='login-form' id='login-form' autoComplete='off' onSubmit={handleSubmit}>


                        <h2 className='text'>Login</h2>

                        <div className='input-container'>

                            <input className='input' label='Email Id' name='email' placeholder='Enter email-id' type='email' value={formData.email} onChange={handleChange} ></input>
                            {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
                            <input className='input' label='Password' name='password' placeholder='Enter Password' type='password' value={formData.password} onChange={handleChange}></input>
                            {errors.password && <p style={{ color: "red" }}>{errors.password}</p>}
                        </div>
                        <Button type='submit'> Submit</Button>

                    </form>
                    <div className='signup-container'>
                        <p>Don't Have an Account?</p>
                        <Link to='/signup'>
                            <button className='link-button'>Sign Up Here!</button>
                        </Link>
                    </div>
                    <Toaster position="top-center" toastOptions={{
                        style: {
                            border: '1px solid black',
                            fontSize: '20px',
                            padding: '16px'
                        }
                    }} />
                </div>
            </LoginWrapper>


        </>
    )
}

const LoginWrapper = styled.div`
        width: 100vw;   
        height: auto;    
        display: flex;    
        border: none;   
        margin-top: 5rem;
        margin-bottom: 5rem;
        padding: 2rem;
        align-items: center;
        justify-content: center;
        
    .login-container{
        align-items: center;
        justify-content: center;
    }
    .login-form{
        padding: 40px;
        width:25vw;
        background-color: ${({ theme }) => theme.colors.white};
        border: 1px solid ${({ theme }) => theme.colors.secondary};     
        margin-bottom: 5%;
        margin-top: 2%;
        box-shadow: 24;
        border-radius: 1em;
        text-align: center;
        align-items: center;
        justify-content: center;
        @media (max-width: ${({ theme }) => theme.media.tab}) {
            width:50vw;
        }
        @media (max-width: ${({ theme }) => theme.media.tab}) {
            width:60vw;
        }
    }
    .signup-container{
        text-align: center;
        align-items: center;
        justify-content: center;       
    }

    
    .text{
        color: ${({ theme }) => theme.colors.primary};
        font-size: 35px;
        font-weight: 500;
        padding:2rem;
    }
    .input-container{
        display: flex;
        flex-direction: column;  
        padding:2rem;
        .input{
            padding: 1rem;
            margin: 1rem;
            border-color: ${({ theme }) => theme.colors.secondary};
        }
    }
    .link-button {
        text-decoration: underline;
        max-width: auto;
        background-color:${({ theme }) => theme.colors.white};
        color:${({ theme }) => theme.colors.contrast};
        padding: 1.2rem 2.2rem;
        margin-top: 1rem;
        border:none;
        border-radius: 1rem;        
        text-align: center;
        cursor: pointer;
        transition: all 0.3s ease;
        -webkit-transition: all 0.3s ease 0s;
        -moz-transition: all 0.3s ease 0s;
        -o-transition: all 0.3s ease 0s;

        &:hover,
        &:active {            
            transform: scale(0.96);
        }
    }
   
    `;
export default Login;