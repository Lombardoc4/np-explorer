import { DefaultError } from "@tanstack/react-query";
import { IItem } from ".";

interface IResults {
    items: IItem[];
    isPending: boolean;
    error: DefaultError | null;
    onSelect: (value: string) => void;
}

const resultClass = "p-4 py-2";

export const Results = ({ items, isPending, error, onSelect }: IResults) => {
    const toggleClass = (e: React.MouseEvent) => {
        (e.target as HTMLLIElement).classList.toggle("hover");
    };
    return (
        <ul className='bg-white border rounded-b-lg absolute top-full w-full max-h-[200px] max-w-md overflow-auto list-none'>
            {error && <li className={resultClass}>An error has occurred: {error.message}</li>}
            {isPending && <li className={resultClass}>Loading</li>}
            {items.map((i) => (
                <li
                    className={`${resultClass} cursor-pointer`}
                    key={i.value}
                    onMouseEnter={toggleClass}
                    onMouseLeave={toggleClass}
                    onClick={() => {
                        onSelect(i.value);
                    }}
                >
                    {i.title}
                </li>
            ))}
        </ul>
    );
};
