import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { IPark } from "../../utils/hooks/ParkContext";
import { useQuery, useQueryClient, QueryFunctionContext } from "@tanstack/react-query";
import { clsx } from "clsx";
import { Results } from "./Results";
import { useOutsideAlerter } from "../../utils/hooks/useOuterClick";
import debounce from "lodash.debounce";

import XIcon from "../../assets/icons/x.svg?react";
import MagnifierIcon from "../../assets/icons/magnifier.svg?react";
import { IItem } from ".";
import { fetcher } from "../../utils/helper";

const queryParks = async (term: string) => {
    const data = await fetcher(`parks?q=${term}`) as IPark[];

    return data.map((p) => ({
        value: p.parkCode,
        title: p.fullName,
    }));
}

export const ParksDropdown = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [focused, setFocused] = useState(false);
    const navigate = useNavigate();

    // Click outside of search closes search
    const dropdownSearch = useRef<HTMLDivElement>(null);
    useOutsideAlerter(dropdownSearch, () => setFocused(false));

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const clearInput = () => {
        setSearchTerm("");
    };

    const handleParkSelect = (park: any) => {
        navigate(`/park/${park}`);
    };
    const queryClient = useQueryClient();

    const debouncedFetch = useCallback(
        debounce(async (search: string) => {
            queryClient.fetchQuery<IItem[]>({
                queryKey: ["parks", { search }],
                queryFn: async ({ queryKey }) => {
                    const { search } = queryKey[1] as { search: string };
                    if (!search) return [];
                    setFocused(true);
                    return queryParks(search);
                },
            });
        }, 300),
        [queryClient]
    );

    useEffect(() => {
        if (searchTerm) {
            debouncedFetch(searchTerm);
        }
    }, [searchTerm, debouncedFetch]);

    const { status, isPending, error, data } = useQuery<IItem[]>({
        queryKey: ["parks", { search: searchTerm }],
        queryFn: async ({ queryKey }) => {
            const { search } = queryKey[1] as { search: string };
            if (!search) return [];
            setFocused(true);
            return queryParks(search)
        },
        enabled: false, // Disable initial query execution
    });

    return (
        <div
            className={clsx(
                "text-left z-20 bg-white text-black md:absolute w-full max-w-md border rounded-lg mx-auto flex justify-center items-center",
                focused && status === 'success' && "rounded-b-none"
            )}
            ref={dropdownSearch}
            onClick={() => setFocused(true)}
        >
            {/* Input form */}
            <form className='relative w-full overflow-hidden flex items-center text-current' autoComplete='off'>
                <MagnifierIcon className='absolute left-3' />
                <XIcon className='absolute right-3 cursor-pointer' onClick={clearInput} />
                <input
                    className='w-full px-[42px] h-12 outline-0'
                    value={searchTerm}
                    onChange={handleSearch}
                    placeholder='Find a park'
                />
            </form>

            {/* Results */}
            {focused && status === "success" && (
                <Results
                    items={data}
                    error={error}
                    isPending={isPending}
                    onSelect={(value) => handleParkSelect(value)}
                />
            )}
        </div>
    );
};
