import { useContext } from "react";
import { Dropdown } from "../Dropdown";
import { useNavigate } from "react-router-dom";
import ParkContext from "../../utils/hooks/ParkContext";
import SearchContext, { ISearch } from "../../utils/hooks/SearchContext";

export const ParksDropdown = () => {
    const searchVals = useContext(SearchContext);
    const navigate = useNavigate();

    const handleParkSelect = (park: any) => {
        navigate(`/park/${park}`);
    };

    return (
        <Dropdown
            placeholder='Find a park'
            options={searchVals.map((park: ISearch) => ({ value: park.parkCode, title: park.fullName }))}
            // options={Array(5).fill('6').map((_, i) => ({value: i + '', title: `Option ${i}`}))}
            onSelect={(option) => handleParkSelect(option)}
        />
    );
};
