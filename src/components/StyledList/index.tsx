import { Link } from "react-router-dom";
import styled from 'styled-components';

interface StyledListProps {
    title: string
    listItems: {
        link: string,
        text: string
    }[]
}

const List = styled.ul`
    display: grid;
    grid-auto-flow: column;
`;
    
    
export const StyledList = ({title, listItems}: StyledListProps) => {
    
    return (
        <div className="container" style={{padding: '2em 3em'}}>
            <h2>{title}</h2>
            {listItems &&
            <List style={{gridTemplateRows: `repeat(${Math.round(listItems.length / 2)}, 1fr)`}}>
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