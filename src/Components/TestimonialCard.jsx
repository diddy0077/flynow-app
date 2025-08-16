// TestimonialCard.jsx
import { motion } from "framer-motion";

export default function TestimonialCard({ name, role, comment, image }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="bg-white shadow-lg rounded-2xl p-6 text-center max-w-sm mx-auto"
    >
      <img
        src={image}
        alt={name}
        className="w-20 h-20 rounded-full mx-auto mb-4 object-cover border-4 border-blue-100"
      />
      <h3 className="text-xl font-semibold text-blue-900">{name}</h3>
      <p className="text-sm text-gray-500 mb-3">{role}</p>
      <p className="text-gray-700 italic">“{comment}”</p>
    </motion.div>
  );
}
