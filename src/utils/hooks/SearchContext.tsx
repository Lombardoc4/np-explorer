import React, { createContext, useEffect, useState } from "react";
import { fetcher, localFetch } from "../helper";
import { IPark } from "./ParkContext";
import { useQuery } from "@tanstack/react-query";
import ErrorPage from "../../pages/Error";

export interface ISearch {
    fullName: string;
    parkCode: string;
    entranceFees?: {
        cost: number;
        description: string;
        title: string;
    }[];
    entrancePasses?: {
        cost: number;
        description: string;
        title: string;
    }[];
    activites: string[];
    states: string[];
    longitude: string,
    latitude: string,
}

const SearchContext = createContext<IPark[]>([]);

function SearchProvider({ children }: { children: React.ReactNode }) {
    const { isPending, isError, error, data } = useQuery({
        queryKey: ["searchParks"],
        queryFn: async () => {
            const response = await fetch(
                `https://developer.nps.gov/api/v1/${"parks?"}&limit=500&api_key=${import.meta.env.VITE_NPS_API_KEY}`
            );
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        },
    });

    // const [myData, setMyData] = useState<IPark[]>();
    // useEffect(() => {
    //     // localFetch("parks")
    //     fetchParks('parks?')
    //         .then((data) => setMyData(data))
    //         .catch((error) => console.error(error));
    // }, []);

    if (isPending) return children

    if (isError) {
        return <span>Error: {error.message}</span>
      }
    // if (!myData) return <>Loading Search Data</>;

    return <SearchContext.Provider value={data.data}>{children}</SearchContext.Provider>;
}

export default SearchContext;
export { SearchProvider };
