import { Link } from 'react-router';

export const ParkTitle = ({ fullName, states }: IPark) => {
  return (
    <>
      <div className='flex flex-1 flex-col gap-1 md:flex-row md:text-xl'>
        {StateLinks(states)}
      </div>
      <h1 className='text-2xl font-thin md:text-6xl'>{fullName}</h1>
    </>
  );
};

const StateLinks = (states: IPark['states']) =>
  states.split(',').map((state) => (
    <Link
      className='hover:underline'
      key={state}
      to={'/' + state.toLowerCase()}
    >
      {state}
    </Link>
  ));
