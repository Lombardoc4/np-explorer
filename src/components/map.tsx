'use client';

import { useEffect, useRef } from 'react';
import mapboxgl, { LngLatLike } from 'mapbox-gl';

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_API_KEY as string;

const Map = ({
  mapStyle,
  onLocationSelect,
  latLong,
  locations,
  filters,
}: {
  mapStyle: string;
  onLocationSelect: (location: any) => void;
  latLong: LngLatLike;
  locations: any[];
  filters: Record<string, boolean>;
}) => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);

  //   console.log('locations', locations)
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapRef.current) {
      mapRef.current = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: mapStyle,
        center: latLong,
        zoom: 10,
        minZoom: 8,
      });
    } else {
      mapRef.current.setStyle(mapStyle);
    }

    // Clear existing markers
    const markers: mapboxgl.Marker[] = [];

    locations.forEach((location) => {
      if (!filters[location.type]) return; // Skip hidden types

      const iconUrl = `https://raw.githubusercontent.com/nationalparkservice/symbol-library/gh-pages/src/standalone/${location.type}-black-22.svg`;

      const markerEl = document.createElement('div');
      markerEl.innerHTML = `<div class="bg-white rounded-full p-1"><img src="${iconUrl}" class="w-4 h-4" /></div>`;

      const marker = new mapboxgl.Marker(markerEl)
        .setLngLat([location.longitude, location.latitude])
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
          .setLngLat([location.longitude, location.latitude])
          .setHTML(
            `<p class="font-semibold text-gray-900">${location.name}</p>`,
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
  }, [mapStyle, filters, onLocationSelect]); // Re-run when `mapStyle` changes

  return (
    <div ref={mapContainerRef} className='h-[300px] w-full lg:h-[500px]' />
  );
};

export default Map;
