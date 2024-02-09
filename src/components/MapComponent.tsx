import { FunctionComponent, memo, useCallback } from 'react';

import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';

import { style } from '../utils';

const containerStyle = {
  width: '250px',
  height: '300px',
};
interface IMapProps {
  lat: number;
  lng: number;
}
export const MapConponent: FunctionComponent<IMapProps> = memo((props) => {
  const { lat, lng } = props;
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyDA5wMepypOeIW06ZeZi-G-BNxwnIVNq8A',
  });

  // const [map, setMap] = useState<google.maps.Map | null>(null)
  const onLoad = useCallback((map: google.maps.Map) => {
    console.log(map);
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    // const bounds = new window.google.maps.LatLngBounds({ lat, lng });
    // map.fitBounds(bounds);
    // setMap(map)
  }, []);
  const onUnmount = useCallback((map: google.maps.Map) => {
    console.log(map);
    // setMap(null)
  }, []);
  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={{ lat, lng }}
      zoom={15}
      onLoad={onLoad}
      onUnmount={onUnmount}
      options={{
        zoomControl: false,
        scaleControl: false,
        fullscreenControl: false,
        styles: style,
      }}
    >
      <Marker position={{ lat, lng }} />
    </GoogleMap>
  ) : (
    <></>
  );
});
