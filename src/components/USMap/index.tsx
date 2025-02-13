import { StateDropdown } from '../Dropdown/StateDropdown';
import { Map } from './Map';

export const USMap = () => {
  return (
    <div className='container mx-auto grid min-h-svh max-w-4xl snap-center items-center px-4 lg:px-0'>
      <div>
        <Map />
      </div>

      {/* Dropdown is for mobile */}
      {/* Mobile Context? */}
      {/* <p className='text-center text-2xl my-4'>OR</p> */}
    </div>
  );
};
