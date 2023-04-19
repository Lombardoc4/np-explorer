import React, { createContext, useEffect, useState } from "react";

type ContextType = any

const ParkContext = createContext<ContextType>({});

function ParkProvider({children} : {children: React.ReactNode}){
  const [myData, setMyData] = useState(null);

  useEffect(() => {
    fetch('https://developer.nps.gov/api/v1/parks?limit=500&api_key=XRJp7yE57VgDhz3ndpb3sgLnTKXIkIAxwTrYZkbn')
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