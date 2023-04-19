// Create a react leaflet that renders a US Map centered on the state
import { MapContainer, TileLayer, GeoJSON, useMap, Marker, Popup, LayersControl } from "react-leaflet"
import { USMapCords } from '../../data/USMap';
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

const LeafletEvents = ({state}) => {
    const map = useMap();
    const geoJsonLayer = useRef(null);
    const ftState = USMapCords.features.filter(stateCoords => stateCoords.properties.name === state.name)[0];
    
    const resetBounds = () => {map.fitBounds(geoJsonLayer.current.getBounds())}
    useEffect(() => {
        const stateFeature = USMapCords.features.filter(stateCoords => stateCoords.properties.name === state.name)[0];
        
        if (geoJsonLayer.current) {
            // Clear the current layer and add the new data
            geoJsonLayer.current.clearLayers().addData(stateFeature);
            // Set Initial Bounds
            resetBounds();
        }
    }, [state])
    
    const onEachFeature = (feature, layer) => {
        layer.on({
            // click: function(e) {
            //     map.fitBounds(e.target.getBounds());
            // },
            // dblclick: function() {
            //     map.zoomIn();
            // }
        });
    }
    
    return (
    <>
        <GeoJSON ref={geoJsonLayer} data={ftState} onEachFeature={onEachFeature} />
        <div className='leaflet-bottom leaflet-left'>
            <div className="leaflet-control leaflet-bar" onClick={resetBounds}>
                <a style={{padding: '0 1em', width: 'auto'}} href="#" aria-label="Reset">Reset Focus</a>
            </div>
        </div>
    </>
        )
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
                attribution='Map data ©2023 Google'
                url="http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}"
                subdomains={['mt0','mt1','mt2','mt3']}
            />
            
            <LeafletEvents state={state} />
            {parkCoords.map((park) => 
                    <Marker key={park.name} position={[park.latitude, park.longitude]}>
                        <Popup>
                            {park.name}
                            {/* List Activites */}
                        </Popup>
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