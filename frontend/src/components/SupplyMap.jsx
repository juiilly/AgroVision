import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export default function SupplyMap({ events = [] }) {
  return (
    <MapContainer
      center={[19.076, 72.8777]}
      zoom={5}
      className="h-[400px] rounded-xl"
    >
      <TileLayer
        attribution="© OpenStreetMap"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {events.map((e, i) => {
        if (!e?.location) return null;

        return (
          <Marker
            key={i}
            position={[Number(e.location.lat), Number(e.location.lng)]}
          >
            <Popup>
              🌾 <b>{e.crop}</b><br />
              Stage: {e.stage}<br />
              Quantity: {e.quantity} kg
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
}
