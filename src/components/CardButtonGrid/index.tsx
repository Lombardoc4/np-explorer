import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Grid = styled.div`
    display: grid;
    a { text-decoration: none; }
    /* grid-template-columns: repeat(4, 1fr); */

    /* display: flex; */
    /* flex-direction: column; */
    gap: 1.5em;
    /* padding: 1em; */


`

const Card = styled.div`
    display: flex;
    /* flex-direction: column; */
    align-items: center;
    gap: 0.5em;
    padding: 1em;
    text-transform: uppercase;
    height: 100%;
    /* min-height: 300px; */
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

interface ButtonsProps {
    buttons: CardButtonProps[];
    bgColor?: string;
    dir? : 'row' | 'col';
}


export const CardButtonGrid = ({buttons,  dir='col' }: ButtonsProps) => {

    const repeatVal = {
        row : '' + Math.round(buttons.length / (dir === 'row' ? 2 : Math.floor(buttons.length / 2)) ),
        col : '' + Math.floor(buttons.length / (dir === 'row' ? 2 : Math.floor(buttons.length / 2)) ),
    }
    const gridStyles = {
        gridTemplateColumns: `repeat(${repeatVal[dir]}, 1fr)`,
    }

    return (
        <Grid className="container">
            { buttons.map(({name,id, icon}) => (
                <Link to={'./' + id} key={name}>
                <Card className="detailCard">
                    {icon}
                    <h3>{name}</h3>
                </Card>
                </Link>
            ))}
        </Grid>
    )
}