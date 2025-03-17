'use client';

import { useState } from 'react';
import Map from './map';
import { LngLatLike } from 'mapbox-gl';
import { Button } from './ui/button';
import { Link } from 'react-router';
import { X } from 'lucide-react';

const linkCategories = {
  'visitor-center': 'visitorcenter',
  campsite: 'camping',
  parking: 'parking',
};

const MapContainer = (props: { lnglat: LngLatLike; locations: any[] }) => {
  const [selectedLocation, setSelectedLocation] = useState<any>(null);
  const [mapStyle, setMapStyle] = useState(
    'mapbox://styles/mapbox/outdoors-v12',
  );

  // Filter state (true = visible, false = hidden)
  const [filters, setFilters] = useState({
    'visitor-center': true,
    campsite: true,
    parking: true,
    sign: true,
  });

  const toggleMapStyle = () => {
    setMapStyle((prev) =>
      prev === 'mapbox://styles/mapbox/outdoors-v12'
        ? 'mapbox://styles/mapbox/satellite-streets-v12'
        : 'mapbox://styles/mapbox/outdoors-v12',
    );
  };

  // Toggle specific filter
  const toggleFilter = (type: keyof typeof filters) => {
    setFilters((prev) => ({ ...prev, [type]: !prev[type] }));
  };

  return (
    <div
      id='places'
      className='bg-primary overflow-hidden rounded-xl border-4 lg:grid lg:grid-cols-4'
    >
      {/* Map (3 columns) */}

      <div className='relative m-4 overflow-hidden rounded-lg border-2 shadow-lg lg:col-span-3'>
        <Map
          mapStyle={mapStyle}
          onLocationSelect={setSelectedLocation}
          selectedLocation={selectedLocation}
          filters={filters}
          {...props}
        />

        {/* Layer Toggle Button */}
        <button
          onClick={toggleMapStyle}
          className='absolute top-3 right-3 rounded-md border border-gray-300 bg-white px-3 py-1.5 text-xs text-gray-900 shadow-md hover:bg-gray-100'
        >
          {mapStyle.includes('satellite')
            ? 'Switch to Streets'
            : 'Switch to Satellite'}
        </button>

        {/* Filter Buttons */}
        <div className='absolute top-3 left-3 flex flex-col gap-2 rounded-lg border border-gray-300 bg-white p-1.5 shadow-md'>
          {Object.keys(filters).map((type) => (
            <button
              key={type}
              onClick={() => toggleFilter(type as keyof typeof filters)}
              className={`rounded-md border px-3 py-1.5 text-sm ${
                filters[type as keyof typeof filters]
                  ? 'bg-accent text-white'
                  : 'bg-primary text-gray-600'
              }`}
            >
              <img
                src={`https://raw.githubusercontent.com/nationalparkservice/symbol-library/gh-pages/src/standalone/${type}-black-22.svg`}
                className='h-4 w-4 lg:h-6 lg:w-6'
              />
            </button>
          ))}
        </div>
      </div>

      {/* Description Panel (1 column) */}
      <div className='inset-shadow col-span-1 max-h-[536px] overflow-scroll p-4'>
        {selectedLocation ? (
          <div>
            <div className='flex items-center justify-between gap-2'>
              <h2 className='text-lg font-bold'>
                {selectedLocation.name || selectedLocation.title}
              </h2>
              <X onClick={() => setSelectedLocation(null)} />
            </div>
            <div className='bg-accent my-1 h-0.5 rounded-full' />
            <p className='line-clamp-[12]'>
              {selectedLocation.description ||
                selectedLocation.listingDescription}
            </p>
            <Button variant={'outline'} className='mt-4' asChild>
              <Link
                to={`./places/${selectedLocation.id}/${linkCategories[selectedLocation.type as keyof typeof linkCategories]}`}
              >
                Learn more
              </Link>
            </Button>
          </div>
        ) : (
          props.locations.map(
            (location) =>
              filters &&
              filters[location.type as keyof typeof filters] && (
                <div
                  onClick={() => setSelectedLocation(location)}
                  className='bg-accent border-foreground my-2 flex items-center gap-2 rounded border p-2 text-black'
                >
                  <div className='flex min-h-6 min-w-6 items-center justify-center rounded-full bg-white p-1'>
                    <img
                      src={`https://raw.githubusercontent.com/nationalparkservice/symbol-library/gh-pages/src/standalone/${location.type}-black-22.svg`}
                      className='h-4 w-4'
                    />
                  </div>
                  <p>{location.name || location.title}</p>
                </div>
              ),
          )
        )}
      </div>
    </div>
  );
};

export default MapContainer;
