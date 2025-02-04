import { useQuery, useQueryClient } from "@tanstack/react-query";
import { clsx } from "clsx";
import { useCallback, useEffect, useRef, useState } from "react";
import debounce from "lodash.debounce";

import { Results } from "./Results";
import { Input } from "./Input";

import { useOutsideAlerter } from "../../utils/hooks/useOuterClick";
import { fetcher } from "../../utils/helper";

const dropdownValues = async (term: string) => {
    const data = await fetcher(`parks?q=${term}`) as IPark[];

    return data.map((p) => ({
        value: p.parkCode,
        title: p.fullName,
    }));
}

export const ParksDropdown = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [focused, setFocused] = useState(false);
    const queryClient = useQueryClient();

    // Click outside of search closes search
    const dropdownSearch = useRef<HTMLDivElement>(null);
    useOutsideAlerter(dropdownSearch, () => setFocused(false));

    const clearInput = (e: React.MouseEvent<SVGElement>) => {
        e.stopPropagation()
        setSearchTerm("");
    };

    const debouncedFetch = useCallback(
        debounce(async (search: string) => {
            queryClient.fetchQuery<DropdownItem[]>({
                queryKey: ["parks", { search }],
                queryFn: async ({ queryKey }) => {
                    const { search } = queryKey[1] as { search: string };
                    if (!search) return [];
                    setFocused(true);
                    return dropdownValues(search);
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

    const { status, isPending, error, data } = useQuery<DropdownItem[]>({
        queryKey: ["parks", { search: searchTerm }],
        queryFn: async ({ queryKey }) => {
            const { search } = queryKey[1] as { search: string };
            if (!search) return [];
            setFocused(true);
            return dropdownValues(search);
        },
        enabled: false, // Disable initial query execution
    });

    return (
        <div
            ref={dropdownSearch}
            onClick={() => setFocused(true)}
            className={clsx(
                "z-20 bg-white text-black md:absolute w-full max-w-md border rounded-lg",
                focused && status === "success" && "rounded-b-none"
            )}
        >
            {/* Input form */}
            <Input value={searchTerm} handleSearch={setSearchTerm} clearInput={clearInput} />

            {/* Results */}
            {focused && (
                <Results type='park' items={data} error={error} isPending={isPending && searchTerm.length > 0} />
            )}
        </div>
    );
};
