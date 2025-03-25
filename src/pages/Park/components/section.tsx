import { Link } from 'react-router';
import { Button } from '@/components/ui/button';
import clsx from 'clsx';

export const ParkSectionTitle = ({
  children,
}: {
  children: React.ReactNode;
  subtitle?: boolean;
}) => (
  <div
    className={clsx(
      'item-center flex justify-between border-b text-4xl font-thin md:col-span-2',
    )}
  >
    {children}
  </div>
);

const ParkSectionContainer = ({
  name,
  children,
}: {
  name: string;
  children: React.ReactNode;
}) => (
  <div
    className='container mx-auto px-4'
    id={name.replace(/ /g, '-').toLowerCase()}
  >
    {children}
  </div>
);

const ParkChildrenContainer = ({ children }: { children: React.ReactNode }) => (
  <div className='my-4 grid gap-8 md:mt-8 md:mb-0 md:gap-12 lg:grid-cols-2'>
    {children}
  </div>
);

interface ParkSectionProps extends Omit<ActivityDetails, 'path'> {
  path?: string;
  subtitle?: boolean;
  children: React.ReactNode;
}

export const ParkSection = ({
  subtitle,
  name,
  count,
  path,
  children,
}: ParkSectionProps) => {
  return (
    <ParkSectionContainer name={name}>
      <ParkSectionTitle subtitle={subtitle}>
        <h2
          className={subtitle ? 'text-2xl md:text-4xl' : 'text-4xl md:text-6xl'}
        >
          {name}
        </h2>
        {path && count && count > 4 && (
          <Button asChild>
            <Link className='btn btn-primary my-auto h-fit text-lg' to={path}>
              View All
            </Link>
          </Button>
        )}
      </ParkSectionTitle>
      <ParkChildrenContainer>{children}</ParkChildrenContainer>
    </ParkSectionContainer>
  );
};
