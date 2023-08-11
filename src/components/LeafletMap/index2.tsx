// Create a react leaflet that renders a US Map centered on the state
import { MapContainer, TileLayer, GeoJSON, useMap, Marker, Popup, ZoomControl } from "react-leaflet";
import { USMapCords } from "../../utils/lib/USMap";
import { useEffect, useMemo, useRef, useState } from "react";
import { StateProps } from "../../utils/lib/stateMap";

import { GeoJSON as GeoJSONType } from "leaflet";
import { Link } from "react-router-dom";
import useOnScreen from "../../utils/hooks/useOnScreen";
import { ParkProps } from "../../pages/Park";




interface CoordProps {
    longitude: number;
    latitude: number;
    name: string;
    id: string;
}
interface LeafletMapProps {
    states: StateProps[];
    parkCoords: CoordProps[];
}

const getCoords = (state: StateProps) => {
    return USMapCords.features.find(
        (stateCoords) => stateCoords.properties && state.name === stateCoords.properties.name
    );
}

const BaseMap = ({children}: {children: JSX.Element}) => {
    const [active, setActive] = useState(false);
    const overlayRef = useRef(null);
    const offscreen = useOnScreen(overlayRef);

    useEffect(() => {
        if (offscreen) setActive(false);
    }, [offscreen]);

    console.log('rerender Map');


    return (
        <>
            <MapContainer center={[37.8, -96]} minZoom={4} zoom={3}>
                <TileLayer
                    attribution='Map data ©2023 Google'
                    url='http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}'
                    subdomains={["mt0", "mt1", "mt2", "mt3"]}
                />
                {children}
            </MapContainer>
            <div
                ref={overlayRef}
                className='overlay'
                style={{ visibility: active ? "hidden" : "initial" }}
                onScroll={(e) => e.stopPropagation()}
                onClick={() => setActive(true)}
            />
        </>
    );
}

const MapMarker = (park: CoordProps) => {
    return (
        <Marker key={park.name} position={[park.latitude, park.longitude]}>
            <Popup>
                <div style={{ maxWidth: "200px" }}>
                    <p>{park.name}</p>
                    <Link to={`/park/${park.id}`}>View Park</Link>
                </div>
            </Popup>
        </Marker>
    )
}

const StateBorder = ({state}: {state: StateProps}) => {
    const stateCoords = getCoords(state);
    const geoJsonLayer = useRef<GeoJSONType>(null as unknown as GeoJSONType) as React.MutableRefObject<GeoJSONType>;

    // useEffect(() => {
    //     return () => {console.log('clearing', state.name); geoJsonLayer.current && map.removeLayer(geoJsonLayer.current)}
    // }, [])

    if (stateCoords)
        return <GeoJSON ref={geoJsonLayer} data={stateCoords}/>

    return <></>

}

const MapContent = ({ states, parkCoords }: LeafletMapProps) => {
    const map = useMap()


    useEffect(() => {
        return () => {console.log('removing'); map.eachLayer(function (layer) {
            map.removeLayer(layer);
        });}
    }, [])

    return (
        <>
        {states.map(s => <StateBorder state={s}/>)}
        {parkCoords.map(park => <MapMarker key={park.name} {...park}/>)}
        </>
    )
}

export const LeafletMap = ({ states, parkCoords }: LeafletMapProps) => {

    useEffect(() => {
        return () => {console.log('removing Leaflet')}
    }, [states])

    return (
        <BaseMap>
            <MapContent states={states} parkCoords={parkCoords}/>
        </BaseMap>
    )
    // const displayMap = useMemo(
    //     () => (
    //         <>
    //             <LeafletEvents states={states} />
    //             {parkCoords.map((park) => (
    //                 <Marker key={park.name} position={[park.latitude, park.longitude]}>
    //                     <Popup>
    //                         <div style={{ maxWidth: "200px" }}>
    //                             <p>{park.name}</p>
    //                             <Link to={`/park/${park.id}`}>View Park</Link>
    //                         </div>
    //                         {/* List Activites */}
    //                     </Popup>
    //                 </Marker>
    //             ))}
    //         </>
    //     ),
    //     [states]
    // );


};
