// Create a react leaflet that renders a US Map centered on the state
import { MapContainer, TileLayer, GeoJSON, useMap, Marker, Popup } from "react-leaflet"
import { USMapCords } from '../../data/USMap';
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

const LeafletEvents = ({state}) => {
    const map = useMap();
    const geoJsonLayer = useRef(null);
    const ftState = USMapCords.features.filter(stateCoords => stateCoords.properties.name === state.name)[0];
    
    useEffect(() => {
        const stateFeature = USMapCords.features.filter(stateCoords => stateCoords.properties.name === state.name)[0];
        
        if (geoJsonLayer.current) {
            // Clear the current layer and add the new data
            geoJsonLayer.current.clearLayers().addData(stateFeature);
            // Set Initial Bounds
            map.fitBounds(geoJsonLayer.current.getBounds())
        }
    }, [state])
    
    
    const onEachFeature = (feature, layer) => {
        layer.on({
            click: function(e) {
                map.fitBounds(e.target.getBounds());
            }
        });
    }
    
    return (<GeoJSON ref={geoJsonLayer} data={ftState} onEachFeature={onEachFeature} />)
}


export const LeafletMap = ({state, parkCoords}) => {
    const [map, setMap] = useState(null)

    
    const displayMap = useMemo(
        () => (
          <MapContainer
            style={{height: '400px', width: '100%'}} 
            center={[37.8, -96]} 
            zoom={4}
            ref={setMap}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <LeafletEvents state={state} />
            {parkCoords.map((park) => 
                    <Marker key={park.name} position={[park.latitude, park.longitude]}>
                        <Popup>{park.name}</Popup>
                    </Marker>
            )}
          </MapContainer>
        ),
        [parkCoords],
    )
    
    return (
        <>{displayMap}</>
    )
}