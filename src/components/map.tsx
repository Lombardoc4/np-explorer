'use client';

import { useEffect, useRef } from 'react';
import mapboxgl, { LngLatLike } from 'mapbox-gl';
import { MapLocation } from './mapContainer';

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_API_KEY as string;

const Map = ({
  mapStyle,
  onLocationSelect,
  selectedLocation,
  lnglat,
  locations,
  filters,
  zoom,
}: {
  mapStyle: string;
  onLocationSelect: (location: MapLocation | null) => void;
  selectedLocation?: MapLocation | null;
  lnglat: LngLatLike;
  locations: MapLocation[];
  filters?: Record<string, boolean>;
  zoom?: number;
}) => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapRef.current) {
      mapRef.current = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: mapStyle,
        center: lnglat,
        zoom: zoom || 10,
      });
    } else {
      mapRef.current.setStyle(mapStyle);
    }

    // Clear existing markers
    const markers: mapboxgl.Marker[] = [];

    locations.reverse().forEach((location) => {
      if (filters && location.type && !filters[location.type]) return; // Skip hidden types
      const imgKey = location.type || 'visitor-center';

      const iconUrl = `https://raw.githubusercontent.com/nationalparkservice/symbol-library/gh-pages/src/standalone/${imgKey}-black-22.svg`;

      // Check if this is the selected location
      const isSelected =
        selectedLocation && selectedLocation.id === location.id;

      const markerEl = document.createElement('div');
      if (isSelected) {
        markerEl.classList.add('relative', 'z-50');
      }
      markerEl.innerHTML = `
        <div class="rounded-full p-1 transition ${
          isSelected ? 'bg-black' : 'bg-white'
        }">
          <img src="${iconUrl}" class="w-4 h-4 ${
            isSelected ? 'brightness-0 invert' : ''
          }" />
        </div>
      `;

      const marker = new mapboxgl.Marker(markerEl)
        .setLngLat([Number(location.longitude), Number(location.latitude)])
        .addTo(mapRef.current!);

      markers.push(marker);

      // Tooltip
      const popup = new mapboxgl.Popup({
        closeButton: false,
        offset: 10,
        className: 'mapboxgl-popup',
      });

      markerEl.addEventListener('mouseenter', () => {
        popup
          .setLngLat([Number(location.longitude), Number(location.latitude)])
          .setHTML(
            `<p class="font-semibold text-gray-900">${'name' in location ? location.name : location.title}</p>`,
          )
          .addTo(mapRef.current!);
      });

      markerEl.addEventListener('click', () => {
        onLocationSelect(location);
      });

      markerEl.addEventListener('mouseleave', () => {
        popup.remove();
      });
    });

    return () => {
      markers.forEach((marker) => marker.remove()); // Remove markers on filter change
    };
  }, [
    mapStyle,
    filters,
    onLocationSelect,
    selectedLocation,
    locations,
    lnglat,
    zoom,
  ]); // Re-run when `selectedLocation` changes

  useEffect(() => {
    if (selectedLocation && mapRef.current) {
      mapRef.current.flyTo({
        center: [
          Number(selectedLocation.longitude),
          Number(selectedLocation.latitude),
        ],
        zoom: 16,
        essential: true,
      });
    }
  }, [selectedLocation]);

  // useEffect(() => {
  //   if (mapRef.current) {
  //     console.log('resete zoom')
  //     mapRef.current.flyTo({
  //       center: lnglat,
  //       zoom: 6,
  //       essential: true,
  //     });
  //   }
  // }, [lnglat]);

  return (
    <div ref={mapContainerRef} className='h-[300px] w-full lg:h-[500px]' />
  );
};

export default Map;
