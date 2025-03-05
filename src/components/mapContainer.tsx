'use client';

import { useState } from 'react';
import Map from './map';
import { LngLatLike } from 'mapbox-gl';
import { Button } from './ui/button';
import { Link } from 'react-router';
import { X } from 'lucide-react';

const linkCategories = {
  'visitor-center': 'visitor-centers',
  campsite: 'camping',
  parking: 'parking',
};

const MapContainer = (props: { latLong: LngLatLike; locations: any[] }) => {
  const [selectedLocation, setSelectedLocation] = useState<any>(null);
  const [mapStyle, setMapStyle] = useState(
    'mapbox://styles/mapbox/outdoors-v12',
  );

  // Filter state (true = visible, false = hidden)
  const [filters, setFilters] = useState({
    'visitor-center': true,
    campsite: true,
    parking: true,
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
    <div className='border-accent mx-4 overflow-hidden rounded-lg border-2 lg:grid lg:grid-cols-4'>
      {/* Map (3 columns) */}
      <div className='relative lg:col-span-3'>
        <Map
          mapStyle={mapStyle}
          onLocationSelect={setSelectedLocation}
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
      <div className='bg-primary border-accent col-span-1 max-h-[500px] overflow-scroll border-t-2 p-4 lg:border-t-0 lg:border-l-2'>
        {selectedLocation ? (
          <div>
            <div className='flex items-center justify-between gap-2'>
              <h2 className='text-lg font-bold'>{selectedLocation.name}</h2>
              <Button onClick={() => setSelectedLocation(null)}>
                <X />
              </Button>
            </div>
            <div className='bg-accent my-1 h-0.5 rounded-full' />
            <p className='line-clamp-[12]'>{selectedLocation.description}</p>
            <Button variant={'outline'} className='mt-4' asChild>
              <Link
                to={`./${linkCategories[selectedLocation.type as keyof typeof linkCategories]}/${selectedLocation.id}`}
              >
                Learn more
              </Link>
            </Button>
          </div>
        ) : (
          props.locations.map((location) => (
            <div
              onClick={() => setSelectedLocation(location)}
              className='bg-muted border-accent my-2 flex items-center gap-2 rounded border p-2'
            >
              <div className='flex min-h-6 min-w-6 items-center justify-center rounded-full bg-white p-1'>
                <img
                  src={`https://raw.githubusercontent.com/nationalparkservice/symbol-library/gh-pages/src/standalone/${location.type}-black-22.svg`}
                  className='h-4 w-4'
                />
              </div>
              <p>{location.name}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MapContainer;
