import SupplyMap from "./SupplyMap";
import SupplyForm from "./SupplyForm";
import SupplyTimeline from "./SupplyTimeline";
import SupplyStats from "./SupplyStats";

export default function SupplyChain() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">🚚 Supply Chain Management</h2>

      {/* Stats */}
      <SupplyStats />

      {/* Event input */}
      <SupplyForm />

      {/* Map */}
      <SupplyMap />

      {/* Timeline */}
      <SupplyTimeline />
    </div>
  );
}
