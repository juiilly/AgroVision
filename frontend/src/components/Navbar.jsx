import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold text-agroGreen">AGRO-VISION</h1>
      <div className="space-x-6">
        <Link to="/" className="hover:text-agroGreen">Home</Link>
        <Link to="/dashboard" className="hover:text-agroGreen">Dashboard</Link>
        <Link to="/crop-health" className="hover:text-agroGreen">Crop Health</Link>
        <Link to="/price-forecast" className="hover:text-agroGreen">Prices</Link>
      </div>
    </nav>
  );
}
