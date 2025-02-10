import { LinkIcon } from "lucide-react";
import { JSX } from "react";
import { Link } from "react-router";
import { ContactCard } from "./Contact";
import { ParkSection } from ".";

export const DirectionSection = ({ park, children }: { park: any; children?: JSX.Element }) => {
    const { addresses } = park;

    return (
        <ParkSection name={"Directions"}>
            <div>
                <p className='text-lg'>{park.directionsInfo || children}</p>
                <a className='italic underline text-sm ' target='_blank' href={park.directionsUrl}>
                    Official National Park Directions
                </a>
            </div>

            {/* Address and Contact Info */}
            <div className=' h-fit border rounded p-4'>
                <div className='grid lg:grid-cols-2 gap-4 md:gap-0'>
                    <div>
                        <h3 className='font-thin text-2xl underline'>Address</h3>
                        {addresses.length > 0 && <DirectionAddress addresses={addresses} />}
                        <a
                            target='_blank'
                            href={`https://www.google.com/maps/search/?api=1&query=${park.latitude},${park.longitude}`}
                        >
                            {park.latitude.slice(0, 8)}, {park.longitude.slice(0, 8)}
                        </a>
                    </div>
                    <div>
                        <h3 className='font-thin text-2xl  underline'>Contact</h3>
                        <ContactCard contacts={park.contacts} />
                    </div>
                </div>
                {park.url && (
                    <div className='col-span-2 mt-4 '>
                        <Link to={park.url} className='text-lg hover:underline flex font-black items-center gap-1'>
                            <LinkIcon className='inline' size={16} /> Official National Parks Page
                        </Link>
                    </div>
                )}
            </div>
        </ParkSection>
    );
};

const DirectionAddress = ({ addresses }: { addresses: any[] }) => {
    addresses
        .filter((add: any) => add.type === "Physical")
        .map((add: any) => {
            add.gMapsUrl = `https://www.google.com/maps/search/?api=1&query=${add.line1
                .replaceAll(" ", "+")
                .replace(".", "")} ${add.city.replaceAll(" ", "+")} ${add.stateCode} ${add.postalCode}`;
            add.full = (
                <>
                    {add.line1},<br /> {add.city}, {add.stateCode} {add.postalCode}
                </>
            );
        });

    return (
        <>
            {addresses
                .filter((add: any) => add.type === "Physical")
                .map((add: any) => (
                    <p key={add.full}>
                        <a target='_blank' href={add.gMapsUrl}>
                            {add.full}
                        </a>
                    </p>
                ))}
        </>
    );
};
