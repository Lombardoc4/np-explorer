import { Search } from 'lucide-react';
import { iconMap } from '../../utils/lib/iconMap';
import { featureInfo, featureInfoProps } from './descriptions';
import { Link } from 'react-scroll';

export const Description = () => (
  <section className='bg-[var(--color-green)] py-16 text-[var(--color-text)] md:py-24 dark:bg-[var(--color-green)] dark:text-[var(--color-text)]'>
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
          className='btn btn-secondary mx-auto flex w-fit gap-2'
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
    <div className='flex flex-col items-center rounded-lg bg-[var(--color-navbar)] p-6 shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-2xl dark:bg-[var(--color-navbar)] dark:shadow-lg'>
      {/* Icon - Centered Above Content */}
      <div className='flex h-20 w-20 items-center justify-center rounded-full bg-[var(--color-bg-2)] p-3 shadow-md md:h-24 md:w-24'>
        <Icon className='h-12 w-12 text-[var(--color-text)] md:h-14 md:w-14 dark:text-[var(--color-text)]' />
      </div>

      {/* Text Content */}
      <div className='mx-auto mt-6 max-w-lg text-center'>
        <h3 className='text-2xl font-bold md:text-3xl'>{title}</h3>
        <hr className='my-4 rounded border-2 border-[var(--color-green)] dark:border-[var(--color-green)]' />
        <p className='leading-relaxed text-[var(--color-secondary)] md:text-xl dark:text-[var(--color-secondary)]'>
          {description}
        </p>
      </div>
    </div>
  );
};
