import { Link } from 'react-router';

export const ParkTitle = ({ fullName, states }: IPark) => {
  return (
    <>
      <div className='container mx-auto my-4 flex max-w-5xl flex-col justify-between md:flex-row md:items-center'>
        <div>
          <h1 className='text-6xl font-thin md:text-6xl'>{fullName}</h1>
          <div className='flex flex-col gap-1 text-xl md:flex-row'>
            <span style={{ display: 'flex', gap: '0.25em' }}>
              {StateLinks(states)}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

const StateLinks = (states: IPark['states']) =>
  states.split(',').map((state) => (
    <Link key={state} to={'/' + state.toLowerCase()}>
      {state}
    </Link>
  ));
