import React, { useState } from "react";
import { NavLink,useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FiShoppingCart, FiUser } from "react-icons/fi";
import { useCartContext } from "../context/CartContext";
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import {toast, Toaster} from 'react-hot-toast';
import Cookies from 'universal-cookie';


const ActionHeader = () => {
    const [dashboard, setDashboard] = useState(false);  
  const {total_item, addCartToDB, clearCart} =useCartContext();
  const userAPI = process.env.REACT_APP_USER_URL;
  const cookies= new Cookies();
  const { authUser,
    setAuthUser,
    isLoggedIn,
    setIsLoggedIn,
    userLogout} = useAuth();


 const navigate = useNavigate();
 axios.defaults.withCredentials = true;

const handleLogout= async() =>{
    
    try{
        // clear the user cart in DB and then add the updated local cart to DB
        let response = await axios.delete(userAPI + "clear-cart",
            {
                headers:{
                    "Authorization" : `Bearer ${cookies.get('accessToken')}`
                }
            })
        response= await addCartToDB();
        console.log(response)
        // clear the local cart
        if(total_item>0){
            clearCart();
        }        
        response = userLogout();   

        console.log(response.data)        
        toast.success("User Logged Out");
        setIsLoggedIn(false);
        setAuthUser(null);
        navigate('/login');
        
    }catch(error){
        console.log(error)
        toast.error(error)
    }
    
}

    return (
        <ActionNav>
            
            <div className="offer-info">
            <h3 className="shipping-offer">This website is under maintenance. Orders are not accepted</h3>
            </div>

            <div className="action-bar">
            <ul className="action-list">       
                 
                <li >
                    <div className="dashboard-menu">
                        <button className="dropdown-button">
                            <FiUser className="action-link user--icon"
                            
                            /> 
                        </button>
                        <ul className='dashboard-items'>
                            <li >
                                {isLoggedIn ? 
                                    <button id='logout-btn' className="dashboard-link"
                                        onClick={handleLogout} >                                   
                                        
                                            Log Out
                                    </button>                  
                                
                                :    
                                    <NavLink className="dashboard-link"
                                        to="/login">                              
                                        
                                            Log In
                                    </NavLink> 
                                }           
                            </li>
                            <li >
                                <NavLink className="dashboard-link"
                                    to="/profile " >                               
                                   
                                        Profile
                                </NavLink> 
                            </li>
                            <li >
                                <NavLink className="dashboard-link"
                                    to="/cart"  >                            
                                    
                                        Cart
                                </NavLink> 
                            </li>
                        </ul>
                    </div>
                             
                    
                </li>  
                <li>
                    <NavLink to="/cart" className="action-link cart--link">
                    <FiShoppingCart className="cart-icon" />
                    {total_item === 0 ?
                        <span className="cart-label">Cart</span>
                    :
                    <span className="cart-total--item"> {total_item} </span>
                    }
                    
                    </NavLink>
                </li>    
            </ul>

            </div>
            
        </ActionNav>
    );
}


const ActionNav = styled.nav`
width:100%;
display:flex;
justify-content: space-between;
position:relative;

.offer-info {
    position:absolute;
    left:50%;
    transform: translateX(-50%);
    margin-top:0.5rem;  
    color: ${({ theme }) => theme.colors.white};  
    font-size:2.5rem;
    @media (max-width: ${({ theme }) => theme.media.tab}) {
        left:30%;
        font-size:1.8rem;
    }
    @media (max-width: ${({ theme }) => theme.media.mobile}) {
        font-size:1.4rem;
    }
    
}
.action-bar {
     
    width:20%; 
    position:absolute;
    right:0;
    margin-top:0.5rem; 
    display: flex;
    justify-content:center;
    align-items:center;
    .action-list {
        display:flex;
        gap: 4.8rem;
        align-items: center;           
        list-style-type:none; 
        .action-link {
            position:relative;           
            margin-right:2 rem;           
            font-size: 3.2rem;
            color: ${({ theme }) => theme.colors.white};  
            @media (max-width: ${({ theme }) => theme.media.tab}) {
                font-size:2rem;
            }
            @media (max-width: ${({ theme }) => theme.media.mobile}) {
                font-size:2rem;
            }          
            &:link,
            &:visited {
              display: inline-block;
              text-decoration: none;
              font-size: 1.8rem;
              font-weight: 500;
              text-transform: uppercase;
              
              transition: color 0.3s linear;             
            }
    
            &:hover,
            &:active {
              color: ${({ theme }) => theme.colors.helper};
            }
        }

        .dropdown-button {
            background-color: ${({ theme }) => theme.colors.secondary};
            padding:0.2rem;
            color: white;           
            font-size: 16px;
            border: none;
            @media (max-width: ${({ theme }) => theme.media.tab}) {
                font-size:12px;
            }
            @media (max-width: ${({ theme }) => theme.media.mobile}) {
                font-size:10px;
            }
          }
        .dashboard-menu{
            position: relative;
            display: inline-block;
            
        }
        .dashboard-items {
            display: none;
            position: absolute;
            background-color: ${({ theme }) => theme.colors.bg};
            
            width:10vw;
            margin-right:0;
            padding:2rem;
            box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
            z-index: 1;
            @media (max-width: ${({ theme }) => theme.media.mobile}) {
                font-size:1rem;
                width:20vw;
            }   
        }
        .dashboard-link {
            padding: 12px 16px;
            text-decoration: none;           
            font-size: 2rem; 
            display: block;
            cursor:pointer;
            &:link,
            &:visited {
                color: ${({ theme }) => theme.colors.black};
                
            }
            &:hover,           
            &:active {                   
                color: ${({ theme }) => theme.colors.helper};
            }
        }
        #logout-btn{
            background-color: ${({ theme }) => theme.colors.bg};
            border:none;
            
            &:visited {
                color: ${({ theme }) => theme.colors.black};
                
            }
            &:hover,
            &:active {                   
                color: ${({ theme }) => theme.colors.helper};
            }

        }
        .dashboard-items a:hover {background-color: ${({ theme }) => theme.colors.bg} ;}

        .dashboard-menu:hover .dashboard-items {display: block;}

       
       /*  #dashboard-items {
            display:none;

        }
         .dashboard-link {
            font-size: 2rem;            
            padding: 1rem;
        
        } 
        #dashboard-menu:hover #dashboard-items {
            background-color: ${({ theme }) => theme.colors.bg};
            display : block;
            position:absolute;
            top: 4.5rem;
            z-index:1000;
            padding: 0rem 2rem;           
           
        } */
       
          .cart--link {
            position: relative;
    
            .cart-icon {
              position: relative;
              font-size: 3.2rem;
            }
    
            .cart-total--item {
              width: 4.2rem;
              height: 4.2rem;
              font-size: 2rem;
            }
          }
          .user--icon{
            font-size:3.2rem;
          }
    
    } 
}

`;

export default ActionHeader;