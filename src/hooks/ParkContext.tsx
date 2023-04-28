import React, { createContext, useEffect, useState } from "react";

type ContextType = any

const ParkContext = createContext<ContextType>({});

function ParkProvider({children} : {children: React.ReactNode}){
  console.log('children', children);
  const [myData, setMyData] = useState(null);

  useEffect(() => {
    fetch(`https://developer.nps.gov/api/v1/parks?limit=500&api_key=${import.meta.env.VITE_NPS_API_KEY}`)
      .then(response => response.json())
      .then(data => setMyData(data.data))
      .catch(error => console.error(error));
    }, []);
    
    // console.log('context', myData)

  return (
    <ParkContext.Provider value={myData}>
      {children}
    </ParkContext.Provider>
  );
}

export default ParkContext;
export { ParkProvider };