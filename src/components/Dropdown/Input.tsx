import { XIcon, Search } from "lucide-react";

export const Input = ({
    value,
    handleSearch,
    clearInput,
}: {
    value: string;
    handleSearch: (value: string) => void;
    clearInput: (e: React.MouseEvent<SVGElement>) => void;
}) => {
    return (
        <form className='relative w-full overflow-hidden flex items-center text-current' autoComplete='off'>
            <Search className='absolute left-3' />
            <XIcon className='absolute right-3 cursor-pointer' onClick={clearInput} />
            <input
                className='w-full px-[42px] h-10 outline-0'
                value={value}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder='Find a park'
            />
        </form>
    );
};
