import React, { createContext, useEffect, useState } from "react";
import { fetcher } from "../helper";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { SetLocalStorage } from "../localStorage";



const initContext = {
    status: "pending" as "error" | "success" | "pending",
    error: null as Error | null,
    data: undefined as IPark | undefined
}

const ParkContext = createContext(initContext);

function ParkProvider({ children }: { children: React.ReactNode }) {
    const { parkId } = useParams();
    const [context, setContext] = useState(initContext);


    const { status, data, error } = useQuery<IPark>({
        queryKey: ["parks", { parkCode: parkId }],
        queryFn: async ({ queryKey }) => {
            const { parkCode } = queryKey[1] as { parkCode: string };
            if (!parkCode) return [];

            const data = await fetcher(`parks?parkCode=${parkCode}`);
            SetLocalStorage({
                name: data[0].fullName,
                parkCode: data[0].parkCode,
            });
            return data[0];
        },
        retry: 1,
        staleTime: 5 * 60 * 1000,
        enabled: !!parkId, // Enable query execution only if parkId exists
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
