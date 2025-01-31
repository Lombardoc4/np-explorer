import React, { createContext, useEffect, useState } from "react";
import { fetcher, localFetch } from "../helper";
import { useParams } from "react-router";

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

const ParkContext = createContext<IPark>({} as IPark);

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
    const [myData, setMyData] = useState<IPark>();
    const { parkId } = useParams();

    useEffect(() => {

        // localFetch("park/" + parkId)
        fetcher('parks?parkCode=' + parkId)
            .then((data: IPark[]) => {
                // console.log('fetchData', data);
                // Set Context
                setMyData(data[0])

                // Set/Update Local Storage
                SetLocalStorage({
                    name: data[0].fullName,
                    parkCode: data[0].parkCode
                })

            })
            .catch((error) => console.error(error));
    }, [parkId]);

    if (!myData) {
        return <>Loading Park Data</>;
    }

    return <ParkContext.Provider value={myData}>{children}</ParkContext.Provider>;
}

export default ParkContext;
export { ParkProvider };
