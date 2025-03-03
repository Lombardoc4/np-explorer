export const Footer = () => {
  return (
    <footer className='bg-black py-8 text-white'>
      <div className='container mx-auto text-center'>
        <p>
          This site was built by{' '}
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
          </a>{' '}
        </p>
        <p className='text-sm'>Special thanks to</p>
        <ul className='text-sm'>
          <li>
            <a className='underline' href='https://nps.gov' target='_blank'>
              National Parks Service
            </a>
          </li>
          <li>
            <a
              className='underline'
              href='https://www.weather.gov/'
              target='_blank'
            >
              National Weather Service
            </a>
          </li>
          {/* <a href="https://github.com/erikflowers" target="_blank">Eric Flowers</a> */}
        </ul>
      </div>
    </footer>
  );
};
