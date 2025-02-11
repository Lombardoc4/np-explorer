import { DefaultError } from '@tanstack/react-query';
import { IItem } from '.';
import { useNavigate } from 'react-router';

interface IResults {
  items?: IItem[];
  isPending: boolean;
  error: DefaultError | null;
  type: 'park' | 'state';
}

const resultClass = 'p-4 py-2';

export const Results = ({ items, isPending, error, type }: IResults) => {
  const navigate = useNavigate();

  // Add color
  // const toggleClass = (e: React.MouseEvent) => {
  //     (e.target as HTMLLIElement).classList.toggle("hover");
  // };

  const handleParkSelect = (park: string) => {
    navigate(`/${type}/${park}`);
  };
  return (
    <ul className='absolute max-h-[200px] w-full max-w-md list-none overflow-auto rounded-b-lg border bg-white md:top-full'>
      {error && (
        <li className={resultClass}>An error has occurred: {error.message}</li>
      )}
      {isPending && <li className={resultClass}>Loading...</li>}
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
