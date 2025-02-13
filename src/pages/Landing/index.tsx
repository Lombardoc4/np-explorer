import { ParksDropdown } from '../../components/Dropdown/ParksDropdown';
import SEO from '../../components/SEO';
import { Description } from './DescriptionFeature';

export const LandingPage = () => {
  return (
    <>
      <SEO title='Home' description='Explore Your Favorite National Park' />

      {/* Section 1 - Header */}
      <Header />

      {/* Section 2 - Description */}
      <Description />

      {/* Section 3 - Selection Map */}
      {/* <USMap /> */}
    </>
  );
};

const bgUrl = '/Grand_Teton_Landing_BG.jpg';
const Header = () => (
  <header className='grid min-h-dvh items-center'>
    <div className='container max-w-5xl px-4 md:mx-auto'>
      <h1 className='hidden'>Explore Your Favorite National Park</h1>
      <p className='text-3xl font-black uppercase md:text-6xl'>Explore Your</p>
      <div
        style={{ backgroundImage: `url(${bgUrl})` }}
        className={`h-[300px] overflow-hidden rounded-xl border-2 bg-cover bg-center md:h-[500px]`}
      >
        <div className='relative flex h-full w-full items-center justify-center bg-black/25 px-4 text-white lg:px-0'>
          <ParksDropdown />
        </div>
      </div>
      <p className='text-right text-3xl font-black uppercase md:text-6xl'>
        Favorite National Parks
      </p>
    </div>
  </header>
);
