import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';

interface FeatureCardProps {
  title: string;
  imageSrc: string;
  mediaOnRight: boolean;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, imageSrc, mediaOnRight }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={cardVariants}
      className={`min-h-[30vh] sm:min-h-[35vh] md:min-h-[40vh] lg:min-h-[45vh] flex flex-col ${mediaOnRight ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}
    >
      <motion.div
        variants={cardVariants}
        className="w-full lg:w-1/2 flex flex-col justify-center items-center p-4 sm:p-6 md:p-8"
      >
        <h3 className="text-charcoal-black text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold leading-tight tracking-tight text-center lg:text-left mb-4">
          <span className="text-deep-orange">{title.split(':')[0]}</span>
          <br />
          {title.split(':')[1].trim()}
        </h3>
      </motion.div>
      <motion.div
        variants={cardVariants}
        className="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-6 md:p-8"
      >
        <div className="rounded-2xl sm:rounded-3xl w-full lg:w-[90%] aspect-video flex items-center justify-center relative overflow-hidden">
          <Image
            src={imageSrc}
            alt={title}
            layout="fill"
            objectFit="cover"
            className="rounded-xl sm:rounded-2xl"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default FeatureCard;