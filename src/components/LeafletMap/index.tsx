// Create a react leaflet that renders a US Map centered on the state
import { MapContainer, TileLayer, GeoJSON, Marker, Popup, useMap } from "react-leaflet";
import { USMapCords } from "../../utils/lib/USMap";
import { useEffect, useMemo, useRef, useState } from "react";
import { StateProps } from "../../utils/lib/stateMap";

import { Link } from "react-router-dom";
import useOnScreen from "../../utils/hooks/useOnScreen";
import { Icon, LatLngBoundsExpression, LatLngTuple } from "leaflet";

interface CoordProps {
    longitude: number;
    latitude: number;
    name: string;
    fullName?: string;
    id: string;
    icon?: Icon
}
interface LeafletMapProps {
    states: StateProps[];
    parkCoords: CoordProps[];
    activeMarker?: CoordProps
}

const getCoords = (state: StateProps) => {
    return USMapCords.features.find(
        (stateCoords) => stateCoords.properties && state.name === stateCoords.properties.name
    );
}

const BaseMap = ({children}: {children: JSX.Element}) => (
    <>
        <MapContainer center={[37.8, -96]} zoom={3}>
            <TileLayer
                attribution='Map data ©2023 Google'
                url='http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}'
                subdomains={["mt0", "mt1", "mt2", "mt3"]}
            />
            {children}
        </MapContainer>

    </>
);

const MapMarker = (park: CoordProps) => {
    return (
        <Marker key={park.name} position={[park.latitude, park.longitude]}>
            <Popup>
                <div style={{ width: "150px" }}>
                    <p>{park.name}</p>
                    <Link to={`/park/${park.id}`}>View Park</Link>
                </div>
            </Popup>
        </Marker>
    )
}

const StateBorder = ({state}: {state: StateProps}) => {
    const stateCoords = getCoords(state);

    if (stateCoords)
        return <GeoJSON  data={stateCoords}/>

    return <></>

}

const greenIcon = new Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

const MapContent = ({ states, parkCoords, activeMarker }: LeafletMapProps) => {
    const map = useMap();
    const baseView = activeMarker ? [activeMarker.latitude, activeMarker.longitude] as LatLngTuple : [37.8, -96] as LatLngTuple;
    const baseZoom = activeMarker ? 7 : 3;

    useEffect(() => {
        map.setView(baseView).setZoom(baseZoom);
    }, [states])

    return (
        <>
            {states.map(s => <StateBorder key={s.id} state={s}/>)}
            {activeMarker && <Marker key={activeMarker.name} position={[activeMarker.latitude, activeMarker.longitude]} icon={greenIcon}>
                <Popup>
                    <div style={{ width: "150px" }}>
                        <p>{activeMarker.fullName}</p>
                        <Link to={`/park/${activeMarker.id}`}>View Park</Link>
                    </div>
                </Popup>
            </Marker>}
            {parkCoords.map(park => <MapMarker key={park.name} {...park}/>)}
        </>
    )
}

export const LeafletMap = ({ states, parkCoords, activeMarker }: LeafletMapProps) => {
    const [active, setActive] = useState(false);
    const overlayRef = useRef(null);
    const onScreen = useOnScreen(overlayRef);

    useEffect(() => {
        if (!onScreen) {
            setActive(false);
        }
    }, [onScreen]);


    return (
        <>
            <BaseMap>
                <MapContent states={states} parkCoords={parkCoords} activeMarker={activeMarker}/>
            </BaseMap>
            <div
                ref={overlayRef}
                className='overlay'
                style={{ visibility: active ? "hidden" : "initial" }}
                onScroll={(e) => e.stopPropagation()}
                onClick={() => setActive(true)}
            />
        </>
    )
};
