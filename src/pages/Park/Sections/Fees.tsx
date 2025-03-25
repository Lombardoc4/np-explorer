import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import clsx from 'clsx';

export const FeeSection = ({
  entranceFees,
  entrancePasses,
}: {
  entranceFees: Fee[];
  entrancePasses?: Fee[];
}) => {
  // If no entrance fees or passes return no element
  if (
    (!entranceFees && !entrancePasses) ||
    (entrancePasses && entrancePasses.length <= 0 && entranceFees.length <= 0)
  )
    return null;

  const count = entranceFees?.length + (entrancePasses?.length || 0);

  return (
    <div id='fees' className='w-full'>
      <div
        className={clsx(
          'grid grid-cols-2 gap-4 md:gap-4',
          count > 2 ? 'lg:grid-cols-4' : 'lg:grid-cols-2',
        )}
      >
        {entrancePasses?.map((pass: Fee) => (
          <FeeItem
            key={'entrancePass_' + pass.title}
            entrancePass
            cost={pass.cost}
            title={pass.title}
            description={pass.description}
          />
        ))}
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
  entrancePass,
}: {
  cost: string;
  title: string;
  description: string;
  entrancePass?: boolean;
}) => {
  const shortTitle = title.slice(title.indexOf('-') + 1, title.length);
  const subtitle = title.includes('-')
    ? title.slice(0, title.indexOf('-'))
    : null;

  return (
    <div
      className={clsx(
        'rounded-lg border-2 py-3',
        entrancePass ? 'border-accent' : 'border-secondary',
      )}
    >
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger className='flex w-full flex-col justify-center'>
            <p className='text-3xl font-black'>${cost}</p>

            <p className='text-xl'>{shortTitle}</p>
            {subtitle && <p className='text-xs leading-3'>{subtitle}</p>}
          </TooltipTrigger>
          <TooltipContent
            collisionPadding={16}
            sideOffset={5}
            className='bg-background border'
          >
            <p className='max-w-3xs text-sm'>{description}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};
