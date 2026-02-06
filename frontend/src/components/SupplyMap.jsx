import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

export default function SupplyMap({ events }) {
  return (
    <div className="bg-white p-3 rounded-xl shadow">
      <h3 className="font-semibold mb-2">🗺 Live Supply Map</h3>

      <MapContainer
        center={[19.076, 72.8777]}
        zoom={5}
        className="h-[350px] rounded"
      >
        <TileLayer
          attribution="© OpenStreetMap"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {events.map((e, i) => (
          <Marker key={i} position={[e.location.lat, e.location.lng]}>
            <Popup>
              🌾 <b>{e.crop}</b><br />
              Stage: {e.stage}<br />
              Qty: {e.quantity} kg
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
