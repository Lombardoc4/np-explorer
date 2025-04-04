import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { stateMap, borderMap, otherMap } from '../../lib/stateMap';
import { Dropdown } from '../Dropdown';

export const Map = () => {
  const blankState = { name: '', id: '' };
  const [hoverState, setHoverState] = useState(blankState);
  const navigate = useNavigate();

  return (
    <>
      <div className='mb-8 grid items-center md:grid-cols-2'>
        <div className='relative mb-8 flex min-h-[50px] w-full justify-center md:order-2 md:mb-0'>
          <Dropdown type='state' />
        </div>
        <div>
          <h2 className='text-4xl font-thin uppercase italic md:text-6xl'>
            Where To?
          </h2>
          <h3
            className='uppercase underline md:text-4xl'
            onClick={() =>
              hoverState.name && navigate('/state/' + hoverState.id)
            }
          >
            {hoverState.name || 'Pick a state'}
          </h3>
        </div>
      </div>

      <svg
        className='mx-auto w-full max-w-[750px]'
        onMouseLeave={() => setHoverState(blankState)}
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 959 593'
      >
        <g>
          {stateMap.map((state) => (
            <Link key={state.id} to={'/' + state.id}>
              <path
                className='fill-green-700 hover:fill-green-900'
                onMouseEnter={() => setHoverState(state)}
                onTouchStart={() => setHoverState(state)}
                d={state.data}
              />
            </Link>
          ))}
        </g>

        {/* Border */}
        <g className='borders'>
          {borderMap.map((state) => (
            <path
              fill='none'
              stroke={'#FFFFFF'}
              strokeWidth={1}
              key={state.id}
              className={state.id}
              d={state.data}
            />
          ))}
        </g>

        {otherMap.map((state) => (
          <path
            className='cursor-pointer'
            fill='none'
            key={state.id}
            d={state.data}
          />
        ))}
      </svg>
    </>
  );
};
