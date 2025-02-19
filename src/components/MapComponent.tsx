import { MapContainer, Marker, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { FunctionComponent, memo, useMemo } from 'react';
interface IMapComponent {
  lat: string;
  long: string;
}
const MapComponent: FunctionComponent<IMapComponent> = memo((props) => {
  const { lat, long } = props;
  // const id = v4()
  // console.log(id);
  const displayMap = useMemo(
    () => (
      <MapContainer center={[+lat, +long]} zoom={13} scrollWheelZoom={false} className="w-full z-0 h-[600px]">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[+lat, +long]}></Marker>
      </MapContainer>
    ),
    [lat, long],
  );
  return displayMap;
});
export default MapComponent;
