import React, { createContext, useEffect, useState } from "react";
import { localFetch } from "../helper";
import { useParams } from "react-router-dom";

export interface IPark {
    id: string;
    activites?: string[];
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
    states: string[];
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

const ParkContext = createContext<IPark>({} as IPark);

function ParkProvider({ children }: { children: React.ReactNode }) {
    const [myData, setMyData] = useState<IPark>();
    const { parkId } = useParams();

    useEffect(() => {
        localFetch("park/" + parkId)
            .then((data) => setMyData(data))
            .catch((error) => console.error(error));
    }, [parkId]);

    if (!myData) {
        return <>Loading Park Data</>;
    }

    return <ParkContext.Provider value={myData}>{children}</ParkContext.Provider>;
}

export default ParkContext;
export { ParkProvider };
