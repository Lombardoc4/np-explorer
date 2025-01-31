import { IItem } from ".";

interface IResults {
    items: IItem[];
    onSelect: (value: string) => void;
}

export const Results = ({ items, onSelect }: IResults) => {
    const toggleClass = (e: React.MouseEvent) => {
        (e.target as HTMLLIElement).classList.toggle("hover");
    };


    return (
        <ul className='bg-white border rounded-b-lg absolute top-full w-full max-h-[200px] overflow-auto list-none'>
            {items.length <= 0 ? (
                <li className='p-4 py-2 cursor-pointer'>No Matches</li>
            ) : (
                items.map((i) => (
                    <li
                        className='p-4 py-2 cursor-pointer'
                        key={i.value}
                        onMouseEnter={toggleClass}
                        onMouseLeave={toggleClass}
                        onClick={() => {
                            onSelect(i.value);
                        }}
                    >
                        {i.title}
                    </li>
                ))
            )}
        </ul>
    );
};