import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import { styled } from 'styled-components';

import { StyledCard } from '../styled/StyledCard';

import useOnScreen from '../../utils/hooks/useOnScreen';
import { InputProps } from '../../pages/Park/components/Card';

interface ParkCardFiltersProps {
  otherParks: any;
  toggleFilter: (arg0: InputProps) => void;
}

const noParks = [{ value: '', title: 'No Parks Found' }];

const costFilters = [
  { value: 'free', title: 'Free' },
  { value: 'paid', title: 'Paid' },
];

// Sort Activites by most common
const sortActivities = (activeParks: IPark[]) => {
  // Get Park Activity names and count
  // Reduce activity duplicates and keep count
  // !ouch
  const activities = activeParks.reduce((acc: any, park: any) => {
    // Loop 1
    park.activities.forEach((activity: { name: string }) => {
      // Loop 2

      const existingItem = acc.find(
        (obj: { name: string }) => obj.name === activity.name,
      ); // Loop 3

      if (existingItem) {
        existingItem.count += 1;
      } else {
        acc.push({ name: activity.name, count: 1 });
      }
    });
    return acc;
  }, []);

  // Return sorted array of activities by name
  return activities.sort((a: any, b: any) => {
    // Loop 4 Ouchie
    // const nameA = a.name.toUpperCase(); // ignore upper and lowercase
    // const nameB = b.name.toUpperCase(); // ignore upper and lowercase
    const nameA = a.name.toUpperCase(); // ignore upper and lowercase
    const nameB = b.name.toUpperCase(); // ignore upper and lowercase
    if (nameA < nameB) return -1;

    if (nameA > nameB) return 1;
  });
};

export const ParkCardFilters = ({
  otherParks,
  toggleFilter,
}: ParkCardFiltersProps) => {
  const navigate = useNavigate();
  const [showFilters, setShowFilters] = useState(false);
  const filterRef = useRef(null);
  const onScreen = useOnScreen(filterRef, 10);

  // Sort Park Activities by with the most common first
  const activities = sortActivities(otherParks);

  useEffect(() => {
    if (!onScreen) setShowFilters(false);
  }, [onScreen]);

  const handleInput = (e: React.MouseEvent) => {
    const { name, value } = e.target as HTMLInputElement;
    if (
      name === 'entranceFees' ||
      name === 'entrancePasses' ||
      name === 'activities'
    ) {
      //typescript 🫡
      toggleFilter({ name: name, value: value });
    }
  };

  return (
    <div className='sticky z-20 mb-4 grid items-center bg-white px-4'>
      <div className='container mx-auto bg-white'>
        <div className='flex h-[50px] items-end justify-center'>
          <button
            style={{ marginRight: 'auto' }}
            onClick={() => {
              setShowFilters(!showFilters);
            }}
          >
            <div className='img-container'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='16'
                height='16'
                fill='currentColor'
                className='bi bi-sliders'
                viewBox='0 0 16 16'
              >
                <path
                  fillRule='evenodd'
                  d='M11.5 2a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM9.05 3a2.5 2.5 0 0 1 4.9 0H16v1h-2.05a2.5 2.5 0 0 1-4.9 0H0V3h9.05zM4.5 7a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM2.05 8a2.5 2.5 0 0 1 4.9 0H16v1H6.95a2.5 2.5 0 0 1-4.9 0H0V8h2.05zm9.45 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm-2.45 1a2.5 2.5 0 0 1 4.9 0H16v1h-2.05a2.5 2.5 0 0 1-4.9 0H0v-1h9.05z'
                />
              </svg>
            </div>
          </button>

          <h3>{otherParks.length} Parks</h3>
        </div>

        {/* <Dropdown
          style={{ top: '1rem' }}
          placeholder={`Find a park`}
          options={dropdownOptions}
          onSelect={(option) => handleParkSelect(option)}
        /> */}
      </div>

      <div
        ref={filterRef}
        className='border-b-lg absolute top-full p-4'
        style={{
          opacity: showFilters ? 1 : 0,
          pointerEvents: showFilters ? 'all' : 'none',
        }}
      >
        <div className='grid items-start gap-2'>
          <h3>Cost</h3>
          <h4>Fees:</h4>

          <div className='checkbox'>
            <input
              onClick={handleInput}
              type='radio'
              id='all'
              name='entranceFees'
              value=''
            />
            <label htmlFor='all'>All</label>
          </div>
          <div className='checkbox'>
            <input
              onClick={handleInput}
              type='radio'
              id='free'
              name='entranceFees'
              value='free'
            />
            <label htmlFor='free'>Free</label>
          </div>
          <div className='checkbox'>
            <input
              onClick={handleInput}
              type='radio'
              id='paid'
              name='entranceFees'
              value='paid'
            />
            <label htmlFor='paid'>Paid</label>
          </div>

          <h4>Annual Pass:</h4>
          <div className='checkbox'>
            <input
              onClick={handleInput}
              type='checkbox'
              id='annual-pass'
              name='entrancePasses'
              value='annual-pass'
            />
            <label htmlFor='annual-pass'>Annual Pass</label>
          </div>
        </div>

        <div className='grid items-start gap-2'>
          {' '}
          <h3>Activities</h3>
          {activities.map(
            ({ name, count }: { name: string; count: number }) => (
              <div key={name} className='checkbox'>
                <input
                  onClick={handleInput}
                  type='checkbox'
                  id={name}
                  name='activities'
                  value={name}
                />
                <label htmlFor={name}>
                  {name} ({count})
                </label>
              </div>
            ),
          )}
        </div>
      </div>
    </div>
  );
};

const FilterCard = styled(StyledCard)`
  position: absolute;
  top: 100%;
  border-radius: 0 0 1em 1em;
  /* border-bottom: 2px solid ${({ theme }) => theme.colors.gray}; */
  align-items: normal;
  padding: 1em;
`;

const FilterCell = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  align-items: flex-start;
  gap: 0.5em;

  &:not(:last-child) {
    margin-bottom: 0.5em;
    padding-bottom: 0.5em;
    border-bottom: 1px solid #000;
  }
  h3,
  h4 {
    grid-column: 1 / -1;
  }

  .checkbox {
    display: flex;
    gap: 0.5em;
  }
`;
