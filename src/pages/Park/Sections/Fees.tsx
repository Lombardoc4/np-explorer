import { Info } from 'lucide-react';
import { useState } from 'react';

export const FeeSection = ({ entranceFees }: { entranceFees: Fee[] }) => {
  if (!entranceFees || entranceFees.length <= 0) {
    return (
      <div className='border-green -mb-8 rounded border-2 px-4 py-2'>
        <h2 className='text-xl font-black md:text-2xl'>No Entrance Fees</h2>
      </div>
    );
  }

  return (
    <div id='fees' className='w-full'>
      <div className='col-span-2 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-8'>
        {entranceFees.map((fee: Fee) => (
          <FeeItem
            key={fee.title}
            cost={fee.cost}
            title={fee.title}
            description={fee.description}
          />
        ))}
      </div>
    </div>
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

  const subtitle = title.slice(0, title.indexOf('-'));
  title = title.slice(title.indexOf('-') + 1, title.length);

  return (
    <div className='relative w-full rounded-lg border-2 border-green-700 p-2'>
      <h3 className='text-xs'>{subtitle}</h3>
      <h3 className='text-base font-black md:text-xl'>{title}</h3>
      <div className='flex gap-2'>
        <p className='font'>${cost}</p>
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
