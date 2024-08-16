import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import FeatureCard from '@/components/FeatureCard';

const featureData = [
  {
    title: "Tasks, notes & everything in between.",
    videoSrc: "/video/main.mp4",
    videoOnRight: true
  },
  {
    title: "Organize your workflow efficiently.",
    videoSrc: "/video/main.mp4",
    videoOnRight: false
  },
  {
    title: "Collaborate seamlessly with your team.",
    videoSrc: "/video/main.mp4",
    videoOnRight: true
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
            videoSrc={feature.videoSrc}
            videoOnRight={feature.videoOnRight}
          />
        </motion.div>
      ))}
    </section>
  );
};

export default Features;