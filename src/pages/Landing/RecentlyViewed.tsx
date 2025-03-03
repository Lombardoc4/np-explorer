import { useQuery } from '@tanstack/react-query';
import { ParkCards } from '../Park/components/Card';

// ! Bug !
// Currently cannot fetch parks based on multiple parkCodes
// You would need to make a fetch call for each recent park
// Issues:
// 1. Waste api calls
// 2. Waste other resources

export const RecentlyViewed = () => {
  const lsParks = JSON.parse(
    localStorage.getItem('npe-recently-viewed') || '[]',
  ) as ParkLocalStorage[];
  const recentParkCodes = lsParks.map((p) => p.parkCode);

  // Migrate to recent parks api call
  const { isPending, isError, error, data } = useQuery({
    queryKey: ['parks', { parkCodes: recentParkCodes }],
    queryFn: async () => {
      const parkCodesString = recentParkCodes.join(',');
      console.log('parkCode', parkCodesString);
      const response = await fetch(
        `https://developer.nps.gov/api/v1/parks?parkCode=${parkCodesString}&limit=500&api_key=${import.meta.env.VITE_NPS_API_KEY}`,
      );
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      // TODO: Include related state data
      // const recentParksStates = recentParks.reduce((acc: StateProps[], p) => {
      //     stateMap.map((s) => {
      //         if (p.states.includes(s.id.toUpperCase()) )
      //             acc.push(s)
      //     })
      //     return acc;
      // }, [])

      return response.json();
    },
  });

  // Get associated states with the park

  if (data) {
    console.log('data', data);
  }

  return (
    <>
      /* Holding off on recent parks, api is not ideal for this */
      {/* recentParks.length > 0 && (
                <ParkCards parks={recentParks} title={"Recently Viewed Parks"} states={recentParksStates} />
            )} */}
    </>
  );
};
