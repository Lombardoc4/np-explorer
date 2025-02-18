import { Info } from 'lucide-react';
import { useState } from 'react';
import { ParkSection } from '../components/section';

export const FeeSection = ({ entranceFees }: { entranceFees: IFee[] }) => {
  return (
    <ParkSection name='Entrance Fees'>
      <div className='col-span-2 grid grid-cols-2 gap-8 md:grid-cols-4'>
        {entranceFees.length === 0 ? (
          <p className='mb-4 text-xl font-black'>No Entrance Fees</p>
        ) : (
          <>
            {entranceFees.map((fee: IFee) => (
              <FeeItem
                key={fee.title}
                cost={fee.cost}
                title={fee.title}
                description={fee.description}
              />
            ))}
          </>
        )}
      </div>
    </ParkSection>
  );
};

const FeeItem = ({
  cost,
  title,
  description,
}: {
  cost: string;
  title: string;
  description: string;
}) => {
  const [showDescription, setShowDescription] = useState(false);

  title = title
    .replace('-', '\u2011')
    .replace('/', ' ')
    .slice(title.indexOf('-') + 1, title.length);

  return (
    <div className='relative w-full'>
      <h3 className='text-xl'>{title}</h3>
      <div className='flex gap-2'>
        <p className='font-bold'>${cost}</p>
        <Info
          onMouseEnter={() => setShowDescription(true)}
          onMouseLeave={() => setShowDescription(false)}
        />
      </div>
      {showDescription && (
        <p className='absolute bottom-full m-[4px] rounded border border-black bg-white p-2 text-sm text-black'>
          {description}
        </p>
      )}
    </div>
  );
};
