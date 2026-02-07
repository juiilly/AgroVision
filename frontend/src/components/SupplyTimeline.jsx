export default function SupplyTimeline({ events = [] }) {
  return (
    <div className="border rounded p-4 bg-white shadow">
      <h3 className="font-semibold mb-3">📜 Supply Timeline</h3>

      {events.length === 0 ? (
        <p className="text-sm text-gray-500">No events yet</p>
      ) : (
        <ul className="space-y-2 text-sm">
          {events.map((e, i) => (
            <li key={i} className="border-b pb-1">
              🌾 <b>{e.crop}</b> | {e.stage} | {e.quantity}kg
              <br />
              ⏱ {new Date(e.timestamp || Date.now()).toLocaleString()}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
