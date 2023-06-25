import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useOutsideAlerter } from "../../utils/hooks/useOuterClick";
import { StyledCard, StyledCardProps } from "../styled/StyledCard";

const InfoBox = styled.div`
	/* width: 50%; */
	padding: 1em 0;
	display: grid;
	gap: 1em;
	grid-template-columns: 1fr;

	.content {
		display: flex;
		flex-direction: column;
	}

	.mb-1 {
		margin-bottom: 1em;
	}

	.fees {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
		gap: 1em;

		h2 {
			grid-column: 1 / -1;
		}

		p {
			margin: 0;
		}
	}

	.no-fees {
		display: flex;
		flex-direction: column;

		h2 {
			margin-bottom: 1em;
		}

		img {
			width: 100%;
		}
	}

	@media (min-width: 768px) {
		gap: 2em;
		grid-template-columns: 1fr 1fr;
	}
`;

interface FeeCardProps extends StyledCardProps {
	$active: boolean;
}

const StyledFeeCard = styled(StyledCard)<FeeCardProps>`
	/* display: flex;
    flex-direction: column;
    align-items: center; */

	text-align: center;
	/* position: relative; */

	/* background-color: ${({ theme }) => theme.colors.primary}; */
	/* color: ${({ theme }) => theme.colors.white}; */

	.price {
		display: flex;
		gap: 0.25em;
		font-size: 1.25em;
		font-weight: bold;
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

// const ContactInfo = styled.div`
// 	padding: 1em;
// 	margin: auto 0 1em;
// 	color: ${({ theme }) => theme.colors.black};
// 	/* color: #507743; */
// 	border-radius: 5px;
// 	box-shadow: rgba(0, 0, 0, 0.26) 0px 2px 8px;
// 	border: 2px solid ${({ theme }) => theme.colors.black};

// 	a {
// 		font-weight: 400;
// 	}
// `;

const FeeCard = ({ cost, title, description }: { cost: string; title: string; description: string }) => {
	const [active, setActive] = useState(false);
	const ref = useRef(null);
	useOutsideAlerter(ref, () => setActive(false));

	return (
		<StyledFeeCard
			className='primary'
			$active={active}
            $align='center'
		>
			<div className='price'>
				<p>${cost}</p>
				<div
					className='info'
					ref={ref}
					onClick={() => setActive(!active)}
				>
					<p>{description}</p>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						width='16'
						height='16'
						fill='currentColor'
						className='bi bi-info-circle-fill'
						viewBox='0 0 16 16'
					>
						<path d='M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z' />
					</svg>
				</div>
			</div>
            
			<p>{title.slice(0, title.indexOf('-'))}<br/>{title.slice(title.indexOf('-') + 1, title.length)}</p>
		</StyledFeeCard>
	);
};

const FeeSection = ({ entranceFees }: any) => {
	if (entranceFees.length === 0)
		return (
			<div className='no-fees'>
				<h2>No Entrance Fees</h2>
				<img src='/hiking.svg' />
			</div>
		);

	return (
		<div className='fees'>
			<h2>Entrance Fees</h2>
			{entranceFees.map((fee: any) => (
				<FeeCard
					key={fee.title}
					cost={fee.cost}
					title={fee.title}
					description={fee.description}
				/>
			))}
		</div>
	);
};

export const ParkDescription = ({ park }: any) => {
	console.log("park", park);
	return (
		<InfoBox>
			<div className='content'>
				<h2>{park.fullName}</h2>
				<p className='mb-1'>{park.description}</p>
				<p className='mb-1'>{park.weatherInfo}</p>
				<Link to={park.url}>Official National Parks Page</Link>

				<StyledCard className="b-w mt-auto">
					<h3>Contact Info</h3>
					{park.contacts.phoneNumbers.length > 0 &&
						park.contacts.phoneNumbers.map(({ phoneNumber }: { phoneNumber: string }) => (
							<p key={phoneNumber}>
								Phone:{" "}
								<a href={`tel:${phoneNumber}`}>
									{phoneNumber.slice(0, 3)}-{phoneNumber.slice(3, 6)}-{phoneNumber.slice(6, 10)}
								</a>
							</p>
						))}
					{park.contacts.emailAddresses.length > 0 &&
						park.contacts.emailAddresses.map(({ emailAddress }: { emailAddress: string }) => (
							<>
								{emailAddress.length > 0 && (
									<p key={emailAddress}>
										Email: <a href={`mailto:${emailAddress}`}>{emailAddress}</a>
									</p>
								)}
							</>
						))}
				</StyledCard>
			</div>
			{/* TODO: make into a grid some some sort not card but maybe borders between */}
			<FeeSection entranceFees={park.entranceFees} />
		</InfoBox>
	);
};
