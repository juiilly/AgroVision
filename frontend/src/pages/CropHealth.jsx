export default function CropHealth({ weather, alerts }) {
  let status = "Good";
  let color = "text-green-600";

  if (alerts > 2) {
    status = "Risky";
    color = "text-red-600";
  } else if (weather?.temp > 38) {
    status = "Moderate";
    color = "text-yellow-600";
  }

  return (
    <div>
      <h4 className="font-medium">🌾 Crop Health</h4>
      <p className={`text-3xl font-bold ${color}`}>{status}</p>
    </div>
  );
}
