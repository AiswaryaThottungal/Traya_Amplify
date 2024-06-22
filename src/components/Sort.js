import React from "react";
import styled from "styled-components";
import { useFilterContext } from "../context/FilterContext";
import { Button } from "../styles/Button";

const Sort = () => {
  const { filter_products,getSortCriteria,setMobileFilter } = useFilterContext();
  const handleShowFilter =() =>{
    console.log("Button clicked")
    setMobileFilter(true);
  }
  return (
    <Wrapper className="sort-section">

       <div className="show-filters-btn">
        <Button onClick={handleShowFilter}>Show Filters</Button>
      </div>
           
      
      <div className="product-data">
        <p>{`${filter_products.length} Products Available`}</p>
      </div>

     

     
      <div className="sort-selection">
        <form action="#">
          <label htmlFor="sort"></label>
          <select
            name="sort"
            id="sort"
            className="sort-selection--style"
            onClick={getSortCriteria}>
            <option className="sort-option" value="lowest">Price(lowest)</option>            
            <option className="sort-option" value="highest">Price(highest)</option>            
            <option value="a-z">Alphabetically(a-z)</option>            
            <option value="z-a">Alphabetically(z-a)</option>
          </select>
        </form>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  display: flex;
  justify-content: space-between;
  margin-top: 5rem;
  
  .show-filters-btn{
    display:none;
    @media (max-width: ${({ theme }) => theme.media.mobile}) {
      display:flex;
    }
    
  }
  .sort-selection .sort-selection--style {
    padding: 0.5rem;
    cursor: pointer;    
    
  }
  
`;

export default Sort;
