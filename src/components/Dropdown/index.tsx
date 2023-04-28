import { useRef, useState } from "react";
import styled from 'styled-components';
import { useOutsideAlerter } from "../../hooks/useOuterClick";

interface DropdownProps {
    onSelect: (value: string) => void;
    placeholder: string;
    options: {
        value: string;
        title: string;
    }[];
}

const DropdownSearch = styled.div`
  position: relative;
  background-color: #fff;
  z-index: 2000;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  border: 1px solid #bdbdbd;
  border-radius: ${(props: { $open: any; }) =>  !props.$open ? 'var(--def-input-border-radius)' : 'var(--def-input-border-radius) var(--def-input-border-radius) 0 0'};
  `;

const SearchForm = styled.form`
  position: relative;
  width: 100%;
  overflow: hidden;
  border-radius: var(--def-input-border-radius);
`;

const Border = styled.div`
  height: 1px;
  width: 90%;
  border-top: 1px solid #bdbdbd;
  margin: 0 auto;
`;

const FormResults = styled.ul`
  border: 1px solid #bdbdbd;
  border-top: none;
  border-radius: 0 0 var(--def-input-border-radius) var(--def-input-border-radius);
  position: absolute;
  top: 100%;
    width: calc(100% + 2px);
    max-height: 200px;
    overflow-y: auto;
    background-color: #fff;
    padding: 0;
    margin: 0;
    list-style: none;
`;

const Option = styled.li`
    color: #000;
    text-align: left;
    padding: 0.75em 1.5em;
    cursor: pointer;
    &:hover {
        background-color: #eee;
    }
`;


export const Dropdown = ({ onSelect, placeholder, options }: DropdownProps) => {
    const [searchVal, onSetSearchVal] = useState('');
    const [focused, onSetFocused] = useState(false);
    const [listOptions, setListOptions] = useState(options);
    const searchInput = useRef<HTMLInputElement>(null);
    const dropdownSearch = useRef<HTMLDivElement>(null);
    
    useOutsideAlerter(dropdownSearch, () => onSetFocused(false));
    
    const handleSelect = (e: React.MouseEvent, value: string) => {
        e.stopPropagation();
        onSelect(value);
        onSetFocused(false);
    }
    
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setListOptions(options.filter(option => option.title.toLowerCase().includes(e.target.value.toLowerCase())));
        onSetSearchVal(e.target.value);
    }
    
    return (
        <DropdownSearch className="dropdown-search" ref={dropdownSearch} onClick={() => onSetFocused(true)} $open={focused}>
          <SearchForm autoComplete="off">
            <svg 
              onMouseDown={(e) => {e.preventDefault()}}
              onClick={() => searchInput.current && searchInput.current.focus()}
              xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#000" className="search-icon bi bi-search" viewBox="0 0 16 16">
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
            </svg>
            <svg 
              onMouseDown={(e) => {e.preventDefault()}}
              onClick={() => {onSetSearchVal(''); searchInput.current && searchInput.current.focus();}}
              xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#000" className="close-icon bi bi-x" viewBox="0 0 16 16">
              <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
            </svg>
            <input 
              ref={searchInput}
              type="search" 
              value={searchVal} 
              placeholder={placeholder}
              onChange={handleSearch} />
          </SearchForm>
          
          {/* Results */}
          { focused && <>
            <Border />
            <FormResults>
              {/* Get Parks */}
              {/* Make a list of parks with a click event that handles the select and innerHTML is the option title*/}
              {listOptions.map((option) => (
                <Option onClick={(event: React.MouseEvent) => handleSelect(event, option.value)} key={option.value}>{option.title}</Option>
                ))}
            </FormResults>
          </> 
          }
        </DropdownSearch>
    );
};
