import { CalendarCheck2, House, Car, FlameKindling, TriangleAlert, Bus } from "lucide-react";
import { ParksDropdown } from "../../components/Dropdown/ParksDropdown";
import { USMap } from "../../components/USMap";
import { activityCategories } from "../../utils/lib/activityCategories";

interface BaseInfoProps {
    icon: React.ReactNode;
    title: string;
    description: string;
}

const bgUrl = "https://www.nps.gov/common/uploads/structured_data/3C7FA4C5-1DD8-B71B-0B7FCC54E43FEE79.jpg"
const iconProps = {
    // size: 36,
    strokeWidth: 1
}
const baseInfo = [
    {
        icon: <CalendarCheck2 {...iconProps} />,
        title: "Events",
        description:
            "Sign up for upcoming events, like movies under the stars. There are plenty of suggested things to do recommended by and for specific national parks.",
    },
    {
        icon: <House {...iconProps} />,
        title: "Visitor Centers",
        description:
            "Visit one of the over 550 visitor centers managed by the NPS to get even more information from an educated park range. There are plenty of chances to get your NPS Passport stamped",
    },
    {
        icon:<Car {...iconProps} />,
        title: "Parking",
        description:
            "Never get lost in the vast road system of our great National Parks. Get direction to your favorite parks and accessible parking lots",
    },
    {
        icon: <FlameKindling {...iconProps} />,
        title: "Camping",
        description:
            "Whether first-come first-serve or requiring reservation, find your next campground and hit the roads.",
    },
    {
        icon: <TriangleAlert {...iconProps} />,
        title: "Alerts",
        description:
            "Get the heads up before you go, with update to date alerts, you're ahead of the game",
    },
    {
        icon: <Bus {...iconProps} />,
        title: "Tours",
        description:
            "Interesting in learning about the rich history of our national parks, book a tour with the NPS.",
    },
];

export const LandingPage = () => {
    return (
        <>
            <header className='min-h-dvh grid items-center'>
                <div className='container max-w-5xl mx-auto'>
                    <h1 className='hidden'>Explore Your Favorite National Park</h1>
                    <p className='text-6xl font-black uppercase'>Explore Your</p>
                    <div className={`bg-[url(${bgUrl})] bg-center bg-cover h-[500px] border rounded-xl`}>
                        <div className='w-full h-full bg-black/25 text-white flex items-center justify-center'>
                                <ParksDropdown />
                        </div>
                    </div>
                    <p className='text-6xl font-black uppercase text-right'>Favorite National Parks</p>
                </div>
            </header>
            {/* <header className={`bg-[url(${bgUrl})] bg-center bg-cover min-h-dvh grid`}>
                <div className='w-full h-full bg-black/25 text-white grid items-center'>
                    <div className=' mx-auto container grid gap-8'>
                        <h1 className='text-6xl font-black uppercase'>
                            Explore Your
                            <br /> Favorite National Parks
                        </h1>
                        <div className='relative h-[50px]'>
                            <ParksDropdown />
                        </div>
                    </div>
                </div>
            </header> */}

            {/* Section 2 - Description */}
            <div className='min-h-svh bg-black text-white grid items-center'>
                <div className='container mx-auto py-16 my-16'>
                    <h2 className='text-6xl uppercase font-thin mb-16'>
                        A modern look to
                        <br /> the National Parks Service...
                    </h2>
                    <div className='grid md:grid-cols-2 xl:grid-cols-3 w-fit mx-auto gap-16 xl:gap-[96px]'>
                        {baseInfo.map((info) => (
                            <Feature key={info.title} {...info} />
                        ))}
                    </div>
                </div>
            </div>

            <USMap />
        </>
    );
};



const Feature = ({icon, title, description}: BaseInfoProps) => {
    return (
        <div className='max-w-3xl container'>
            <div className='grid'>
                {icon}
                <h3 className='text-4xl xl:text-5xl font-thin'>{title}</h3>
            </div>
            <p className='col-span-2 grow-1 text-justify border-t mt-1 pt-1'>{description}</p>
        </div>
    );

}