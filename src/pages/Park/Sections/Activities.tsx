import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import { Button } from "../../../components/Button";
import { fetcher, uniqueCategoryItems } from "../../../utils/helper";
import { activityCategories } from "../../../utils/lib/activityCategories";
import { ParkSection } from ".";

export const CategorySection = ({ parkCode, endpoint }: { parkCode: string; endpoint: string }) => {
    const activeCat = activityCategories[endpoint];

    const { status, data: categories } = useQuery({
        queryKey: ["park", { catergory: endpoint, parkCode: parkCode }],
        queryFn: async () => await fetcher(`${endpoint}?parkCode=${parkCode}`),
        retry: 0,
        staleTime: 5 * 60 * 1000,
    });

    if (status !== "success" || categories.length <= 0) return;

    const uniqueCats = uniqueCategoryItems(categories).slice(0, 6);

    return (
        <ParkSection {...activeCat} count={categories.length}>
            {/* Accordian */}
            {uniqueCats.map((data) => (
                <CategoryCard key={data.name || data.title} data={data} {...activeCat} />
            ))}
            {uniqueCats.length > 6 && (
                <Button className='col-span-2 hover:underline border border-current w-fit mx-auto text-2xl'>
                    <Link to={activeCat.path}>Explore all {activeCat.name}</Link>
                </Button>
            )}
        </ParkSection>
    );
};

const CategoryCard = ({ data, name, path }: { data: any; name: string; path: string }) => {
    const href = `./${path}/#${name.replace(/\ /g, "-").toLowerCase()}`;
    const date =
        data.date &&
        new Date(data.date.replace(/-/g, "/")).toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
        });

    return (
        <div className='flex flex-col justify-start gap-2 group'>
            {/* Title Row w Passport Location */}
            <div className='w-full border-b pb-1'>
                {date && <p className='font-bold'>{date}</p>}
                <div className='flex justify-between items-center gap-4'>
                    <h4 className='text-xl font-black'>
                        <Link to={href}>{data.name || data.title}</Link>
                    </h4>
                    {data.isPassportStampLocation === "1" && <PassportImg />}
                </div>
            </div>

            {/* Content */}
            {name === "Events" ? (
                <div
                    className='line-clamp-4 '
                    dangerouslySetInnerHTML={{
                        __html: data.description.replaceAll("<br /><br />", "</p><p>"),
                    }}
                />
            ) : (
                <p className='line-clamp-4'>{data.description || data.shortDescription}</p>
            )}
            <Link className='mt-auto group-hover:underline' to={href}>
                Read more...
            </Link>
        </div>
    );
};

const PassportImg = () => (
    <img title='Passport Stamp Location' src='/passport-book.webp' alt='Passport Stamp' style={{ height: "36px" }} />
);