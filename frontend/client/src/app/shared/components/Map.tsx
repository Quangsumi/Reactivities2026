import {Marker, Popup, TileLayer} from "react-leaflet";
import {MapContainer} from "react-leaflet/MapContainer";
import 'leaflet/dist/leaflet.css';

// import L from 'leaflet';
// import markerIcon from 'leaflet/dist/images/marker-icon.png';
// import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// const DefaultIcon = L.icon({
//     iconUrl: markerIcon,
//     shadowUrl: markerShadow,
// });

// L.Marker.prototype.options.icon = DefaultIcon;

type Props = {
    position: [number, number];
    venue: string
}

export default function Map({position, venue}: Props) {
    return (
        <MapContainer style={{ height: "100%" }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
            <Marker position={position}>
                <Popup>
                    {venue}
                </Popup>
            </Marker>
        </MapContainer>
    )
}