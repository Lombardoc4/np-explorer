import styled from "styled-components";
import { StyledContainer } from "./StyledContainer";


export const StyledNavBar = styled.nav`
    position: sticky;
    top: 0;
    height: 70px;
    z-index: ${({ theme }) => theme.zIndex.navbar};
    background-color: ${({ theme }) => theme.colors.white};
    box-shadow: 0 0 1em -0.5em rgba(0,0,0,0.5);
    /* padding: 0.5em 0; */
    
    a {
        display: inline-block;
    }
    
    .container {
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    /*  way of accessing inner styleComponents */
    /* ${StyledContainer} {
        display: flex;
        align-items: center;
        justify-content: space-between;
    } */
    
    .side.right, .main {
        display: none
    }
    
    @media (min-width: 768px) {
        height: auto;
        padding: 0.75em 0;
        
        .main { flex: 2; }
        .side { flex: 1; }
        .side.right{ text-align: right; }
        
        .side.right, .main {
            display: initial
        }
    
`;

export const Logo = styled.div``;