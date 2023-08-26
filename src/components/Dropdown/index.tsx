import { useRef, useState } from "react";

import { useOutsideAlerter } from "../../utils/hooks/useOuterClick";

import { DropdownSearch, SearchForm, FormResults, Item } from "./styled";
import { MagnifierIcon, XIcon } from "../../assets/icons";

interface IItem {
    value: string;
    title: string;
}

interface IResults {
    items: IItem[];
    onSelect: (value: string) => void;
}

interface IDropdown {
    options: IItem[];
    onSelect: (value: string) => void;
    placeholder?: string;
}

export const Dropdown = ({ onSelect, placeholder, options }: IDropdown) => {
    const [searchVal, onSetSearchVal] = useState(""); // Input val
    const [items, setItems] = useState(options); // Options appearing in list
    const [focused, setFocused] = useState(false); // Input focus

    // Make input ref to allow focusing
    const searchInput = useRef<HTMLInputElement>(null);

    // Click outside of search closes search
    const dropdownSearch = useRef<HTMLDivElement>(null);
    useOutsideAlerter(dropdownSearch, () => setFocused(false));

    const handleSelect = (value: string) => {
        onSelect(value);
        setFocused(false);
    };

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setItems(options.filter((option) => option.title.toLowerCase().includes(e.target.value.toLowerCase())));
        onSetSearchVal(e.target.value);
    };

    const clearInput = () => {
        onSetSearchVal("");
        setItems(options);
    };

    return (
        <DropdownSearch
            className='dropdown-search'
            $open={focused}
            ref={dropdownSearch}
            onClick={() => setFocused(true)}
        >
            <SearchForm autoComplete='off'>
                <MagnifierIcon />
                <XIcon className="close-icon" onClick={clearInput} />
                <input
                    type='search'
                    value={searchVal}
                    placeholder={placeholder}
                    ref={searchInput}
                    onChange={handleSearch}
                />
            </SearchForm>

            {/* Results */}
            {focused && (
                <FormResults>
                    <Results items={items} onSelect={(value) => handleSelect(value)} />
                </FormResults>
            )}
        </DropdownSearch>
    );
};

const Results = ({ items, onSelect }: IResults) => {
    const toggleClass = (e: React.MouseEvent) => {
        (e.target as HTMLLIElement).classList.toggle("hover");
    };

    if (items.length <= 0) return <Item>No Matches</Item>;

    return (
        <>
            {items.map((i) => (
                <Item
                    key={i.value}
                    onMouseEnter={toggleClass}
                    onMouseLeave={toggleClass}
                    onClick={() => {
                        onSelect(i.value);
                    }}
                >
                    {i.title}
                </Item>
            ))}
        </>
    );
};
