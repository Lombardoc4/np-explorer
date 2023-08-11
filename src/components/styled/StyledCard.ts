import styled from "styled-components";
import theme from "../../styles/theme";

export interface StyledCardProps {
    $bg?: string;
    $color?: string;
    $shadow?: string;
    $border?: string;
    $radius?: string;
    $row?: boolean;
    $justify?: string;
    $align?: string;
}

export const StyledCardContainer = styled.div`
    scroll-margin: 100px;

    h2 {
        text-transform: uppercase;
        font-size: 2em;
        padding: 0 0.33em;
        margin-bottom: -0.33em;
    }
`

export const StyledCard = styled.div<StyledCardProps>`
    background-color: ${({$bg}) => $bg ? $bg : theme.colors.gray};
    color: ${({$color}) => $color ? $color : theme.colors.black};
    box-shadow: ${({$shadow}) =>  $shadow ? $shadow : theme.boxShadow.sm};
    overflow: hidden;
    border: ${({$border}) => $border ? $border : 'none'};
    border-radius: ${({$radius}) => $radius ? $radius : theme.radius.md};

    display: flex;
    flex-direction: ${({$row}) => $row ? 'row' : 'column'};
    align-items: ${({$align}) => $align ? $align : 'flex-start'};
    justify-content: ${({$justify}) => $justify ? $justify : 'flex-start'};

	/* padding: 0.5em; */

    h1, h2, h3, h4, h5, h6 {
        font-weight: 700;
    }

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

export const CardItem = styled.div`
    padding: 0.75em 1em;
    width: 100%;

    &:not(:last-child) {
        /* margin-bottom: 0.5em; */
        border-bottom: 1px solid ${({ theme }) => theme.colors.black};
    }
`;