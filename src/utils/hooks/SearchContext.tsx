// import React, { createContext } from "react";
// import { useQuery } from "@tanstack/react-query";

// const SearchContext = createContext<IPark[]>([]);

// function SearchProvider({ children }: { children: React.ReactNode }) {
//     const { isPending, isError, error, data } = useQuery({
//         queryKey: ["searchParks"],
//         queryFn: async () => {
//             const response = await fetch(
//                 `https://developer.nps.gov/api/v1/${"parks?"}&limit=500&api_key=${import.meta.env.VITE_NPS_API_KEY}`
//             );
//             if (!response.ok) {
//                 throw new Error("Network response was not ok");
//             }
//             return response.json();
//         },
//     });

//     if (isPending) return children;

//     if (isError) {
//         return <span>Error: {error.message}</span>;
//     }

//     return <SearchContext.Provider value={data.data}>{children}</SearchContext.Provider>;
// }

// export default SearchContext;
// export { SearchProvider };
