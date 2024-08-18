import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import FeatureCard from '@/components/FeatureCard';

const featureData = [
  {
    title: "AI-Generated Flashcards: Learn Smarter, Not Harder",
    // videoSrc: "/video/main.mp4",
    imageSrc: "/images/flashcard.svg",
    mediaOnRight: true
  },
  {
    title: "Share and Collaborate: Effortless Flashcard Exchange",
    // videoSrc: "/video/main.mp4",
    imageSrc: "/images/multiplayer.svg",
    mediaOnRight: false
  },
  {
    title: "Ensuring Accuracy: Leveraging RAG for Reliable Information",
    // videoSrc: "/video/main.mp4",
    imageSrc: "/images/pinecone.svg",
    mediaOnRight: true
  }
];

const Features: React.FC = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 0.33], [50, 0]);
  const y2 = useTransform(scrollYProgress, [0.33, 0.66], [50, 0]);
  const y3 = useTransform(scrollYProgress, [0.66, 1], [50, 0]);

  return (
    <section ref={ref} className="relative space-y-8">
      {featureData.map((feature, index) => (
        <motion.div
          key={index}
          style={{ y: index === 0 ? y1 : index === 1 ? y2 : y3 }}
          className="sticky top-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <FeatureCard
            title={feature.title}
            // videoSrc={feature.videoSrc}
            imageSrc={feature.imageSrc}
            mediaOnRight={feature.mediaOnRight}
          />
        </motion.div>
      ))}
    </section>
  );
};

export default Features;