export const Footer = () => {
  return (
    <footer className='bg-background py-6 pb-20 sm:pb-6'>
      <div className='container mx-auto grid gap-4 px-4 sm:grid-cols-2 sm:gap-8'>
        <div className='flex gap-2'>
          <img
            src='https://avatars.githubusercontent.com/u/36197748?v=4'
            height={24}
            width={24}
          />
          <p>
            Built by{' '}
            <a
              className='underline'
              href='https://github.com/Lombardoc4'
              target='_blank'
            >
              Cris Lombardo
            </a>{' '}
            -{' '}
            <a
              className='underline'
              href='https://github.com/Lombardoc4/np-explorer'
              target='_blank'
            >
              Code
            </a>
          </p>
        </div>
        <p className='text-sm'>
          Special thanks to{' '}
          <a className='underline' href='https://nps.gov' target='_blank'>
            National Parks Service
          </a>{' '}
          <a
            className='underline'
            href='https://www.weather.gov/'
            target='_blank'
          >
            National Weather Service
          </a>{' '}
          <a
            className='underline'
            href='https://github.com/erikflowers'
            target='_blank'
          >
            Eric Flowers
          </a>
        </p>
      </div>
    </footer>
  );
};
