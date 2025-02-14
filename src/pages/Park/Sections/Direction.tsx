import { LinkIcon } from 'lucide-react';
import { JSX } from 'react';
import { Link } from 'react-router';
import { ContactCard } from './Contact';
import { ParkSection } from '.';

export const DirectionSection = ({
  location,
  children,
}: {
  location: any;
  children?: JSX.Element;
}) => {
  const { addresses } = location;

  return (
    <ParkSection name={'Directions'}>
      <div>
        <p className='text-xl'>{children || location.directionsInfo}</p>
        <a
          className='text-sm italic underline'
          target='_blank'
          href={location.directionsUrl}
        >
          Official National Park Directions
        </a>
      </div>

      {/* Address and Contact Info */}
      <div className='h-fit rounded border p-4'>
        <div className='grid gap-4 xl:grid-cols-2'>
          <div>
            <h3 className='text-2xl font-thin underline'>Address</h3>
            {addresses.length > 0 && <DirectionAddress addresses={addresses} />}
            <a
              target='_blank'
              href={`https://www.google.com/maps/search/?api=1&query=${location.latitude},${location.longitude}`}
            >
              {location.latitude.slice(0, 8)}, {location.longitude.slice(0, 8)}
            </a>
          </div>
          <div>
            <h3 className='text-2xl font-thin underline'>Contact</h3>
            <ContactCard contacts={location.contacts} />
          </div>
        </div>
        {location.url && (
          <div className='col-span-2 mt-4'>
            <Link
              to={location.url}
              className='flex items-center gap-1 text-lg font-black hover:underline'
            >
              <LinkIcon className='inline' size={16} /> Official National Parks
              Page
            </Link>
          </div>
        )}
      </div>
    </ParkSection>
  );
};

const DirectionAddress = ({ addresses }: { addresses: any[] }) => {
  addresses
    .filter((add: any) => add.type === 'Physical')
    .map((add: any) => {
      add.gMapsUrl = `https://www.google.com/maps/search/?api=1&query=${add.line1
        .replaceAll(' ', '+')
        .replace(
          '.',
          '',
        )} ${add.city.replaceAll(' ', '+')} ${add.stateCode} ${add.postalCode}`;
      add.full = (
        <>
          {add.line1},<br /> {add.city}, {add.stateCode} {add.postalCode}
        </>
      );
    });

  return (
    <>
      {addresses
        .filter((add: any) => add.type === 'Physical')
        .map((add: any) => (
          <p key={add.full}>
            <a target='_blank' href={add.gMapsUrl}>
              {add.full}
            </a>
          </p>
        ))}
    </>
  );
};
