import { Info } from "lucide-react";
import { useState } from "react";
import { ParkSection } from "../components/section";

export const FeeCard = ({ entranceFees }: any) => {
    return (
        <ParkSection name='Entrance Fees'>
            <div className='col-span-2 grid grid-cols-2 md:grid-cols-4 gap-8'>
                {entranceFees.length === 0 ? (
                    <p className='text-xl font-black mb-4'>No Entrance Fees</p>
                ) : (
                    <>
                        {entranceFees.map((fee: any) => (
                            <FeeItem key={fee.title} cost={fee.cost} title={fee.title} description={fee.description} />
                        ))}
                    </>
                )}
            </div>
        </ParkSection>
    );
};

const FeeItem = ({ cost, title, description }: { cost: string; title: string; description: string }) => {
    const [showDescription, setShowDescription] = useState(false);

    title = title
        .replace("-", "\u2011")
        .replace("/", " ")
        .slice(title.indexOf("-") + 1, title.length);

    return (
        <div className='w-full relative'>
            <h3 className="text-xl">{title}</h3>
            <div className='flex gap-2'>
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
