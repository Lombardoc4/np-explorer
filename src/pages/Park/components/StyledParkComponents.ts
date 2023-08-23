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
`