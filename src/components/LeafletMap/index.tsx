// Create a react leaflet that renders a US Map centered on the state
import { MapContainer, TileLayer, GeoJSON, Marker, Popup, useMap } from "react-leaflet";
import { USMapCords } from "../../utils/lib/USMap";
import { useEffect, useMemo, useRef, useState } from "react";
import { StateProps } from "../../utils/lib/stateMap";

import { Link } from "react-router-dom";
import useOnScreen from "../../utils/hooks/useOnScreen";
import { Icon, LatLngBoundsExpression, LatLngTuple } from "leaflet";

export interface IMarker {
    longitude: number;
    latitude: number;
    name: string;
    id: string;
    active?: boolean;
}

interface IMap {
    states: StateProps[];
    parkCoords: IMarker[];
}

const getCoords = (state: StateProps) => {
    return USMapCords.features.find(
        (stateCoords) => stateCoords.properties && state.name === stateCoords.properties.name
    );
};

export const LeafletMap = ({ states, parkCoords }: IMap) => {
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
            <MapContainer center={[37.8, -96]} zoom={3}>
                <TileLayer
                    attribution='Map data ©2023 Google'
                    url='http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}'
                    subdomains={["mt0", "mt1", "mt2", "mt3"]}
                />
                <CustomMap states={states} parkCoords={parkCoords}/>
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
};

const CustomMap = ({ states, parkCoords }: IMap) => {
    const map = useMap();
    const active = parkCoords.find(p => p.active)
    const baseView = active ? [active.latitude, active.longitude] as LatLngTuple : [37.8, -96] as LatLngTuple;
    const baseZoom = active ? 7 : 3;

    useEffect(() => {
        map.setView(baseView).setZoom(baseZoom);
    }, [states]);

    return (
        <>
            {states.map((s) => (
                <StateBorder key={s.id} state={s} />
            ))}
            {parkCoords.map((park) => (
                <MapMarker key={park.name} park={park} />
            ))}
        </>
    );
};

const StateBorder = ({ state }: { state: StateProps }) => {
    const stateCoords = getCoords(state);

    if (stateCoords) return <GeoJSON data={stateCoords} />;

    return <></>;
};

const MapMarker = ({ park }: { park: IMarker }) => {
    const popup = (
            <Popup>
                <div style={{ width: "150px" }}>
                    <p>{park.name}</p>
                    <Link to={`/park/${park.id}`}>View Park</Link>
                </div>
            </Popup>
    )
    if (park.active) {
        return (
            <Marker key={park.name} position={[park.latitude, park.longitude]} icon={greenIcon}>
                {popup}
            </Marker>
        )
    }

    return (
        <Marker key={park.name} position={[park.latitude, park.longitude]}>
            {popup}
        </Marker>
    );
};

const greenIcon = new Icon({
    iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png",
    shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
});
