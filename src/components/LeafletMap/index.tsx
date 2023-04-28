// Create a react leaflet that renders a US Map centered on the state
import { MapContainer, TileLayer, GeoJSON, useMap, Marker, Popup} from "react-leaflet"
import { USMapCords } from '../../data/USMap';
import { useEffect, useMemo, useRef, useState } from "react";
import { StateProps } from "../../data/stateMap";

import { GeoJSON as GeoJSONType } from "leaflet";

const LeafletEvents = ({state} : {state: StateProps}) => {
    const map = useMap();
    const ftState = USMapCords.features.filter(stateCoords => stateCoords.properties && stateCoords.properties.name === state.name)[0];
    
    // This line of code is creating a mutable reference object of type 
    // FeatureGroup using the useRef() hook, initializing it to null, and casting it to a 
    // specific type definition to ensure it always holds a value of type FeatureGroup.
    const geoJsonLayer = useRef< GeoJSONType >(null as unknown as GeoJSONType) as React.MutableRefObject<GeoJSONType>;
    
    const resetBounds = () => {map.fitBounds(geoJsonLayer.current && geoJsonLayer.current.getBounds())}
    useEffect(() => {
        const stateFeature = USMapCords.features.filter(stateCoords => stateCoords.properties && stateCoords.properties.name === state.name)[0];
        
        if (geoJsonLayer.current) {
            // Clear the current layer and add the new data
            geoJsonLayer.current.clearLayers().addData(stateFeature);
            // Set Initial Bounds
            resetBounds();
        }
    }, [state])
    
    // const onEachFeature = (feature, layer) => {
    //     layer.on({
    //         click: function(e) {
    //             map.fitBounds(e.target.getBounds());
    //         },
    //         dblclick: function() {
    //             map.zoomIn();
    //         }
    //     });
    // }
    
    return (
    <>
        <GeoJSON 
        ref={geoJsonLayer} 
        data={ftState} 
        // onEachFeature={onEachFeature} 
        />
        <h1>Test</h1>
        <div className='leaflet-bottom leaflet-left'>
            <div className="leaflet-control leaflet-bar" onClick={resetBounds}>
                <a style={{padding: '0 1em', width: 'auto', display: 'flex', alignItems: 'center'}} href="#" aria-label="Reset">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrows-fullscreen" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M5.828 10.172a.5.5 0 0 0-.707 0l-4.096 4.096V11.5a.5.5 0 0 0-1 0v3.975a.5.5 0 0 0 .5.5H4.5a.5.5 0 0 0 0-1H1.732l4.096-4.096a.5.5 0 0 0 0-.707zm4.344 0a.5.5 0 0 1 .707 0l4.096 4.096V11.5a.5.5 0 1 1 1 0v3.975a.5.5 0 0 1-.5.5H11.5a.5.5 0 0 1 0-1h2.768l-4.096-4.096a.5.5 0 0 1 0-.707zm0-4.344a.5.5 0 0 0 .707 0l4.096-4.096V4.5a.5.5 0 1 0 1 0V.525a.5.5 0 0 0-.5-.5H11.5a.5.5 0 0 0 0 1h2.768l-4.096 4.096a.5.5 0 0 0 0 .707zm-4.344 0a.5.5 0 0 1-.707 0L1.025 1.732V4.5a.5.5 0 0 1-1 0V.525a.5.5 0 0 1 .5-.5H4.5a.5.5 0 0 1 0 1H1.732l4.096 4.096a.5.5 0 0 1 0 .707z"/>
                </svg>
                </a>
            </div>
            <div className="leaflet-control leaflet-bar" onClick={resetBounds}>
                <a style={{padding: '0 1em', width: 'auto', display: 'flex', alignItems: 'center'}} href="#" aria-label="Reset">Reset Focus</a>
            </div>
        </div>
    </>
        )
}


interface CoordProps {
    longitude: number,
    latitude: number,
    name: string
}
interface LeafletMapProps {
    state: StateProps,
    parkCoords: CoordProps[]
}

export const LeafletMap = ({state, parkCoords}: LeafletMapProps) => {
    // const [map, setMap] = useState(null)

    
    const displayMap = useMemo(
        () => (
          <MapContainer
            style={{height: '400px', width: '100%'}} 
            center={[37.8, -96]} 
            zoom={4}>
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