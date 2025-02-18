import { LinkIcon } from 'lucide-react';
import { Link } from 'react-router';
import { ContactCard } from '../../pages/Park/Sections/Contact';
import { ParkSection } from '../../pages/Park/Sections';

export const DirectionSection = ({
  location,
}: {
  location: IPark | ICampground | IVisitorCenter;
}) => {
  const { addresses } = location;

  return (
    <ParkSection name={'Directions'}>
      <div>
        <p className='text-xl'>
          {'directionsOverview' in location && location.directionsOverview}
          {'directionsInfo' in location && location.directionsInfo}
        </p>
        <a
          className='mt-4 flex items-center gap-1 text-sm italic hover:underline'
          target='_blank'
          href={location.directionsUrl}
        >
          <LinkIcon className='inline' size={16} /> Official Directions
        </a>
      </div>

      {/* Address and Contact Info */}
      <AddressContact addresses={addresses || []} location={location} />
    </ParkSection>
  );
};

const AddressContact = ({
  addresses,
  location,
}: {
  addresses: IAddress[];
  location: {
    latitude?: string;
    longitude?: string;
    url?: string;
    contacts?: IContacts;
  };
}) => {
  const { latitude, longitude, url, contacts } = location;
  return (
    <div className='h-fit rounded border p-4'>
      <div className='grid gap-4 md:grid-cols-2'>
        {/* Address */}
        <div>
          <h3 className='text-2xl font-thin underline'>Address</h3>
          {addresses.length > 0 &&
            addresses.map((add: IAddress) => (
              <DirectionAddress key={add.line1} address={add} />
            ))}
          <a
            target='_blank'
            href={`https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`}
          >
            {latitude?.slice(0, 8)}, {longitude?.slice(0, 8)}
          </a>{' '}
        </div>

        {/* Contact */}
        <div>
          <h3 className='text-2xl font-thin underline'>Contact</h3>
          <ContactCard contacts={contacts} />
        </div>
      </div>

      {/* Official Page Link */}
      {url && (
        <Link
          to={url}
          target='_blank'
          className='mt-4 flex items-center gap-1 text-sm italic hover:underline'
        >
          <LinkIcon className='inline' size={16} /> Official Parks Page
        </Link>
      )}
    </div>
  );
};

const formatGoogleUrl = ({ line1, city, stateCode, postalCode }: IAddress) => {
  return `https://www.google.com/maps/search/?api=1&query=${line1
    .replace(/ /g, '+')
    .replace('.', '')}${city.replace(/ /g, '+')} ${stateCode} ${postalCode}`;
};

const DirectionAddress = ({ address }: { address: IAddress }) => {
  if (address.type !== 'Physical') return;

  const { line1, city, stateCode, postalCode } = address;
  return (
    <p key={line1}>
      <a target='_blank' href={formatGoogleUrl(address)}>
        {line1},<br /> {city}, {stateCode} {postalCode}
      </a>
    </p>
  );
};
