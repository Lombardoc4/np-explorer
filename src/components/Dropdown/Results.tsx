import { DefaultError } from "@tanstack/react-query";
import { IItem } from ".";
import { useNavigate } from "react-router";

interface IResults {
    items?: IItem[];
    isPending: boolean;
    error: DefaultError | null;
    type: 'park' | 'state'
}

const resultClass = "p-4 py-2";

export const Results = ({ items, isPending, error, type }: IResults) => {
    const navigate = useNavigate();

    // Add color
    // const toggleClass = (e: React.MouseEvent) => {
    //     (e.target as HTMLLIElement).classList.toggle("hover");
    // };

    const handleParkSelect = (park: any) => {
        navigate(`/${type}/${park}`);
    };
    return (
        <ul className='bg-white border rounded-b-lg absolute top-full w-full max-h-[200px] max-w-md overflow-auto list-none'>
            {error && <li className={resultClass}>An error has occurred: {error.message}</li>}
            {isPending && <li className={resultClass}>Loading</li>}
            {items?.map((i) => (
                <li
                    className={`${resultClass} cursor-pointer`}
                    key={i.value}
                    // onMouseEnter={toggleClass}
                    // onMouseLeave={toggleClass}
                    onClick={() => {
                        handleParkSelect(i.value);
                    }}
                >
                    {i.title}
                </li>
            ))}
        </ul>
    );
};
