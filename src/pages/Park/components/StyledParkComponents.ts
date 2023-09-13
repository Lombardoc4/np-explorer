import { styled } from "styled-components";

export const StyledParkHeader = styled.header`
    margin: 2rem auto 1em;
    display: flex;
    flex-direction: column-reverse;
    gap: 1em;

    @media (min-width: 768px) {
        flex-direction: column;
    }
`;

export const StyledSidebar = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2em;
`;

export const MainGrid = styled.div.attrs({
    className: "container",
})`
    grid-template-columns: 1fr;

    column-gap: 4em;
    padding-block: 2rem;
    margin-block: 1rem;
    border-bottom: 1px solid #000;


    h1 {
        grid-column: 1 / -1;
    }

    @media (min-width: 768px) {
        display: grid;
        grid-template-columns: minmax(0, 2fr) 1fr;
    }
`;
