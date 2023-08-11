// Create a react leaflet that renders a US Map centered on the state
import { MapContainer, TileLayer, GeoJSON, useMap, Marker, Popup } from "react-leaflet";
import { USMapCords } from "../../utils/lib/USMap";
import { useEffect, useMemo, useRef, useState } from "react";
import { StateProps } from "../../utils/lib/stateMap";

import { GeoJSON as GeoJSONType } from "leaflet";
import { Link } from "react-router-dom";
import useOnScreen from "../../utils/hooks/useOnScreen";

const getCoords = (states: StateProps[]) => {
    return USMapCords.features.filter(
        (stateCoords) => states.some(s => (stateCoords.properties && s.name === stateCoords.properties.name))
    );
}

const LeafletEvents = ({ states }: { states: StateProps[] }) => {
    const map = useMap();
    // This line of code is creating a mutable reference object of type
    // FeatureGroup using the useRef() hook, initializing it to null, and casting it to a
    // specific type definition to ensure it always holds a value of type FeatureGroup.
    const geoJsonLayer = useRef<GeoJSONType>(null as unknown as GeoJSONType) as React.MutableRefObject<GeoJSONType>;

    const stateCoords = useMemo(() => getCoords(states), [states]);

    const resetBounds = (e?: React.MouseEvent<HTMLDivElement>) => {
        e && e.preventDefault();
        map.fitBounds(geoJsonLayer.current && geoJsonLayer.current.getBounds());
    };

    useEffect(() => {
        if (geoJsonLayer.current && states.length === 1) {
            // Clear the current layer and add the new data
            geoJsonLayer.current.clearLayers().addData(stateCoords[0]);
            // Set Initial Bounds
            resetBounds();
        }
    }, [states]);

    console.log('rerender', states)

    return (
        <>
            {states.length <= 1 && <GeoJSON ref={geoJsonLayer} data={stateCoords[0]} />}
            {/* {states.length > 1 && stateCoords.map(s => <GeoJSON  data={s} />)} */}
            <div className='leaflet-bottom leaflet-left'>
                <div className='leaflet-control leaflet-bar' onClick={resetBounds}>
                    <a
                        style={{ padding: "0 1em", width: "auto", display: "flex", alignItems: "center" }}
                        href='#'
                        aria-label='Reset'
                    >
                        Reset
                    </a>
                </div>
            </div>
        </>
    );
};

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

export const LeafletMap = ({ states, parkCoords }: LeafletMapProps) => {
    const [active, setActive] = useState(false);
    const ref = useRef(null);
    const offscreen = useOnScreen(ref);

    useEffect(() => {
        if (offscreen) setActive(false);
    }, [offscreen]);


    const displayMap = useMemo(
        () => (
            <>
                <LeafletEvents states={states} />
                {parkCoords.map((park) => (
                    <Marker key={park.name} position={[park.latitude, park.longitude]}>
                        <Popup>
                            <div style={{ maxWidth: "200px" }}>
                                <p>{park.name}</p>
                                <Link to={`/park/${park.id}`}>View Park</Link>
                            </div>
                            {/* List Activites */}
                        </Popup>
                    </Marker>
                ))}
            </>
        ),
        [states]
    );

    return (
        <>
            <MapContainer center={[37.8, -96]} minZoom={5} zoom={4}>
                <TileLayer
                    attribution='Map data ©2023 Google'
                    url='http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}'
                    subdomains={["mt0", "mt1", "mt2", "mt3"]}
                />

                {displayMap}
            </MapContainer>
            <div
                ref={ref}
                className='overlay'
                style={{ visibility: active ? "hidden" : "initial" }}
                onScroll={(e) => e.stopPropagation()}
                onClick={() => setActive(true)}
            />
        </>
    );
};
