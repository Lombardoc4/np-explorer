import { StateDropdown } from "../Dropdown/StateDropdown";
import { Map } from "./Map"

export const USMap = () => {
    return (
        <div className='min-h-svh container max-w-4xl mx-auto grid items-center snap-center px-4 xl:px-0'>
            <div>
                <Map />
            </div>

            {/* Dropdown is for mobile */}
            {/* Mobile Context? */}
            {/* <p className='text-center text-2xl my-4'>OR</p> */}
        </div>
    );
};
