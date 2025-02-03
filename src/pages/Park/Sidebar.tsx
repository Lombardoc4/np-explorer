import { Link } from "react-router";
import { ParkProps } from "./Main";

import { ParkAlert } from "../../components/ParkAlert";
import { CardItem, StyledCardContainer, StyledCard } from "../../components/styled/StyledCard";

import { SymbolMap } from "../../utils/lib/symbolMap";
import styled from "styled-components";
import { IPark } from "../../utils/hooks/ParkContext";
import { StyledSidebar } from "./components/StyledParkComponents";
import { PhoneIcon, EmailIcon, GlobeIcon } from "../../assets/icons";
import { Speech, Phone, Globe, Mail, Info } from "lucide-react";
import { useState } from "react";

const FeeItem = ({ cost, title, description }: { cost: string; title: string; description: string }) => {
    const [showDescription, setShowDescription] = useState(false)

    title = title
        .replace("-", "\u2011")
        .replace("/", " ")
        .slice(title.indexOf("-") + 1, title.length);
    return (
        <div className='w-full relative border rounded-lg flex flex-col text-center justify-center items-center min-h-24'>
                <h3 className='text-xl'>{title}</h3>
            <div className='flex gap-2 items-center justify-center'>
            <p className='font-bold'>${cost}</p>
                <Info onMouseEnter={() => setShowDescription(true)} onMouseLeave={() => setShowDescription(false)} />
            </div>
            {showDescription && <p className='absolute bottom-full bg-white rounded p-2 text-sm text-black'>{description}</p>}
        </div>
    );
};

export const FeeCard = ({ entranceFees }: any) => {
    if (entranceFees.length === 0)
        return (
            <div  id='fees' className="scroll-m-24">
                <h2 className="text-4xl font-bold mb-4">No Entrance Fees</h2>
                <div className='img-container' style={{ padding: "1em 0 0" }}>
                    <img src='/hiking.svg' />
                </div>
            </div>
        );

    return (
        <div className='scroll-m-24' id='fees'>
            <h2 className='text-4xl font-bold mb-4'>Entrance Fees</h2>
            <div className="grid grid-cols-4 gap-4">
                {entranceFees.map((fee: any) => (
                    <FeeItem key={fee.title} cost={fee.cost} title={fee.title} description={fee.description} />
                ))}
            </div>
        </div>
    );
};

export const ContactPhone = ({ type, number }: { type: string; number: string }) => {
    const icon =
        type === "TTY" ? (
            <Speech />
        ) : (
            <Phone width={24} height={24} />
        );

    if (type === "Fax" || number.length <= 0) return <></>;

    return (
        <div className="w-full flex items-center gap-4">
            {icon}
            <a href={`tel:${number}`}>{type}: {number.replace("/", "-")}</a>
        </div>
    );
};

export const ContactEmail = ({ email }: { email: string }) => (
    <>
        {email.length > 0 && email !== "0@0" && (
            <div className='w-full flex items-center gap-4'>
                <Mail width={24} height={24} /> <a href={`mailto:${email}`}>Email:{email}</a>
            </div>
        )}
    </>
);

export const ContactCard = ({
    contacts,
    url,
    children,
}: {
    contacts: IPark["contacts"];
    url?: string;
    children?: JSX.Element;
}) => {
    return (
        <div id='contact'>
            <h2 className="font-semibold text-xl">Contact</h2>
            <div>
                {contacts &&
                    contacts.phoneNumbers.length > 0 &&
                    contacts.phoneNumbers.map(({ type, phoneNumber }: { type: string; phoneNumber: string }) => (
                        <ContactPhone key={phoneNumber} type={type} number={phoneNumber} />
                    ))}

                {contacts &&
                    contacts.emailAddresses.length > 0 &&
                    contacts.emailAddresses.map(({ emailAddress }: { emailAddress: string }) => (
                        <ContactEmail key={emailAddress} email={emailAddress} />
                    ))}

                {url && (
                    <div className="w-full flex items-center gap-4">
                        <Globe width={24} height={24} />
                        <Link to={url}>Official National Parks Page</Link>
                    </div>
                )}

                {children}
            </div>
        </div>
    );
};

export const Sidebar = ({ park }: ParkProps) => {
    return (
        <div className="grid gap-8">


            <FeeCard entranceFees={park.entranceFees} />
        </div>
    );
};

export const StyledContactCard = styled(StyledCard).attrs((props) => ({
    // $border: "2px solid " + props.theme.colors.black,
}))`
    box-shadow: rgba(0, 0, 0, 0.26) 0px 2px 8px;
    font-size: 1.2em;
`;

export const ContactItem = styled(CardItem)`
    display: flex;
    align-items: center;
    gap: 1em;
`;
