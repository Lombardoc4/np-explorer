import { Link } from "react-router";
import styled from "styled-components";
import { StyledCard } from "../styled/StyledCard";
import { useEffect, useState } from "react";

interface CardProps {
    $row?: boolean;
}

interface CardGridProps {
    $grid?: boolean;
}

interface ParkCardProps {
    parks: any[];
    grid?: boolean;
    row?: boolean;
    showDescription?: boolean;
}

const npsImage = (
    <img
        src='https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/Logo_of_the_United_States_National_Park_Service.svg/920px-Logo_of_the_United_States_National_Park_Service.svg.png'
        alt='No Image Available'
    />
);

const parkImage = (img: { url: string; altText: string }) => <img src={img.url} alt={img.altText} />;

export const ParkCardGrid = ({ parks, row = false, grid = false, showDescription = true }: ParkCardProps) => {
    const [listLength, setListLength] = useState(10);

    const loadMoreItems = () => {
        setListLength((prevListCount) => prevListCount + 10);
    };

    useEffect(() => {
        setListLength(12);
    }, [parks]);

    // TODO : SORT BY MOST COMMON ACTIVITIES

    return (
        <>
            <CardGrid $grid={grid}>
                {parks.length > 0 &&
                    parks.slice(0, listLength).map((park) => (
                        <Card key={park.parkCode}>
                            <Link className='img-container' to={`/park/${park.parkCode}`}>
                                {park.images && park.images.length > 0 ? parkImage(park.images[0]) : npsImage}
                                <span className='overlay-gradient'>{park.fullName}</span>
                            </Link>
                            {showDescription && (
                                <div className='card-content'>
                                    <p>{park.description}</p>
                                </div>
                            )}
                        </Card>
                    ))}
                {listLength < parks.length && (
                    <button style={{ gridColumn: "1 / -1", margin: "auto" }} onClick={loadMoreItems}>
                        Load More
                    </button>
                )}
            </CardGrid>
        </>
    );
};

const CardGrid = styled.div<CardGridProps>`
    display: grid;
    gap: 2em;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));

    .filters {
        grid-column: 1 / -1;
        margin: 0 0 1em;
    }

    .dropdown-search {
        margin: 0 0 1em;
    }
`;

const Card = styled(StyledCard)<CardProps>`
    .img-container {
        height: 200px;
        overflow: hidden;
        box-shadow: rgba(0, 0, 0, 0.5) 0 0 0.5em -0.25em;
    }

    .overlay-gradient {
        font-size: 1.5em;
        color: ${({ theme }) => theme.colors.white};
        padding: 1em 3em 1em 1em;
    }

    .card-content {
        padding: 1.2em;
        font-size: 1.25em;
    }

    @media (min-width: 768px) {
        .img-container {
            height: 300px;
        }

        .card-content {
            max-width: 600px;
        }
    }
`;
