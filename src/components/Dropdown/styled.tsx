import styled from "styled-components";

interface DropdownSearchProps {
    $open: boolean;
}

export const DropdownSearch = styled.div<DropdownSearchProps>`
    position: absolute;
    background-color: #fff;
    /* background-color: ${({ theme }) => theme.colors.grey}; */
    z-index: ${({ theme }) => theme.zIndex.dropdown};
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    max-width: 500px;
    margin: 0 auto;
    border: 1px solid #bdbdbd;
    border-radius: ${(props: { $open: any }) =>
        !props.$open
            ? "var(--def-input-border-radius)"
            : "var(--def-input-border-radius) var(--def-input-border-radius) 0 0"};
`;

export const SearchForm = styled.form`
    background-color: #fff;
    /* background-color: ${({ theme }) => theme.colors.grey}; */

    position: relative;
    width: 100%;
    overflow: hidden;
    border-radius: var(--def-input-border-radius);
`;


export const FormResults = styled.ul`
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

export const Item = styled.li`
    color: #000;
    text-align: left;
    padding: 0.75em 1.5em;
    cursor: pointer;
    &.hover {
        background-color: #eee;
    }
`;