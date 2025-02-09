import { CalendarCheck2, House, Car, FlameKindling, TriangleAlert, Bus } from "lucide-react";

const iconProps = {
    strokeWidth: 1,
};

type featureInfoProps = {
    icon: React.ReactNode;
    title: string;
    description: string;
};

export const featureInfo: featureInfoProps[] = [
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
        icon: <Car {...iconProps} />,
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
        description: "Get the heads up before you go, with update to date alerts, you're ahead of the game",
    },
    {
        icon: <Bus {...iconProps} />,
        title: "Tours",
        description: "Interesting in learning about the rich history of our national parks, book a tour with the NPS.",
    },
];

export const Description = () => (
    <div className='min-h-svh bg-black text-white grid items-center'>
        <div className='container mx-auto py-16 my-16'>
            <h2 className='text-6xl uppercase font-thin mb-16'>
                A modern look to
                <br /> the National Parks Service...
            </h2>
            <div className='grid md:grid-cols-2 xl:grid-cols-3 w-fit mx-auto gap-16 xl:gap-[96px]'>
                {featureInfo.map((info) => (
                    <Feature key={info.title} {...info} />
                ))}
            </div>
        </div>
    </div>
);

const Feature = () => {
    return featureInfo.map(({ icon, title, description }) => (
        <div className='max-w-3xl container'>
            <div className='grid'>
                {icon}
                <h3 className='text-4xl xl:text-5xl font-thin'>{title}</h3>
            </div>
            <p className='col-span-2 grow-1 text-justify border-t mt-1 pt-1'>{description}</p>
        </div>
    ));
};
