import { XIcon, Search } from 'lucide-react';
import { useNavigate } from 'react-router';
import { useQuery, useQueryClient, DefaultError } from '@tanstack/react-query';
import { clsx } from 'clsx';
import { useCallback, useEffect, useRef, useState } from 'react';
import debounce from 'lodash.debounce';

import { fetcher } from '../../utils/helper';
import { useOutsideAlerter } from '../../utils/hooks/useOuterClick';
import { stateMap } from '../../utils/lib/stateMap';

const dropdownTypes = {
  park: {
    endpoint: 'parks',
    path: 'park',
  },
} as { [key: string]: { endpoint: 'parks'; path: 'park' } };

const dropdownValues = async (term: string, endpoint: string) => {
  const data = (await fetcher(`${endpoint}?q=${term}`)) as IPark[];

  return data.map((p) => ({
    value: p.parkCode,
    title: p.fullName,
  }));
};

export const Dropdown = ({
  type, // key for endpoint and path names
}: {
  type: 'park' | 'state';
}) => {
  const { endpoint, path } = dropdownTypes[type];
  const [searchTerm, setSearchTerm] = useState('');
  const [focused, setFocused] = useState(false);
  const queryClient = useQueryClient();

  // Click outside of search closes search
  const dropdownSearch = useRef<HTMLDivElement>(null);
  useOutsideAlerter(dropdownSearch, () => setFocused(false));

  const clearInput = (e: React.MouseEvent<SVGElement>) => {
    e.stopPropagation();
    setSearchTerm('');
  };

  const queryFunction = async ({
    queryKey,
  }: {
    queryKey: readonly unknown[];
  }) => {
    const { search } = queryKey[1] as { search: string };
    if (!search) return [];
    setFocused(true);

    if (type === 'state') {
      const states = stateMap.filter((state) =>
        state.name.includes(searchTerm),
      );
      return states.map((s) => ({ value: s.name, title: s.name }));
    }
    return dropdownValues(search, endpoint);
  };

  const { isPending, error, data, refetch } = useQuery<DropdownItem[]>({
    queryKey: [endpoint, { search: searchTerm }],
    queryFn: queryFunction,
    enabled: false, // Disable initial query execution
  });

  const debouncedFetch = useCallback(
    debounce(async () => {
      refetch();
    }, 300),
    [queryClient],
  );

  useEffect(() => {
    if (searchTerm) {
      debouncedFetch();
    }
  }, [searchTerm, debouncedFetch]);

  return (
    <div
      ref={dropdownSearch}
      onClick={() => setFocused(true)}
      className={clsx(
        'absolute z-20 max-w-md rounded-lg border bg-white text-black md:w-full',
        focused && searchTerm.length > 0 && 'rounded-b-none',
      )}
    >
      {/* Input form */}
      <Input
        value={searchTerm}
        handleSearch={setSearchTerm}
        clearInput={clearInput}
      />

      {/* Results */}
      {focused && searchTerm.length > 0 && (
        <Results
          path={path}
          items={data}
          error={error}
          isPending={isPending && searchTerm.length > 0}
        />
      )}
    </div>
  );
};

export interface IItem {
  value: string;
  title: string;
}

const Input = ({
  value,
  handleSearch,
  clearInput,
}: {
  value: string;
  handleSearch: (value: string) => void;
  clearInput: (e: React.MouseEvent<SVGElement>) => void;
}) => {
  return (
    <form
      className='relative flex w-full items-center overflow-hidden text-current'
      autoComplete='off'
    >
      <Search className='absolute left-3' />
      <XIcon className='absolute right-3 cursor-pointer' onClick={clearInput} />
      <input
        className='h-10 w-full px-[42px] outline-0'
        value={value}
        onChange={(e) => handleSearch(e.target.value)}
        placeholder='Find a park'
      />
    </form>
  );
};

interface IResults {
  items?: IItem[];
  isPending: boolean;
  error: DefaultError | null;
  path?: 'park';
}

const resultClass = 'p-4 py-2';

const Results = ({ items, isPending, error, path }: IResults) => {
  const navigate = useNavigate();

  const handleParkSelect = (endpoint: string) => {
    const prefix = path ? `/${path}` : '';
    navigate(`${prefix}/${endpoint}`);
  };
  return (
    <ul className='absolute max-h-[200px] w-full max-w-md list-none overflow-auto rounded-b-lg border bg-white md:top-full'>
      {error && (
        <li className={resultClass}>An error has occurred: {error.message}</li>
      )}
      {isPending && <li className={resultClass}>Loading...</li>}
      {items?.map((i) => (
        <li
          className={`${resultClass} cursor-pointer hover:underline`}
          key={i.value}
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
