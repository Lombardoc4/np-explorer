import styled from "styled-components";
import { StyledContainer } from "./StyledContainer";

export const StyledHeader = styled.header`
    /* background-color: ${({ theme }) => theme.colors.primary}; */
    padding: 1em;
    
    @media (min-width: 768px) {
        padding: 1em 2em;
    }
`;

export const StyledNavBar = styled(StyledContainer).attrs({ as: 'nav' })`
    align-items: center;
    /* justify-content: space-between; */
    a {
        display: inline-block;
    }

    .main { flex: 2; }
    .side { flex: 1; }
    .side.right{ text-align: right; }
    
`;

export const Logo = styled.div``;