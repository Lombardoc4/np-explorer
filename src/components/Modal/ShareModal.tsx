import { useState } from "react";
import { Modal } from ".";
import styled from "styled-components";

import Share from "../../assets/icons/share.svg?react";
import XIcon from "../../assets/icons/x.svg?react";
import { StyledCard } from "../styled/StyledCard";
import { Share2 } from "lucide-react";
import { Button } from "../Button";


export const ShareModal = (park: any) => {
    const [isOpen, setIsOpen] = useState(false);
	const link = window.location.href;
	const copyClick = async () => {
		navigator.clipboard.writeText(link)
	}
	const emailClick = () => {

	}

	const modal = (
		<Modal
			isOpen={isOpen}
			closeAction={() => setIsOpen(false)}
			styles={{display: 'grid', gridTemplateColumns: '1fr 1fr', padding: '1em', gap: '1em', fontSize: '1.5em', maxWidth: '350px'}}
		>
			<>
				<div style={{gridColumn: '1 / -1'}}>
					<div style={{display: "flex", justifyContent: "space-between"}}>
						<h3>Share:</h3>
						<button style={{fontSize: '0.5em', padding: '0.25em'}} onClick={() => setIsOpen(false)}><XIcon fill={'#fff'}/></button>
					</div>
					{park.fullName}
				</div>
				{/* <ShareCard onClick={copyClick}>
					Copy Link
				</ShareCard>
				<ShareCard as="a" href={`mailto:?subject=${park.fullName}?body=${link}`}>
					Email
				</ShareCard> */}
			</>
		</Modal>
	)

	const btn = (
        <a onClick={() => setIsOpen(true)} href='#'>
            <Button>
                <Share2 />
                Share
            </Button>
        </a>
    );

	return [modal, btn]
}

const ShareCard = styled(StyledCard)`
    border-radius: ${({theme}) => theme.radius.sm};
	padding: 0.5em;
	cursor: pointer;
	text-decoration: none;

	&:hover {
		box-shadow: none;
	}
`;