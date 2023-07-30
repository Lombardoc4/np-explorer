import { Link } from "react-router-dom";
import styled from "styled-components";
import { StyledCard } from "../styled/StyledCard";

interface CardProps {
	$row?: boolean;
}

interface CardGridProps {
	$grid?: boolean;
}

const CardGrid = styled.div<CardGridProps>`
	margin: 0 0 1.5em;
    display: grid;
    gap: 2em;

	${({ $grid }) =>
		$grid &&
		`
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    `}

	.filters {
		grid-column: 1 / -1;
		margin: 0 0 1em;
	}

	.dropdown-search {
		margin: 0 0 1em;
	}

	@media (max-width: 768px) {
		display: flex;
		flex-direction: column;
		gap: 1em;
	}
`;

const Card = styled(StyledCard)<CardProps>`
	/* gap: 1em; */

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
		flex-direction: ${({ $row }) => ($row ? "row" : "column")};
		/* gap: 1em; */

		.img-container {
			height: 300px;
		}

		.card-content {
			max-width: 600px;
		}
	}
`;

export const ParkCards = ({
	row = false,
	grid = false,
	parks,
	showDescription = true,
}: {
	grid?: boolean;
	row?: boolean;
	parks: any[];
	showDescription?: boolean;
}) => {
	// TODO : Turn these badboiiis into accordians
	// ** When opened fetch necessary data
	// ** When closed maintain data

	return (
		<CardGrid $grid={grid}>
			{parks.length === 0 && <h2>No parks match these filters</h2>}

			{/* A Grid of Cards with an image park name and description */}
			{parks.length > 0 &&
				parks.map((park: any) => (
					<Card
						$row={row}
						key={park.parkCode}
					>
						<Link
							className='img-container'
							to={`/park/${park.parkCode}`}
						>
							{
								park.images.length > 0 ?
								<img
								src={park.images[0].url}
								alt={park.images[0].altText}
								/>
								:
								<img
								src='https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/Logo_of_the_United_States_National_Park_Service.svg/920px-Logo_of_the_United_States_National_Park_Service.svg.png'
								alt='No Image Available'
								/>
							}
							<span className="overlay-gradient">
								{park.fullName}
							</span>
						</Link>
						{showDescription &&
							<div className='card-content'>
								<p>{park.description}</p>
							</div>
						}
					</Card>
				))}
		</CardGrid>
	);
};
