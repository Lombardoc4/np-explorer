import styled from "styled-components";
import theme from "../../styles/theme";

export interface StyledCardProps {
    $img?: boolean;
    $bg?: string;
    $color?: string;
    $align?: string;
    $row?: boolean;
    $justify?: string;
}

export const StyledCard = styled.div<StyledCardProps>`
    /* padding: 1em; */
    background-color: ${({$bg}) => $bg ? $bg : theme.colors.gray};
    color: ${({$color}) => $color ? $color : theme.colors.black};
    border-radius: 0.5em;
    box-shadow: rgba(0, 0, 0, 0.5) 0px 0.25em 0.5em -0.25em;
    overflow: hidden;
    
    
    display: flex;
    flex-direction: ${({$row}) => $row ? 'row' : 'column'};
    align-items: ${({$align}) => $align ? $align : 'flex-start'};
    justify-content: ${({$justify}) => $justify ? $justify : 'flex-start'};
    /* text-align: center; */
    /* position: relative; */
    
    &.primary {
        background-color: ${theme.colors.primary};
        color: ${theme.colors.white};
    }
    
    &.b-w {
        background-color: ${theme.colors.white};
        border: 2px solid ${theme.colors.black};
    }
    


    @media (min-width: 768px) {
    }
`;