import { styled } from "styled-components";
import { StyledCardProps } from "./StyledCard";

export const StyledParkHeader = styled.div`
    margin: 2rem auto 1em;
    display: flex;
    flex-direction: column-reverse;
    gap: 1em;

    @media (min-width: 768px) {
        flex-direction: column;
    }
`;

export const StyledParkHeading = styled.div`
    /* display: grid; */
    /* grid-template-columns: 2fr 1fr; */
    /* align-items: flex-end; */
    /* justify-content: space-between; */
`;


export const StyledParkAccordian = styled.div`
    /* display: grid; */
    /* grid-template-columns: repeat(2, 1fr); */
    /* gap: 1em; */
    margin: 1em auto 0;
    
    .card {
        display: flex;
        align-items: center;
    }
`;

interface FeeCardProps extends StyledCardProps {
	$active: boolean;
}

export const StyledFeeCard = styled.div<FeeCardProps>`
display: flex;
flex-direction: column;
padding: 1em;
font-size: 1.2em;
overflow: hidden;

/* background-color: ${({ theme }) => theme.colors.primary}; */
/* color: ${({ theme }) => theme.colors.white}; */
border-radius: 0.5em;
box-shadow: ${({ theme }) => theme.boxShadow.medium};


.price {
    /* font-size: 1.25em; */
    font-weight: 700;
}

.info {
    p {
        position: absolute;
        top: 100%;
        left: 50%;
        z-index: ${({ theme }) => theme.zIndex.overlay};
        font-size: 0.75em;
        background-color: ${({ theme }) => theme.colors.white};
        color: ${({ theme }) => theme.colors.black};
        padding: 1em;
        border-radius: 5px;
        box-shadow: rgba(0, 0, 0, 0.5) 0px 2px 8px;
        width: 320px;
        transform: translateX(-50%);

        pointer-events: none;
        opacity: ${({ $active }) => ($active ? "1" : "0")};
    }

    svg {
        cursor: pointer;
    }
}
`;