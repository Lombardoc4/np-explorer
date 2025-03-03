import { iconMap } from '@/utils/lib/iconMap';
import { Search } from 'lucide-react';
import { Dropdown } from '../../components/Dropdown';
import { Footer } from '../../components/Footer';
import SEO from '../../components/SEO';
import { featureInfo, featureInfoProps } from './descriptions';
import { Link } from 'react-scroll';
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
      className='text-secondary block'
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

const Description = () => (
  <section className='bg-secondary py-16 md:py-24'>
    <div className='container mx-auto px-6 text-center lg:px-0'>
      {/* Section Heading */}
      <h2 className='mb-12 text-3xl tracking-wide uppercase md:text-6xl'>
        A Modern take on <br className='hidden md:inline' /> National Parks
      </h2>

      {/* Feature Grid */}
      <div className='mx-auto grid max-w-7xl gap-8 md:grid-cols-2 lg:gap-16'>
        {featureInfo.map((feat) => (
          <Feature key={feat.id} {...feat} />
        ))}
      </div>
      <div className='mt-16'>
        <Link
          to={'home'}
          duration={600}
          className='bg-accent text-accent-foreground mx-auto flex w-fit gap-2 rounded-lg px-3 py-2'
        >
          <Search /> Begin Your Search Now
        </Link>
      </div>
    </div>
  </section>
);

const Feature = ({ id, title, description }: featureInfoProps) => {
  const Icon = iconMap[id];

  return (
    <div className='bg-background flex flex-col items-center rounded-lg p-6 shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-2xl dark:shadow-lg'>
      {/* Icon - Centered Above Content */}
      <div className='bg-background flex h-20 w-20 items-center justify-center rounded-full p-3 shadow-md md:h-24 md:w-24'>
        <Icon className='h-12 w-12 text-[var(--color-text)] md:h-14 md:w-14 dark:text-[var(--color-text)]' />
      </div>

      {/* Text Content */}
      <div className='mx-auto mt-6 max-w-lg text-center'>
        <h3 className='text-2xl font-bold md:text-3xl'>{title}</h3>
        <hr className='border-secondary my-4 rounded border-2' />
        <p className='text-secondary-foreground leading-relaxed md:text-xl'>
          {description}
        </p>
      </div>
    </div>
  );
};
