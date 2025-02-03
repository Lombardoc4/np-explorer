import { StateDropdown } from "../Dropdown/StateDropdown";
import { Map } from "./Map"

export const USMap = () => {
    return (
        <div className='py-12 container mx-auto grid items-center'>

            <Map />

            {/* Dropdown is for mobile */}
            {/* Mobile Context? */}
            {/* <p className='text-center text-2xl my-4'>OR</p> */}

        </div>
    );
};
