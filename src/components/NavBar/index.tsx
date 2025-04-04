import { Link, useLocation } from 'react-router';

import logo from '../../assets/npe-green.svg';
import { Dropdown } from '../Dropdown';
import { ThemeSwitcher } from './ThemeToggler';

export const NavBar = () => {
  const location = useLocation();

  return (
    <nav className='fixed start-0 end-0 top-0 z-30 flex h-[64px] bg-white/25 shadow backdrop-blur-lg backdrop-filter dark:bg-zinc-900/10'>
      <div className='mx-auto flex w-full items-center justify-center px-6'>
        {/* Left */}
        <div className='mr-auto'>
          <Link to='/' className='flex'>
            {/* <Logo src={logo} alt="National Park Exp Logo"/> */}
            <img src={logo} alt='NPS Logo' className='max-w-20' />
          </Link>
        </div>

        {/* Middle */}
        <div className='relative h-10 w-md'>
          {location.pathname !== '/' && <Dropdown type='park' />}
        </div>

        <div className='ml-4'>
          <ThemeSwitcher />
        </div>

        {/* Right */}
        {/* <div className="side right">
                        <Link to='/about' >
                            <button>
                                About
                            </button>
                        </Link>
                    </div> */}
      </div>
    </nav>
  );
};
