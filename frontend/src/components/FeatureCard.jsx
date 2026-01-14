import { motion } from "framer-motion";

export default function FeatureCard({ title, description, icon }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-white rounded-2xl shadow-lg p-6 text-center"
    >
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-agroGreen mb-2">
        {title}
      </h3>
      <p className="text-gray-600 text-sm">
        {description}
      </p>
    </motion.div>
  );
}
