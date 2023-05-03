import { Link } from "react-router-dom";
import styled from 'styled-components';

interface StyledListProps {
    title: string
    listItems: {
        link: string,
        text: string
    }[]
}

interface ListProps {
    length: number;
}

const List = styled.ul<ListProps>`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    
    @media (min-width: 768px) {
        grid-auto-flow: column;
        grid-template-rows: ${({ length }) => `repeat(${Math.round(length / 2)}, 1fr)`};
    }
`;
    
    
export const StyledList = ({title, listItems}: StyledListProps) => {
    
    return (
        <div className="container" style={{padding: '2em 3em'}}>
            <h2>{title}</h2>
            {listItems &&
            <List length={listItems.length}>
                {listItems.map((item) => (
                    <li key={item.link}>
                        <Link to={item.link}>
                            {item.text}
                        </Link>
                    </li>
                ))}
            </List>
            }
        </div>
    )
}