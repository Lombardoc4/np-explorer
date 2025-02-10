import { Link } from "react-router";
import { ActivityDetails } from "../../../utils/lib/activityCategories";

export const ParkSectionTitle = ({ children }: { children: React.ReactNode }) => (
    <h3 className='text-4xl md:text-6xl md:col-span-2 font-thin border-b'>{children}</h3>
);

const ParkSectionContainer = ({ name, children }: { name: string; children: React.ReactNode }) => (
    <div className='md:my-16 scroll-m-20' id={name.replace(/\ /g, "-").toLowerCase()}>
        {children}
    </div>
);

const ParkChildrenContainer = ({ children }: { children: React.ReactNode }) => (
    <div className='grid md:grid-cols-2 gap-8 md:gap-16 my-4 md:mt-16'> {children}</div>
);

interface ParkSectionProps extends Omit<ActivityDetails, "path"> {
    path?: string;
    children: React.ReactNode;
}

export const ParkSection = ({ icon, name, count, path, children }: ParkSectionProps) => {
    return (
        <ParkSectionContainer name={name}>
            <ParkSectionTitle>
                {icon}
                <p>
                    {path ? <Link to={path}>{name}</Link> : name} {count && ` - ${count}`}
                </p>
            </ParkSectionTitle>
            <ParkChildrenContainer>{children}</ParkChildrenContainer>
        </ParkSectionContainer>
    );
};
