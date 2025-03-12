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
  addresses: Address[];
  location: {
    latitude?: string;
    longitude?: string;
    url?: string;
    directionsUrl?: string;
    contacts?: Contacts;
  };
}) => {
  const { latitude, longitude, directionsUrl, url, contacts } = location;
  return (
    <div className='h-fit'>
      <div className='grid gap-4 md:grid-cols-2'>
        {/* Address */}
        <div>
          <h3 className='text-xl font-thin'>Address</h3>
          {addresses.length > 0 &&
            addresses.map((add: Address) => (
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
          <h3 className='text-xl font-thin'>Contact</h3>
          <ContactCard contacts={contacts} />
        </div>
      </div>

      {/* Official Page Link */}
      <div className='mt-4'>
        {url && (
          <Link
            to={url}
            target='_blank'
            className='flex items-center gap-1 text-sm italic hover:underline'
          >
            <LinkIcon className='inline' size={16} /> Official Parks Page
          </Link>
        )}
        {directionsUrl && (
          <Link
            className='flex items-center gap-1 text-sm italic hover:underline'
            target='_blank'
            to={directionsUrl}
          >
            <LinkIcon className='inline' size={16} /> Official Directions
          </Link>
        )}
      </div>
    </div>
  );
};

const formatGoogleUrl = ({ line1, city, stateCode, postalCode }: Address) => {
  return `https://www.google.com/maps/search/?api=1&query=${line1
    .replace(/ /g, '+')
    .replace('.', '')}${city.replace(/ /g, '+')} ${stateCode} ${postalCode}`;
};

const DirectionAddress = ({ address }: { address: Address }) => {
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
