
import styled from "styled-components";

interface StyledContainerProps {
    column?: boolean;
}

export const StyledContainer = styled.div<StyledContainerProps>`
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    flex-direction: ${ ({ column }) => column ? 'column' : 'row' }};
    padding: 1em 0 0;



    @media (min-width: 768px) {
        flex-direction: row;
        padding: 0;
    }
`;