import { Link } from "react-router";
import { ParkProps } from "./Main";

import { ParkAlert } from "../../components/ParkAlert";
import { CardItem, StyledCardContainer, StyledCard } from "../../components/styled/StyledCard";

import { SymbolMap } from "../../utils/lib/symbolMap";
import styled from "styled-components";
import { IPark } from "../../utils/hooks/ParkContext";
import { StyledSidebar } from "./components/StyledParkComponents";
import { PhoneIcon, EmailIcon, GlobeIcon } from "../../assets/icons";
import { Speech, Phone, Globe, Mail, Info, MailPlus } from "lucide-react";
import { useState } from "react";

const FeeItem = ({ cost, title, description }: { cost: string; title: string; description: string }) => {
    const [showDescription, setShowDescription] = useState(false);

    title = title
        .replace("-", "\u2011")
        .replace("/", " ")
        .slice(title.indexOf("-") + 1, title.length);

    return (
        <div className='w-full relative flex flex-col text-center justify-center items-center min-h-24 border-r nth-[4n_of_div]:border-none border-dashed px-2 '>
            <h3 className='text-xl'>{title}</h3>
            <div className='flex gap-2 items-center justify-center'>
                <p className='font-bold'>${cost}</p>
                <Info onMouseEnter={() => setShowDescription(true)} onMouseLeave={() => setShowDescription(false)} />
            </div>
            {showDescription && (
                <p className='absolute m-[4px] bottom-full border border-black bg-white rounded p-2 text-sm text-black'>
                    {description}
                </p>
            )}
        </div>
    );
};

export const FeeCard = ({ entranceFees }: any) => {
    if (entranceFees.length === 0)
        return (
            <div id='fees'>
                <h2 className='text-4xl font-bold mb-4'>No Entrance Fees</h2>
                <div className='img-container' style={{ padding: "1em 0 0" }}>
                    <img src='/hiking.svg' />
                </div>
            </div>
        );

    return (
        <div id='fees' className='container mx-auto my-16'>
            <h2 className='text-8xl font-thin border-b pb-1 mb-4'>Entrance Fees</h2>
            <div className='grid grid-cols-4 gap-y-4'>
                {entranceFees.slice(0, 4).map((fee: any) => (
                    <FeeItem key={fee.title} cost={fee.cost} title={fee.title} description={fee.description} />
                ))}
                <hr className='col-span-4 border-t border-dashed border-gray-200' />
                {entranceFees.slice(4, entranceFees.length).map((fee: any) => (
                    <FeeItem key={fee.title} cost={fee.cost} title={fee.title} description={fee.description} />
                ))}
            </div>
        </div>
    );
};

export const ContactPhone = ({ type, number }: { type: string; number: string }) => {
    const icon = type === "TTY" ? <Speech /> : <Phone />;

    if (type === "Fax" || number.length <= 0) return <></>;

    return (
        <div className='w-full flex items-center gap-4'>
            {/* {icon} */}
            <a href={`tel:${number}`} className="hover:underline">
                {type}: {number.replace("/", "-")}
            </a>
        </div>
    );
};

export const ContactEmail = ({ email }: { email: string }) => (
    <>
        {email.length > 0 && email !== "0@0" && (
            <div className='w-full flex items-center gap-4'>
                {/* <MailPlus/> */}
                <a href={`mailto:${email}`}  className="hover:underline">{email}</a>
            </div>
        )}
    </>
);

export const ContactCard = ({
    contacts,
    children,
}: {
    contacts: IPark["contacts"];
    children?: JSX.Element;
}) => {
    if (!contacts) return
    return (
        <div id='contact'>
            {contacts.phoneNumbers.length > 0 &&
                contacts.phoneNumbers.map(({ type, phoneNumber }: { type: string; phoneNumber: string }) => (
                    <ContactPhone key={phoneNumber} type={type} number={phoneNumber} />
                ))}
            {contacts.emailAddresses.length > 0 &&
                contacts.emailAddresses.map(({ emailAddress }: { emailAddress: string }) => (
                    <ContactEmail key={emailAddress} email={emailAddress} />
                ))}

            {children}
        </div>
    );
};

export const Sidebar = ({ park }: ParkProps) => {
    return (
        <div className='grid gap-8'>
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
