import { Link } from 'react-router';
import { ActivityDetails } from '../../../utils/lib/activityCategories';

export const ParkSectionTitle = ({
  children,
}: {
  children: React.ReactNode;
}) => (
  <h2 className='border-b text-4xl font-thin md:col-span-2 md:text-6xl'>
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
  <div className='scroll-m-20' id={name.replace(/\ /g, '-').toLowerCase()}>
    {children}
  </div>
);

const ParkChildrenContainer = ({ children }: { children: React.ReactNode }) => (
  <div className='my-4 grid gap-8 md:mt-8 md:grid-cols-2 md:gap-16'>
    {children}
  </div>
);

interface ParkSectionProps extends Omit<ActivityDetails, 'path'> {
  path?: string;
  children: React.ReactNode;
}

export const ParkSection = ({
  icon,
  name,
  count,
  path,
  children,
}: ParkSectionProps) => {
  return (
    <ParkSectionContainer name={name}>
      <ParkSectionTitle>
        {icon}
        <p>
          {path ? <Link to={path}>{name}</Link> : name} {count && ` - ${count}`}
        </p>
      </ParkSectionTitle>
      <ParkChildrenContainer>{children}</ParkChildrenContainer>
    </ParkSectionContainer>
  );
};
