import React, { createContext, useEffect, useState } from "react";
import { fetcher } from "../fetch";


type ContextType = any

const ParkContext = createContext<ContextType>({});

function ParkProvider({children} : {children: React.ReactNode}){
  const [myData, setMyData] = useState<any[]>();
  useEffect(() => {

    fetcher('parks?limit=500')
    .then(data => setMyData(data))
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