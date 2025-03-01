import { Dropdown } from '../../components/Dropdown';
import { Footer } from '../../components/Footer';
import SEO from '../../components/SEO';
import { Description } from './DescriptionFeature';
const bgUrl = '/Grand_Teton_Landing_BG.jpg';

export const LandingPage = () => {
  return (
    <>
      <SEO title='Home' description='Explore Your Favorite National Park' />

      {/* Section 1 - Header */}
      <Header />

      {/* Section Divider */}
      <WaveDivider />

      {/* Section 2 - Description */}
      <Description />

      {/* Section 3 - Selection Map */}
      {/* <USMap /> */}

      {/* Footer */}
      <Footer />
    </>
  );
};
const WaveDivider = () => (
  <div className='-mt-8 -mb-1 w-full'>
    <svg
      width='100%'
      height='60' // Reduced height
      viewBox='0 0 1440 120' // Adjusted viewBox to match height
      fill='currentColor'
      xmlns='http://www.w3.org/2000/svg'
      preserveAspectRatio='none'
      className='block text-[var(--color-green)]'
    >
      <path d='M0,96L80,80C160,64,320,32,480,37.3C640,43,800,85,960,90.7C1120,96,1280,64,1360,48L1440,32V120H0Z'></path>
    </svg>
  </div>
);

const Header = () => (
  <header id='home' className='mt-4 grid min-h-dvh items-center sm:mt-0'>
    <div className='container px-4 md:mx-auto'>
      <h1 className='text-xl md:text-3xl'>
        Explore Your Favorite <br />
        <span className='text-3xl uppercase md:text-6xl lg:text-7xl'>
          National Parks
        </span>
      </h1>
      <div
        style={{ backgroundImage: `url(${bgUrl})` }}
        className={`my-2 h-[400px] overflow-hidden rounded-xl border-4 bg-cover bg-center shadow-2xl sm:my-4 md:h-[500px] dark:shadow-md dark:shadow-white`}
      >
        <div className='relative flex h-full w-full items-center justify-center bg-black/25 px-4 text-white lg:px-0'>
          <Dropdown type='park' />
        </div>
      </div>
    </div>
  </header>
);
