import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Info } from 'lucide-react';

export const FeeSection = ({ entranceFees }: { entranceFees: Fee[] }) => {
  if (!entranceFees || entranceFees.length <= 0) {
    return (
      <div className='border-secondary -mb-8 w-fit rounded border-2 px-4 py-2 md:w-1/2'>
        <h2 className='text-xl font-black md:text-2xl'>No Entrance Fees</h2>
      </div>
    );
  }

  return (
    <div id='fees' className='w-full'>
      <div className='col-span-2 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-8'>
        {entranceFees.map((fee: Fee, i) => (
          <FeeItem
            key={fee.title + i}
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
  const subtitle = title.slice(0, title.indexOf('-'));
  title = title.slice(title.indexOf('-') + 1, title.length);

  return (
    <div className='border-secondary relative w-full rounded-lg border-2 p-4'>
      <div className='flex items-center justify-between gap-2'>
        <p className='text-sm'>{subtitle}</p>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Info />
            </TooltipTrigger>
            <TooltipContent className='border'>
              <p className='max-w-xs text-sm'>{description}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <div className='flex gap-2'>
        <h3 className='text-base font-black md:text-xl'>
          ${cost} / {title}
        </h3>
        {/* <p className='font'>${cost}</p> */}
      </div>
    </div>
  );
};
