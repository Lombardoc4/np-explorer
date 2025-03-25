import { Breadcrumbs } from '@/components/Breadcrumbs';
import {
  useMatch,
  useNavigate,
  useParams,
  useSearchParams,
} from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { fetcher } from '@/utils/helper';
import { FullHeightLoader } from '@/components/Loader';
import ErrorPage from '../Error';
import { CategoryCard } from '../Park/Sections/Activities';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import MapContainer from '@/components/mapContainer';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

const amenityFilters = [
  'Information',
  'Restroom',
  'Parking',
  'Food/Drink',
  'Trailhead',
];

const pathMap = {
  'visitor-center': 'visitorcenter',
  campsite: 'camping',
  parking: 'parking',
  sign: 'other',
};

export const Places = () => {
  const { parkId, placeId } = useParams();
  const match = useMatch('/:parkId/places/:placeId/:subPage');
  const subPage = match?.params.subPage;
  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get('category') || 'all';
  const amenities = searchParams.get('amenities');
  const navigation = useNavigate();

  const {
    status: visitorCenterStatus,
    error: visitorCenterError,
    data: visitorCenters,
  } = useQuery<IVisitorCenter[]>({
    queryKey: ['park', { catergory: 'visitorcenters', parkCode: parkId }],
    queryFn: async () => await fetcher(`visitorcenters?parkCode=${parkId}`),
  });

  const {
    status: campgroundStatus,
    error: campgroundError,
    data: campgrounds,
  } = useQuery<ICampground[]>({
    queryKey: ['park', { catergory: 'campgrounds', parkCode: parkId }],
    queryFn: async () => await fetcher(`campgrounds?parkCode=${parkId}`),
  });

  const {
    status: parkingStatus,
    error: parkingError,
    data: parkingLots,
  } = useQuery<IParking[]>({
    queryKey: ['park', { catergory: 'parkinglots', parkCode: parkId }],
    queryFn: async () => await fetcher(`parkinglots?parkCode=${parkId}`),
  });

  const {
    status: otherStatus,
    error: otherError,
    data: others,
  } = useQuery<IPlaces[]>({
    queryKey: ['park', { catergory: 'places', parkCode: parkId }],
    queryFn: async () =>
      await fetcher(
        `places?q=${encodeURIComponent('isOpenToPublic=1')}&parkCode=${parkId}`,
      ),
  });

  if (
    visitorCenterStatus === 'pending' ||
    campgroundStatus === 'pending' ||
    parkingStatus === 'pending' ||
    otherStatus === 'pending'
  ) {
    return <FullHeightLoader />;
  }
  if (visitorCenterError && campgroundError && parkingError && otherError) {
    return (
      <ErrorPage
        error={
          visitorCenterError || campgroundError || parkingError || otherError
        }
      />
    );
  }

  const handleChangeCategory = (val: string) => {
    setSearchParams((prev) => {
      prev.set('category', val);
      return prev;
    });
  };

  const handleChangeAmenity = (key: string, val: boolean | 'indeterminate') => {
    setSearchParams((prev) => {
      const amenities =
        prev
          .get('amenities')
          ?.split(',')
          .filter((v) => !!v) || [];

      // Remove the amenity if it exists or if val is false
      if (amenities.includes(key) && [false, 'indeterminate'].includes(val)) {
        const index = amenities.indexOf(key);
        amenities.splice(index, 1);
      }
      // Add the amenity if it does not exist and val is true
      else if (!amenities.includes(key) && val) {
        amenities.push(key);
      }

      if (amenities.length <= 0) {
        prev.delete('amenities');
        return prev;
      }
      prev.set('amenities', amenities.join(','));
      return prev;
    });
  };

  const categories = [
    {
      name: 'all',
      label: 'All',
      condition: true,
    },
    {
      name: 'visitor-center',
      label: 'Visitor Centers',
      condition: visitorCenters && visitorCenters.length > 0,
    },
    {
      name: 'campsite',
      label: 'Campgrounds',
      condition: campgrounds && campgrounds.length > 0,
    },
    {
      name: 'parking',
      label: 'Parking Lots',
      condition: parkingLots && parkingLots.length > 0,
    },
    {
      name: 'sign',
      label: 'Other',
      condition: others && others.length > 0,
    },
  ];

  const allPlaces = [
    ...(visitorCenters?.map((item) => ({
      ...item,
      type: 'visitor-center',
    })) || []),
    ...(campgrounds?.map((item) => ({ ...item, type: 'campsite' })) || []),
    ...(parkingLots?.map((item) => ({ ...item, type: 'parking' })) || []),
    ...(others?.map((item) => ({ ...item, type: 'sign' })) || []),
  ];

  const filteredPlaces = allPlaces?.filter((place) => {
    // Check category
    if (category !== 'all' && place.type !== category) return false;

    // No amenities no need to filter
    if (!amenities) return true;

    // Check amenities
    if ('amenities' in place) {
      const activeAmenities = amenities.split(',');
      // Check if all active amenities are in the place
      return activeAmenities.every(
        (amenity) =>
          // Some amenities include the amenity as part of the string
          // e.g. "Information - Maps Available"
          Array.isArray(place.amenities) &&
          place.amenities.some((placeAmenity) => {
            return placeAmenity.includes(amenity);
          }),
      );
    }
  });

  return (
    <div className='container mx-auto py-24'>
      <Breadcrumbs crumbs={[parkId as string, 'places']} />
      <main>
        {subPage && ['parking', 'other'].includes(subPage) && (
          <>
            {subPage === 'parking' && (
              <Dialog
                open={true}
                onOpenChange={(val) =>
                  !val && navigation('/' + parkId + '/places?category=parking')
                }
              >
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>
                      {parkingLots?.find((lot) => lot.id === placeId)?.name ||
                        'Unknown Parking Lot'}
                    </DialogTitle>
                    <DialogDescription>
                      {
                        parkingLots?.find((lot) => lot.id === placeId)
                          ?.description
                      }
                    </DialogDescription>
                    <DialogDescription>
                      {
                        parkingLots?.find((lot) => lot.id === placeId)
                          ?.accessibility.adaFacilitiesDescription
                      }
                      <br />
                      Accessible to disabled:{' '}
                      {
                        parkingLots?.find((lot) => lot.id === placeId)
                          ?.accessibility.isLotAccessibleToDisabled
                      }
                      <br />
                      Total spaces:{' '}
                      {
                        parkingLots?.find((lot) => lot.id === placeId)
                          ?.accessibility.totalSpaces
                      }
                      <br />
                      Total ADA spaces:{' '}
                      {
                        parkingLots?.find((lot) => lot.id === placeId)
                          ?.accessibility.numberofAdaSpaces
                      }
                      <br />
                      Total ADA Step-free spaces:{' '}
                      {
                        parkingLots?.find((lot) => lot.id === placeId)
                          ?.accessibility.numberofAdaStepFreeSpaces
                      }
                      <br />
                      Total ADA van spaces:{' '}
                      {
                        parkingLots?.find((lot) => lot.id === placeId)
                          ?.accessibility.numberOfOversizeVehicleSpaces
                      }
                      <br />
                      Total oversize vehicle spaces:{' '}
                      {
                        parkingLots?.find((lot) => lot.id === placeId)
                          ?.accessibility.numberofAdaVanAccessbileSpaces
                      }
                    </DialogDescription>
                    <DialogDescription>
                      {parkingLots
                        ?.find((lot) => lot.id === placeId)
                        ?.operatingHours.map((hour) => (
                          <span>{hour.description}</span>
                        ))}
                    </DialogDescription>
                    <DialogDescription className='flex flex-col gap-2'>
                      {parkingLots
                        ?.find((lot) => lot.id === placeId)
                        ?.fees.map((fee) => (
                          <div className='flex-col gap-1'>
                            <span className='font-black'>${fee.cost}</span>
                            <span className='block'>{fee.description}</span>
                          </div>
                        ))}
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            )}
            {subPage === 'other' && (
              <Dialog
                open={true}
                onOpenChange={(val) =>
                  !val && navigation('/' + parkId + '/places?category=other')
                }
              >
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>
                      {others?.find((place) => place.id === placeId)?.title ||
                        'Unknown'}
                    </DialogTitle>
                    <DialogDescription>
                      {
                        others?.find((place) => place.id === placeId)
                          ?.listingDescription
                      }
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            )}
          </>
        )}
        {/* Filters */}
        <div className='mb-4 rounded border p-4'>
          <div className='flex gap-4'>
            <RadioGroup
              defaultValue={category}
              onValueChange={handleChangeCategory}
            >
              <p>Catergories</p>
              {categories.map(
                (cat) =>
                  cat.condition && (
                    <div className='items center flex items-center space-x-2'>
                      <RadioGroupItem value={cat.name} id={cat.name} />
                      <Label htmlFor={cat.name}>{cat.label}</Label>
                    </div>
                  ),
              )}
            </RadioGroup>
            <div className='grid gap-3'>
              <p>Amenities</p>
              {amenityFilters.map((amenity) => (
                <div className='items center flex space-x-2'>
                  <Checkbox
                    defaultChecked={amenities?.split(',').includes(amenity)}
                    key={amenity}
                    id={amenity}
                    name={amenity}
                    onCheckedChange={(val) => handleChangeAmenity(amenity, val)}
                  />
                  <Label htmlFor={amenity}>{amenity}</Label>
                </div>
              ))}
            </div>
          </div>
        </div>

        <Tabs defaultValue='map'>
          <div className='flex items-center justify-between'>
            <TabsList>
              <TabsTrigger value={'map'}>Map</TabsTrigger>
              <TabsTrigger value={'grid'}>Grid</TabsTrigger>
              <TabsTrigger value={'list'}>List</TabsTrigger>
            </TabsList>
            <p>{filteredPlaces.length} items</p>
          </div>
          <TabsContent value={'map'}>
            <MapContainer
              lnglat={[
                Number(allPlaces[0].longitude),
                Number(allPlaces[0].latitude),
              ]}
              locations={filteredPlaces}
            />
          </TabsContent>
          <TabsContent value={'grid'}>
            <div className='grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-4'>
              {filteredPlaces.map((place) => (
                <CategoryCard
                  data={place}
                  key={place.id}
                  name={pathMap[place.type as keyof typeof pathMap]}
                />
              ))}
            </div>
          </TabsContent>
          <TabsContent value={'list'}>
            {filteredPlaces.map((place) => (
              <div
                className='mb-4 grid gap-2 rounded border p-4'
                key={place.id}
              >
                <p className='text-xs'>{place.type}</p>
                <h2 className='text-xl font-bold'>
                  {'name' in place ? place.name : place.title}
                </h2>
                {'description' in place && <p>{place.description}</p>}
                {'directionsInfo' in place && <p>{place.directionsInfo}</p>}
              </div>
            ))}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};
