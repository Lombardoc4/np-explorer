import { Dropdown } from "../Dropdown";
import { useNavigate } from "react-router";
import { stateMap } from "../../utils/lib/stateMap";

export const StateDropdown = () => {
    const navigate = useNavigate();

    const handleStateSelect = (state: string) => {
      navigate(`/${state}`)
    }

    return(
        <Dropdown
        placeholder='Search for a state'
        options={stateMap.map((state) => ({value: state.id, title: state.name}))}
        onSelect={(option) => handleStateSelect(option)}
        />
    )
}