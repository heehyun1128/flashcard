import { motion } from "framer-motion";

interface InfoSectionProps {
  title: string;
  description: string;
}

const InfoSection: React.FC<InfoSectionProps> = ({ title, description }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="container mx-auto px-4 py-16 md:py-24 lg:py-32"
    >
      <h2 className="text-4xl md:text-5xl font-bold text-center text-charcoal-black mb-6">
        {title}
      </h2>
      <p className="text-lg md:text-xl text-center text-gray-700 max-w-3xl mx-auto">
        {description}
      </p>
    </motion.div>
  );
};

export default InfoSection;
