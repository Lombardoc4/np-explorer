import { useParams } from "react-router-dom";
import ParkContext from "../utils/hooks/ParkContext";
import { useContext } from "react";
import { stateMap } from "../utils/lib/stateMap";



export const StatePage = () => {
    const park = useContext(ParkContext);
    const { stateId } = useParams();
    const states = stateMap.filter((state) => state.id === stateId);

    return (
        <>
            <h1>In progress</h1>
        </>
    );
};
