import { StateDropdown } from "../Dropdown/StateDropdown";
import { Map } from "./Map"

export const USMap = () => {
    return (
        <div className='py-12'>
            <div className='container mx-auto grid items-center'>
                <h2 className='text-6xl uppercase font-semibold italic'>Where To?</h2>

                <Map />

                {/* Dropdown is for mobile */}
                {/* Mobile Context? */}
                <p className='text-center text-2xl my-4'>OR</p>

                <div className='px-4 w-full min-h-[50px] relative flex justify-center'>
                    <StateDropdown />
                </div>
            </div>
        </div>
    );
};
