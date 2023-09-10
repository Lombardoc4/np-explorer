import { FilterProps } from "../pages/Park/components";
import { IPark } from "./hooks/ParkContext";


export const localFetch = async (input: RequestInfo, init?: RequestInit) => {
    const res = await fetch(`http://localhost:3000/${input}`, init);
    const data = await res.json();

    // Set Local Storage for indepth data

    return data;
};

export const fetcher = async (input: RequestInfo, init?: RequestInit) => {
    const url = `https://developer.nps.gov/api/v1/${input}&limit=500&api_key=${import.meta.env.VITE_NPS_API_KEY}`;
    const res = await fetch(url, init);
    const data = await res.json();

    // Set Local Storage for indepth data

    return data.data;
};

export const filterParks = (filters: FilterProps, parks: any[]): IPark[] => {
    return parks.filter((p: any) => {
        const entranceFees = p.entranceFees.length > 0 ? "paid" : "free";
        const entrancePasses = p.entrancePasses.length > 0 ? "annual-pass" : "";
        if (
            (filters.entranceFees && entranceFees !== filters.entranceFees) ||
            (filters.entrancePasses && entrancePasses !== filters.entrancePasses)
        )
            return false;

        if (filters.activities && filters.activities.length > 0) {
            const match = filters.activities.every((a) => p.activities.find((pa: any) => pa.name === a));
            if (!match) return false;
        }
        return true;
    });
};

export const uniqueCategoryItems = (categories: any) => {
    const unique = Array.from(new Set(categories.map((obj: any) => obj.name || obj.title))).map((id) => {
        return categories.find((obj: any) => obj.name === id || obj.title === id);
    });
    return unique;
};

export const scrollToHash = () => {
    const hash = window.location.hash;
    if (hash.length > 0) {
        const el = document.querySelector(hash) as HTMLElement;
        el?.scrollIntoView();
    }
};
