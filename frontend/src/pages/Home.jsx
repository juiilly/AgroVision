import FeatureCard from "../components/FeatureCard";

export default function Home() {
  return (
    <div className="px-10 py-16">
      {/* Hero */}
      <h1 className="text-5xl font-bold text-agroGreen mb-6">
        AI-Driven Intelligence for Smarter Farming
      </h1>

      <p className="text-lg text-gray-600 max-w-2xl mb-12">
        AGRO-VISION uses real-time data and AI to monitor crop health,
        forecast prices, and optimize agricultural supply chains.
      </p>

      {/* Features */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <FeatureCard
          icon="🌱"
          title="Crop Health Monitoring"
          description="Detect crop stress and disease risks using live weather and AI analysis."
        />
        <FeatureCard
          icon="📈"
          title="Price Forecasting"
          description="Predict future crop prices using real-time market data."
        />
        <FeatureCard
          icon="🚚"
          title="Supply Chain Insights"
          description="Optimize transportation, storage, and market selection."
        />
        <FeatureCard
          icon="🔔"
          title="Smart Alerts"
          description="Receive alerts for weather risks and price changes."
        />
      </div>
    </div>
  );
}

