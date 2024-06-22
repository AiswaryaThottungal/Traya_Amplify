import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useFilterContext } from '../context/FilterContext';
import FormatPrice from '../helpers/FormatPrice';
import { Button } from '../styles/Button';


const FilterSection = () => {
  const {
    mobileFilter,
    setMobileFilter,
    filters: { text, category, fabric, size, maxPrice, price, minPrice },
    all_products,
    updateFilterValue,
    clearFilters
  } = useFilterContext();

  console.log(mobileFilter)


  //Get unique values for an attribute
  const getUniqueData = (data, attribute) => {
    let attributeValues = data.map((currentItem) => {
      return currentItem[attribute];
    });
    if (attribute === "size") {
      return attributeValues = ["All", ...new Set([].concat(...attributeValues))];
    }
    else {
      return attributeValues = ["All", ...new Set(attributeValues)];
    }

  }

  const handleClearFilter = () => {

    const select = document.getElementById('size');
    select.selectedIndex = 0;
    clearFilters();
    setMobileFilter(false);
  }
  const closeFilter = () => {
    setMobileFilter(false);
  }

  //Retrieving unique values for each filter field
  const categoryValues = getUniqueData(all_products, "category");
  const fabricValues = getUniqueData(all_products, "fabric");

  const sizeValues = ["All", "0-3M", "3-6M", "6-12M", "1-2Y", "2-3Y", "3-4Y", "4-5Y", "5-6Y", "6-7Y", "7-8Y", "S", "M", "L", "XL"];
  //const sizeData = getUniqueData(all_products,"sizeAvailable");  
  // const sizeValues = getUniqueData(sizeData,"size");



  return (
    <Wrapper>
      <div className={mobileFilter ? "filter active" : "filter"}>
        <div className='filter-actions'>
          <div className='close-filter'>
            <button className='action-btn' onClick={closeFilter}>Back</button>
          </div>
          <div className='filter-clear'>
            <button className='action-btn' onClick={handleClearFilter}>Clear Filters</button>
          </div>

        </div>

        <div className='filter-search'>
          <form onSubmit={(e) => e.preventDefault()}>
            <input
              type='text'
              name='text'
              value={text}
              placeholder='Search'
              onChange={updateFilterValue}
            />
          </form>
        </div>

        <div className='filter-category'>
          <h3>Category</h3>
          <div>
            {categoryValues.map((currentItem, index) => {
              return <button key={index}
                type="button"
                name="category"
                value={currentItem}
                className={currentItem === category ? "active" : ""}
                onClick={updateFilterValue}>
                {currentItem}
              </button>
            })}
          </div>
        </div>
        <div className='filter-fabric'>
          <h3>Fabric</h3>
          <div>
            {fabricValues.map((currentItem, index) => {
              return <button key={index}
                type="button"
                name="fabric"
                value={currentItem}
                className={currentItem === fabric ? "active" : ""}
                onClick={updateFilterValue}>
                {currentItem}
              </button>
            })}
          </div>
        </div>
        <div className='filter-size'>
          <h3>Size</h3>
          <div>
            <select name='size'
              id='size'
              onClick={updateFilterValue}>
              {sizeValues.map((currentItem, index) => {
                return <option key={index}
                  value={currentItem}
                  name="size">
                  {currentItem}
                </option>
              })}
            </select>
          </div>
        </div>

        <div className='filter-price'>
          <h3>Price</h3>
          <p><FormatPrice price={price} /></p>
          <div>
            <input type='range' name="price" id='price' min="100" max={maxPrice} value={price} step='any' onChange={updateFilterValue} />
          </div>

        </div>

        <div className='filter-apply'>
          <Button onClick={closeFilter}>Apply</Button>
        </div>


      </div>
    </Wrapper>
  )
}
const Wrapper = styled.section`
  padding: 5rem 0;
  display: flex;
  flex-direction: column;
  gap: 3rem;
  
  .filter{

    
    @media (max-width: ${({ theme }) => theme.media.mobile}) {
      
      display:none;
    }
    
  }
  .active{
   display:block;
   
  }
  .filter-actions{
      display:flex;
      flex-direction:column;
  }
  .action-btn{
    text-decoration: underline;
    max-width: auto;
    background-color:${({ theme }) => theme.colors.white};
    color: ${({ theme }) => theme.colors.secondary};
    padding: 0;
    border: none;    
    
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
  .close-filter{
    display:none;
    @media (max-width: ${({ theme }) => theme.media.mobile}) {
      
      display:flex;
    }
  }
  h3 {
    padding: 2rem 0;
    font-size: bold;
    color: ${({ theme }) => theme.colors.text};
    font-weight:bold;
  }

  .filter-search {
    input {
      padding: 0.6rem 1rem;
      width: 80%;
    }
  }

  .filter-category, .filter-fabric {
    div {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 1.4rem;
      margin-top: 0;
      margin-bottom: 1rem;
      button {
        border: none;
        background-color: ${({ theme }) => theme.colors.white};        
        cursor: pointer;

        &:hover {
          color: ${({ theme }) => theme.colors.secondary};
        }
      }

      .active {
        border-bottom: 1px solid #000;
        color: ${({ theme }) => theme.colors.secondary};
      }
    }
  }

  .filter-size {
    padding: 0.3rem 0rem;

    font-size: 1.6rem;
    color: ${({ theme }) => theme.colors.text};
    text-transform: capitalize;
  }

 

  .filter-price {
    input[type="range"] {
      -webkit-appearance: none;
      background: transparent;
      margin: 0;
      padding: 0;
      box-shadow: none;      
      cursor: pointer;
    }
    input[type="range"]::-webkit-slider-runnable-track {
      background:${({ theme }) => theme.colors.primary};
      height: 0.5rem;
    }
    input[type="range"]::-webkit-slider-thumb {
      -webkit-appearance: none; /* Override default look */
      appearance: none;
      margin-top: -6px; /* Centers thumb on the track */
      background-color: ${({ theme }) => theme.colors.secondary};
      border-radius: 50%;
      height: 1.5rem;
      width: 1.5rem;    
    }
  }

  .filter-clear{
    margin-bottom:4rem;
  }
  .filter-apply{
    margin-top:4rem;
    display:none;
    @media (max-width: ${({ theme }) => theme.media.mobile}) {
      
      display:block;
    }
  }
  
 
`;

export default FilterSection;
