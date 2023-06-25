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
	gap: 1em;

	.img-container {
		height: 200px;
		overflow: hidden;
		border-radius: 0.5em;
		/* border: 1px solid ${({ theme }) => theme.colors.black}; */
		box-shadow: rgba(0, 0, 0, 0.5) 0 0 0.5em -0.25em;
	}

	.card-content {
		font-size: 1.1em;

		p {
			margin: 0.5em 0 0;
		}
	}

	@media (min-width: 768px) {
		flex-direction: ${({ $row }) => ($row ? "row" : "column")};
		gap: 1em;

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
			{parks.length === 0 && <h2>Sorry, no parks match these filters</h2>}

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
							<img
								src={park.images[0].url}
								alt={park.images[0].altText}
							/>
						</Link>
						<div className='card-content'>
							<Link to={`/park/${park.parkCode}`}>
								<h2>{park.fullName}</h2>
							</Link>
							{showDescription && <p>{park.description}</p>}
						</div>
					</Card>
				))}
		</CardGrid>
	);
};
