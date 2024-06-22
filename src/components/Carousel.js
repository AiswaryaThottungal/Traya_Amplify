import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import {NavLink} from "react-router-dom";
import { Button } from '../styles/Button';



function Carousel({images})  {
    
  const [current,setCurrent] = useState(0);    
  const slideLeft = () =>{
    setCurrent(current === 0 ? images.length-1 : current-1); 
  };
  const slideRight = () =>{
    setCurrent(current=== images.length-1 ? 0 : current+1);
  };    
  const Carousel = styled.div`
        .carousel{
            display: flex;            
            width:100vw;
            height: 88vh;
           
            
        }
        .carousel-wrapper{
            position: relative;
            width: 100vw;
            height: auto;
            
        }
        
        .carousel-card{
            
            display:flex;
            justify-content: space-around;
            position: absolute;
            width: 100%;
            height: 100%;
            overflow: hidden;
            border-radius: 20px;
            opacity: 0;
            pointer-events: none;
            transform: scale(0.8);
            transition: 0.5s ease-in-out;
            
        }

        .carousel-card-active{
            opacity: 1;
            transform: scale(1);
            pointer-events: visible;
        }
        .card-image{
            width: 100%;
            
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .card-overlay{
            position: absolute;
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: row;
            padding: 2rem 4rem;
            background-color:${({ theme }) => theme.colors.white};
            
            align-items: center;
        }

        .card-content{
            
            align-items: center;
            justify-content: center;
            padding-right: 5rem;
            padding-left: 5rem;
        }
        .card-title{
            color: ${({ theme }) => theme.colors.secondary};
            font-size: x-large;
            margin-bottom:2rem;
            
        }
        .image-section{
            
            
            width: 80%;
            height: 100%;
        }

        .carousel-arrow-left,
        .carousel-arrow-right {
            position: absolute;
            font-size: 40px;
            top: 50%;
            transform: translate(0,-50%);
            background-color: gainsboro;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 30px;
            height: 30px;
            border-radius: 50%;
            padding-bottom: 7px;
            cursor: pointer;
        }

        .carousel-arrow-left{
            left: 15px;
        }

        .carousel-arrow-right{
            right: 15px;
        }

        .carousel-pagination{
            position: absolute;
            bottom: 5px;
            left: 50%;
            transform: translate(-50%,0);
        }

        .pagination-dot{
            height: 10px;
            width: 10px;
            background-color: #f5f5f5;
            border-radius: 50%;
            display: inline-block;
            margin-left: 10px;
            cursor: pointer;
        }

        .pagination-dot:hover{
            transform: scale(1.2);
        }

        .pagination-dot-active{
            background-color: grey;
        } 
        
        

        @media (max-width: ${({ theme }) => theme.media.mobile}) {
            .carousel{                        
               
                height: 35vh;               
                
            }
            .card-overlay{
               
                width: 100%;
                height: 100%;
                
                
            }
            .card-title{
               
                font-size: small;               
                
            }
            .carousel-arrow-left,
            .carousel-arrow-right {                
                font-size: 20px;
                top: 50%;               
                width: 15px;
                height: 15px;
                border-radius: 50%;
                padding-bottom: 4px;
             
            }
            .carousel-arrow-left{
                left: 8px;
            }
    
            .carousel-arrow-right{
                right: 8px;
            }
            .pagination-dot{
                height: 5px;
                width: 5px;
                
                margin-left: 5px;
                
            }
        }

        @media (max-width: ${({ theme }) => theme.media.tab}) {
            .carousel{                        
               
                height: 50vh;               
                
            }
            .card-overlay{
               
                width: 100%;
                height: 100%;
                
                
            }
            .card-title{
               
                font-size: small;               
                
            }
            .carousel-arrow-left,
            .carousel-arrow-right {                
                font-size: 20px;
                top: 50%;               
                width: 15px;
                height: 15px;
                border-radius: 50%;
                padding-bottom: 4px;
             
            }
            .carousel-arrow-left{
                left: 8px;
            }
    
            .carousel-arrow-right{
                right: 8px;
            }
            .pagination-dot{
                height: 5px;
                width: 5px;
                
                margin-left: 5px;
                
            }
        }
    `;
  useEffect(()=>{
    setTimeout(() => {slideRight()},4000);
  });

  return (
    <Carousel>
    <div className="carousel">
        <div className="carousel-wrapper">
            
            
            {images.map((image,index)=>{
                return(
                    <div key={index} className={index ===current ? "carousel-card carousel-card-active" : "carousel-card"}> 
                        
                        <div className="card-overlay">
                            <div className='card-content'>
                                <h2 className="card-title">{image.title}  </h2>
                                <NavLink to='/products'>
                                    <Button> SHOP NOW!</Button>
                                </NavLink>                                
                            </div>
                            <div className='image-section'>                          
                            
                                <figure>
                                    <img className='card-image' src={image.source} alt={image.title}/>
                                </figure>
                            </div>
                             
                            
                        </div>                        
                        

                    </div>
                )
            })}
            <div className='carousel-arrow-left' onClick={slideLeft}>&lsaquo;</div>
            <div className='carousel-arrow-right' onClick={slideRight}>&rsaquo;</div>
            <div className='carousel-pagination'>
                {images.map((_,index) => {
                    return(
                        <div key={index} className={index ===current ? "pagination-dot pagination-dot-active" : "pagination-dot"}
                            onClick={() => setCurrent(index)}>                         
                        </div>
                    )
                })}
            </div>
        </div>
    </div>
    </Carousel>
  )
}

export default Carousel;