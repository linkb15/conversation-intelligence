import styled from 'styled-components';
import React from 'react';
import SearchIcon from '../assets/img/search.svg';
const SearchInput = styled.input`
  background: #ffffff;
  border: 1px solid #dfe3e9;
  box-sizing: border-box;
  border-radius: 4px;
  padding: 8px 15px 7px 35px;
  font-size: 14px;
  line-height: 19px;
  /* identical to box height, or 136% */

  color: #7e8fa5;
  width: 100%;
  transition: all 0.5s;
  @media screen and (min-width: 768px) {
    width: 45%;
  }
`;

const SearchLabel = styled.label`
  position: relative;
  :before {
    content: '';
    position: absolute;
    left: 10px;
    top: 0;
    bottom: 0;
    width: 20px;
    background: url(${SearchIcon}) center / contain no-repeat;
  }
`;

const Search = props => {
  return (
    <SearchLabel>
      <SearchInput {...props} />
    </SearchLabel>
  );
};

export default Search;
