import styled from 'styled-components';
import { Icon, IconStyles } from '../Icon';
import { Link } from 'react-router-dom';

const Grid = styled.div`
    display: grid;
    /* grid-template-columns: repeat(4, 1fr); */
    gap: 1.5em;
    padding: 1em;
`

const Card = styled.div`
    flex-direction: column;
    align-items: center;
    padding: 1em;
    text-transform: uppercase;
    height: 100%;
    background-color: ${({ theme }) => theme.colors.gray};
    border-radius: 5px;
    box-shadow: rgba(80, 119, 67, 0.26) 0px 2px 8px;
    overflow: hidden;
    transition: all 0.3s ease-out 0s;
    /* background-color: rgb(80, 119, 67); */
    /* color: #f1f1f1; */
    
    svg {
        
    }
    &:hover {
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.26);
        transform: translateY(-3px);
    }
`;

interface CardButtonProps {
    name:   string;
    id:     string;
    icon:  string;
}

interface ButtonsProps extends IconStyles {
    buttons: CardButtonProps[];
    bgColor?: string;
    dir? : 'row' | 'col';
}


export const CardButtonGrid = ({buttons, size=50, dir='col', color = "#f9f9f9", bgColor= '#507743', }: ButtonsProps) => {
    const cardStyles = {
        color: color, 
        backgroundColor: bgColor,
    };
    
    const repeatVal = {
        row : '' + Math.round(buttons.length / (dir === 'row' ? 2 : Math.floor(buttons.length / 2)) ),
        col : '' + Math.floor(buttons.length / (dir === 'row' ? 2 : Math.floor(buttons.length / 2)) ),
    }
    const gridStyles = {
        gridTemplateColumns: `repeat(${repeatVal[dir]}, 1fr)`,
    }
    
    return (
        <Grid className="container" style={gridStyles}>
            { buttons.map(({name,id, icon}) => (
                <Link to={id}>
                    <Card key={name} className="detailCard" style={cardStyles}>
                        <Icon icon={icon} size={size} color={color}/>
                        <h3>{name}</h3>
                    </Card>
                </Link>
            ))}
        </Grid>
    )
}