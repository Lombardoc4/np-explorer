import React, { createContext, useEffect, useState } from "react";
import { fetcher, localFetch } from "../helper";

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

const SearchContext = createContext<ISearch[]>([]);

function SearchProvider({ children }: { children: React.ReactNode }) {
    const [myData, setMyData] = useState<ISearch[]>();
    useEffect(() => {
        localFetch("parks")
            .then((data) => setMyData(data))
            .catch((error) => console.error(error));
    }, []);

    if (!myData) return <>Loading Search Data</>;

    return <SearchContext.Provider value={myData}>{children}</SearchContext.Provider>;
}

export default SearchContext;
export { SearchProvider };
