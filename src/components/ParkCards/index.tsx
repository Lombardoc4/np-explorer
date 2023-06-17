import { Link } from "react-router-dom";
import styled from "styled-components";

interface CardGridProps {
    $columns: number;
}

const CardGrid = styled.div<CardGridProps>`
    margin: 0 0 1.5em;
    
    ${({ $columns }) => 
        $columns > 0 && `
            display: grid;
            grid-template-columns: repeat(${ $columns }, 1fr);
            gap: 2em;
            
        `
    }
    
    .filters{
        grid-column: 1 / -1;
        margin: 0 0 1em;
    }
    
    .dropdown-search{
        margin: 0 0 1em;
    }
    
    @media (max-width: 768px) {
        padding: 0 1em;
    }
`;


const Card = styled.div<CardGridProps>`
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: 2em;
    padding: 1em;
    margin: 0 0 1em;
    
    color: #000;
    background: #fff;
    border-radius: 0.5em;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
    
    
    ${({ $columns }) => 
        $columns > 0 && `
            display: flex;
            flex-direction: column;
            gap: 1em;
        `
    }
    
    .img-container {
        height: 200px;
        overflow: hidden;
        border-radius: 0.5em;
    }
    
    .card-content{
        padding: 0.5em 0;
        font-size: 1.1em;
    }
    
    h2 { 
        line-height: 1.1; 
        margin: 0 0 0.25em;
        &:hover {
            text-decoration: underline;
        }
    }
    
    @media (max-width: 768px) {
        h2{
            width: 80%;
        }
    }
`;

export const ParkCards = ({ columns = 0, parks }: { columns?: number, parks: any[]}) => {
    return (
        <CardGrid $columns={columns} >
            { parks.length === 0 && 
                    <h2>Sorry, no parks match these filters</h2>
            }
            
            {/* A Grid of Cards with an image park name and description */}
            { parks.length > 0 && parks.map((park: any) => (
                <Card $columns={columns} key={park.parkCode}>
                    <Link className="img-container" to={`/park/${park.parkCode}`}>
                        <img src={park.images[0].url} alt={park.images[0].altText } />
                    </Link>
                    <div className="card-content">
                        <Link to={`/park/${park.parkCode}`}>
                            <h2>{park.fullName}</h2>
                        </Link>
                        <p>{park.description}</p>
                    </div>
                </Card>
            ))}
        </CardGrid>
    )
}