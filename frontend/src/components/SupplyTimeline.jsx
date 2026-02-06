export default function SupplyTimeline({ events }) {
  return (
    <div className="bg-white p-4 rounded-xl shadow">
      <h3 className="font-semibold mb-3">📜 Supply Timeline</h3>

      <ul className="space-y-2 text-sm max-h-[300px] overflow-y-auto">
        {[...events].reverse().map((e, i) => (
          <li key={i} className="border-l-4 border-green-600 pl-3">
            🌾 <b>{e.crop}</b> | {e.stage} | {e.quantity}kg
            <br />
            <span className="text-xs text-gray-500">
              {new Date(e.timestamp).toLocaleString()}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
