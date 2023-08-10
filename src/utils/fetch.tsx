
// Specific to NPS API
// export const fetchApi = async (endpoint: string, filters ?: string, cache?: 'short'|'long') => {

//     const cacheLimit = cache ? cache === 'short' ?  "300": "86400" : "0";

//     console.log('url', url);
//     // Make fetch call
//     const response = await fetch( url,
//         {
//             headers: {
//                 'Cache-Control': `max-age=${cacheLimit}`
//             }
//         }
//     );

//     console.log('response', response);

//     const { data } = await response.json();

//     // Return data
//     return data;
// }

export const fetcher = async (input: RequestInfo,  init?: RequestInit): Promise<any[]>  => {
    const url = `https://developer.nps.gov/api/v1/${input}&api_key=${import.meta.env.VITE_NPS_API_KEY}`;
    const res = await fetch(url, init);
    const data = await res.json();

    // Set Local Storage for indepth data

    return data.data;
  }
