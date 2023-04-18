import { useEffect, useState, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvent, GeoJSON} from 'react-leaflet';
import { USMapCords } from '../../data/USMap';
import { LatLngBoundsExpression } from 'leaflet';

interface LeafletMapProps {
    stateCoords: string,
    parkCoords: { 
        longitude: number, 
        latitude: number,
        name: string 
    }[];
}

function SetViewOnClick({ animateRef }) {
    const map = useMapEvent('click', (e) => {
      map.setView(e.latlng, map.getZoom(), {
        animate: animateRef.current || false,
      })
    })
  
    
    
  
    return null
  }
  
  function AnimateExample({ bounds }) {
    const animateRef = useRef(false)
    console.log('reload', bounds)
    return (
      <>
        <p>
          <label>
            <input
              type="checkbox"
              onChange={() => {
                animateRef.current = !animateRef.current
              }}
            />
            Animate panning
          </label>
        </p>
        <MapContainer style={{height: '400px', width: '100%'}} bounds={bounds} zoom={13} scrollWheelZoom={false}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <SetViewOnClick animateRef={animateRef} />
        </MapContainer>
      </>
    )
  }
  

const SetViewOnChange = ({features}: any) => {
    const map = useMap();
    
    
    // map.setView(, map.getZoom());
    // map.fitBounds(USMapCords.features[0].getBounds());
    
    function onEachFeature(feature, layer) {
      layer.on({
          click: function(e: { target: { getBounds: () => LatLngBoundsExpression; }; }) {
            console.log('e', e.target.getBounds(), e.target);
            map.fitBounds(e.target.getBounds());
          }
      });
    }
    console.log('feature update')
    return <GeoJSON data={features} onEachFeature={onEachFeature} />
    ;
}



export const LeafletMap = ({stateCoords, parkCoords} : LeafletMapProps) => {
    const [ftState, setFtState] = useState<{}>({});
    const animateRef = useRef(false);
    // const map = useMap()
    
    useEffect(() => {
        const stateFeature = USMapCords.features.filter(state => state.properties.name === stateCoords)[0];
        // stateFeature.id = '1';
        setFtState(stateFeature)
        // const coords = USMapCords.filter(state => state.name === stateCoords)[0].coords
        // setBounds(coords);
        // map.fitBounds(stateCoords);
    }, [stateCoords]);
    
    // console.log('stateCoords', bounds);

    
    return (
      <>
        {/* <AnimateExample bounds={bounds}  /> */}
        <MapContainer style={{height: '400px', width: '100%'}} center={[37.8, -96]} zoom={4} >
            <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
              
            <SetViewOnChange features={ftState}/>
            {parkCoords.map((park) => 
                    <Marker key={park.name} position={[park.latitude, park.longitude]}>
                        <Popup>{park.name}</Popup>
                    </Marker>
            )}
        </MapContainer>
      </>
    )
}