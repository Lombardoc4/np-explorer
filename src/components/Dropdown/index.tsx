import { useRef, useState } from "react";
import { clsx } from "clsx";

import { useOutsideAlerter } from "../../utils/hooks/useOuterClick";

// import { DropdownSearch, SearchForm, FormResults, Item } from "./styled";
import MagnifierIcon from "../../assets/icons/magnifier.svg?react";
import XIcon from "../../assets/icons/x.svg?react";
import { Results } from "./Results";

export interface IItem {
    value: string;
    title: string;
}

interface IDropdown {
    options: IItem[];
    onSelect: (value: string) => void;
    placeholder?: string;
    style?: React.CSSProperties;
}

export const Dropdown = ({ onSelect, placeholder, options, style }: IDropdown) => {
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
        <div
            style={style}
            className={clsx(
                "text-left z-20 bg-white text-black lg:absolute w-full max-w-md border rounded-lg mx-auto flex justify-center items-center",
                focused && "rounded-b-none"
            )}
            ref={dropdownSearch}
            onClick={() => setFocused(true)}
        >
            <form className='relative w-full overflow-hidden flex items-center text-current' autoComplete='off'>
                <MagnifierIcon className='absolute left-3' />
                <XIcon className='absolute right-3 cursor-pointer' onClick={clearInput} />
                <input
                    className='w-full px-[42px] h-12 outline-0'
                    value={searchVal}
                    onChange={handleSearch}
                    placeholder={placeholder}
                    ref={searchInput}
                />
            </form>

            {/* Results */}
            {focused && options.length > 0 && <Results items={items} onSelect={(value) => handleSelect(value)} />}
        </div>
    );
};
