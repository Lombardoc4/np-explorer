import { useContext } from "react";
import { Dropdown } from "../Dropdown";
import { useLocation, useNavigate } from "react-router";
import { IPark } from "../../utils/hooks/ParkContext";
import SearchContext from "../../utils/hooks/SearchContext";

export const ParksDropdown = () => {
    const location = useLocation();

    const parks = useContext(SearchContext);
    const navigate = useNavigate();

    const handleParkSelect = (park: any) => {
        navigate(`/park/${park}`);
    };

    const options = parks.length > 0 ? parks.map((park: IPark) => ({ value: park.parkCode, title: park.fullName })) : []


    return (
        <Dropdown
            placeholder='Find a park'
            options={options}
            onSelect={(option) => handleParkSelect(option)}
        />
    );
};
