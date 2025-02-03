import React, { createContext, useEffect, useState } from "react";
import { fetcher, localFetch } from "../helper";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";

export interface IPark {
    id: string;
    // activites: string[];
    activites: {
        id: string,
        name: string,
    }
    addresses?: {
        line1: string;
        line2: string;
        line3: string;
        city: string;
        stateCode: string;
        countryCode: string;
        provinceTerritoryCode: string;
        postalCode: string;
        type: string;
    };
    contacts?: {
        phoneNumbers: {
            phoneNumber: string;
            description: string;
            extension: string;
            type: " Voice" | "Fax" | "TTY";
        }[];
        emailAddresses: {
            emailAddress: string;
            description: string;
        }[];
    };
    description: string;
    designation: string;
    directionsInfo: string;
    directionUrl: string;
    entranceFees: {
        cost: number;
        title: string;
        description: string;
    }[];
    entrancePasses: {
        cost: number;
        title: string;
        description: string;
    }[];
    fullName: string;
    name: string;
    operatingHours?: {
        name: string;
        description: string;
        standardHours: {
            sunday: string;
            monday: string;
            tuesday: string;
            wednesday: string;
            thursday: string;
            friday: string;
            saturday: string;
        };
        exceptions: {
            name: string;
            startDate: string;
            endDate: string;
            exceptionHours: {
                sunday: string;
                monday: string;
                tuesday: string;
                wednesday: string;
                thursday: string;
                friday: string;
                saturday: string;
            };
        }[];
    }[];
    parkCode: string;
    // states: string[];
    states: string,
    images: {
        credit: string;
        altText: string;
        title: string;
        caption: string;
        url: string;
    }[];
    latitude: string;
    longitude: string;
    url?: string;
    weatherInfo?: string;
}

export interface ParkLocalStorage {
    name: string,
    parkCode: string,
}

const initContext = {
    status: "pending" as "error" | "success" | "pending",
    error: null as Error | null,
    data: undefined as IPark | undefined
}

const ParkContext = createContext(initContext);

const SetLocalStorage = (data: ParkLocalStorage) => {
    // Get Local Storage Value
    const recentlyViewed = localStorage.getItem('npe-recently-viewed');

    // If value append else create value
    if (recentlyViewed) {
        const recentArray = JSON.parse(recentlyViewed);
        // Ignore if park already exits
        if (recentArray.find((p: ParkLocalStorage) => p.parkCode === data.parkCode)) {
            return;
        }
        // Limit to 10 parks
        if (recentArray.length > 10) {
            recentArray.shift();
        }
        // Add new park
        recentArray.push(data)
        localStorage.setItem('npe-recently-viewed', JSON.stringify(recentArray))
    } else {
        localStorage.setItem('npe-recently-viewed', JSON.stringify([data]))
    }
}

function ParkProvider({ children }: { children: React.ReactNode }) {
    const { parkId } = useParams();
    const [context, setContext] = useState(initContext);

    const { status, data, error } = useQuery<IPark[]>({
        queryKey: ["parks", { parkCode: parkId }],
        queryFn: async ({ queryKey }) => {
            const { parkCode } = queryKey[1] as { parkCode: string };
            if (!parkCode) return [];

            const data = await fetcher(`parks?parkCode=${parkCode}`);
            console.log("data", data)
            SetLocalStorage({
                name: data[0].fullName,
                parkCode: data[0].parkCode
            })
            return data[0];
        },
        // enabled: !!parkId, // Enable query execution only if parkId exists
    });

    useEffect(() => {

        if (status === "success") {
            setContext({ status: "success", data, error: null });
        } else if (status === "error") {
            setContext({ status: "error", data: undefined, error });
        } else if (status === "pending") {
            setContext((prev) => ({ ...prev, status: "pending" }));
        }
    }, [status, data, error]);

    return <ParkContext.Provider value={context}>{children}</ParkContext.Provider>;
}

export default ParkContext;
export { ParkProvider };
