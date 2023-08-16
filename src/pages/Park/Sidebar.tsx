import { Link } from "react-router-dom";
import { ParkProps } from "./ParkInfo";

import { ParkAlert } from "../../components/ParkAlert";
import { CardItem, StyledCardContainer, StyledCard } from "../../components/styled/StyledCard";

import { ReactComponent as EmailIcon } from "../../assets/icons/envelope-fill.svg";
import { ReactComponent as PhoneIcon } from "../../assets/icons/telephone-fill.svg";
import { ReactComponent as GlobeIcon } from "../../assets/icons/globe.svg";

import { SymbolMap } from "../../utils/lib/symbolMap";
import styled from "styled-components";

const FeeItem = ({ cost, title, description }: { cost: string; title: string; description: string }) => {
    title = title
        .replace("-", "\u2011")
        .replace("/", " ")
        .slice(title.indexOf("-") + 1, title.length);
    return (
        <CardItem>
            <h3>{title}</h3>
            <p className='bold'>${cost}</p>
            <p>{description}</p>
        </CardItem>
    );
};

const FeeCard = ({ entranceFees }: any) => {
    if (entranceFees.length === 0)
        return (
            <StyledCardContainer id='fees' className='no-fees'>
                <h2>No Entrance Fees</h2>
                <div className='img-container' style={{ padding: "1em 0 0" }}>
                    <img src='/hiking.svg' />
                </div>
            </StyledCardContainer>
        );

    return (
        <StyledCardContainer id='fees'>
            <h2>Entrance Fees</h2>
            <StyledCard $bg='#ffffff'>
                {entranceFees.map((fee: any) => (
                    <FeeItem key={fee.title} cost={fee.cost} title={fee.title} description={fee.description} />
                ))}
            </StyledCard>
        </StyledCardContainer>
    );
};

const ContactPhone = ({ type, number }: { type: string; number: string }) => {
    const icon =
        type === "TTY" ? (
            <img
                width={24}
                height={24}
                src={`https://raw.githubusercontent.com/nationalparkservice/symbol-library/gh-pages/src/standalone/${SymbolMap["text-telephone-service"]}-black-22.svg`}
            />
        ) : (
            <PhoneIcon width={24} height={24} />
        );

    if (type === "Fax") return <></>;

    return (
        <CardItem>
            {icon}
            <a href={`tel:${number}`}>{number.replace("/", "-")}</a>
        </CardItem>
    );
};

const ContactEmail = ({ email }: { email: string }) => (
    <>
        {email.length > 0 && email !== "0@0" && (
            <CardItem>
                <EmailIcon width={24} height={24} /> <a href={`mailto:${email}`}>{email}</a>
            </CardItem>
        )}
    </>
);

const ContactCard = ({ park }: ParkProps) => {
    const { contacts, url } = park;

    return (
        <StyledCardContainer id='contact'>
            <h2>Contact</h2>
            <StyledContactCard>
                {contacts.phoneNumbers.length > 0 &&
                    contacts.phoneNumbers.map(({ type, phoneNumber }: { type: string; phoneNumber: string }) => (
                        <ContactPhone key={phoneNumber} type={type} number={phoneNumber} />
                    ))}

                {contacts.emailAddresses.length > 0 &&
                    contacts.emailAddresses.map(({ emailAddress }: { emailAddress: string }) => (
                        <ContactEmail key={emailAddress} email={emailAddress} />
                    ))}

                <CardItem>
                    <GlobeIcon width={24} height={24} />
                    <Link to={url}>Official National Parks Page</Link>
                </CardItem>
            </StyledContactCard>
        </StyledCardContainer>
    );
};

export const Sidebar = ({park}: ParkProps) => {
    return (
        <div style={{ display: "flex", flexDirection: "column", gap: "2em" }}>

            <ParkAlert parkId={park.parkCode} />

            <ContactCard park={park} />

            <FeeCard entranceFees={park.entranceFees} />

        </div>
    )
}


const StyledContactCard = styled(StyledCard).attrs((props) => ({
    $border: "2px solid " + props.theme.colors.black,
}))`
    box-shadow: rgba(0, 0, 0, 0.26) 0px 2px 8px;
    font-size: 1.2em;
    /* gap: 1em; */

    & > * {
        display: flex;
        align-items: center;
        gap: 0.5em;
    }
`;