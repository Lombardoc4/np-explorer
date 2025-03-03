import { Link } from 'react-router';
import { ActivityDetails } from '../../../utils/lib/activityCategories';

export const ParkSectionTitle = ({
  children,
}: {
  children: React.ReactNode;
}) => (
  <h2 className='item-center flex justify-between border-b text-4xl font-thin md:col-span-2 md:text-6xl'>
    {children}
  </h2>
);

const ParkSectionContainer = ({
  name,
  children,
}: {
  name: string;
  children: React.ReactNode;
}) => (
  <div className='px-4' id={name.replace(/ /g, '-').toLowerCase()}>
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
  children: React.ReactNode;
}

export const ParkSection = ({
  name,
  count,
  path,
  children,
}: ParkSectionProps) => {
  return (
    <ParkSectionContainer name={name}>
      <ParkSectionTitle>
        <p>{name}</p>
        {path && count && count > 4 && (
          <Link className='btn btn-primary h-fit text-lg' to={path}>
            View All
          </Link>
        )}
      </ParkSectionTitle>
      <ParkChildrenContainer>{children}</ParkChildrenContainer>
    </ParkSectionContainer>
  );
};
