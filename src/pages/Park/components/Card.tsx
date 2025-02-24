import { filterParks } from '../../../utils/helper';
import { useState } from 'react';
import { IMarker } from '../../../components/LeafletMap';
import { ParkCardFilters } from '../../../components/ParkCardFilters';
import { ParkCardGrid } from '../../../components/ParkCards';
import { StateProps } from '../../../utils/lib/stateMap';
import styled from 'styled-components';

export interface InputProps {
  name: 'entranceFees' | 'entrancePasses' | 'activities';
  value: string;
}

export interface FilterProps {
  entranceFees: string;
  entrancePasses: string;
  activities: string[];
}

const initFilters: FilterProps = {
  entranceFees: '',
  entrancePasses: '',
  activities: [],
};

interface StateParksProps {
  parks: IPark[] | IPark[];
  title?: string;
  states: StateProps[];
  others?: boolean;
}

export const ParkCards = ({ parks, title, states }: StateParksProps) => {
  // const park = useContext(ParkContext);
  const [filters, setFilters] = useState<FilterProps>(initFilters);
  const filteredParks = filterParks(filters, parks);

  // console.log('states', states)

  // Coords for map
  const parkCoords: IMarker[] = filteredParks
    .filter((p) => p.latitude && p.longitude)
    .map((p) => ({
      longitude: parseFloat(p.longitude),
      latitude: parseFloat(p.latitude),
      name: p.fullName,
      id: p.parkCode,
      // active: park ? park.id === p.id : true,
    }));

  console.log(parkCoords);

  const toggleFilter = (input: InputProps) => {
    const { name, value } = input;
    if (name === 'activities') {
      // if value already exists remove it otherwise add it
      const newActivities = filters.activities.find((a: string) => a === value)
        ? filters.activities.filter((a: string) => a !== value)
        : [...filters.activities, value];
      setFilters({ ...filters, activities: newActivities });
    } else {
      // update value
      const newFilters = { ...filters, [name]: value };
      setFilters(newFilters);
    }
  };

  return (
    <div className='my-8 grid items-start justify-center gap-1'>
      <div className='container'>
        {title && <h2 className='text-center text-4xl'>{title}</h2>}

        {/* Map with parks */}
        {/* <div className="relative overflow-hidden">
                    <LeafletMap states={states} parkCoords={parkCoords} />
                </div> */}
      </div>

      <div id='other-parks'>
        {/* TWO COMPONENTS BELOW MIGHT BE COMBINABLE  */}
        {
          <ParkCardFilters
            otherParks={filteredParks}
            toggleFilter={toggleFilter}
            // state={state}
          />
        }

        {/* <div className='container'>
                    {filteredParks.length > 0 ? (
                        <ParkCardGrid grid={true} parks={filteredParks} showDescription={false} />
                    ) : (
                        <h2>No parks match these filters</h2>
                    )}
                </div> */}
      </div>
    </div>
  );
};

const MainContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1em;
  /* grid-template-columns: 250px auto; */
  align-items: flex-start;
  margin: 2em auto;
  /* padding: 1em; */

  .title {
    font-size: 2.2em;
    text-align: center;
  }

  .filters {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 1rem;
    padding-block: 1rem;

    position: sticky;
    z-index: ${({ theme }) => theme.zIndex.dropdown};

    background-color: ${({ theme }) => theme.colors.white};
  }

  @media (min-width: 768px) {
    .filters {
      top: calc(70px);
    }
  }
`;

const MapBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;
export { ParkCardGrid };
