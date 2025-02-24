import { Link } from 'react-router';

export const ParkTitle = ({ fullName, states }: IPark) => {
  return (
    <>
      <div>
        <h1 className='font-thin md:text-4xl'>{fullName}</h1>
        <div className='flex flex-col gap-1 text-xl md:flex-row'>
          {StateLinks(states)}
        </div>
      </div>
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
