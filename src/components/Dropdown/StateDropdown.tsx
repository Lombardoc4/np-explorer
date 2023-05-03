import { Dropdown } from "../Dropdown";
import { useNavigate } from "react-router-dom";
import { stateMap } from "../../utils/data/stateMap";

export const StateDropdown = () => {
    const navigate = useNavigate();
    
    const handleStateSelect = (state: string) => {
      navigate(`/state/${state}`)
    }
    
    return(
        <Dropdown
        placeholder='Search for a state'
        // options={allParks.map((park) => ({value: park.id, title: park.fullName}))}
        options={stateMap.map((state) => ({value: state.id, title: state.name}))}
        onSelect={(option) => handleStateSelect(option)}
        />
    )
}