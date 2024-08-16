import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface FeatureCardProps {
  title: string;
  videoSrc: string;
  videoOnRight: boolean;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, videoSrc, videoOnRight }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={cardVariants}
      className={`min-h-[40vh] flex flex-col ${videoOnRight ? 'md:flex-row' : 'md:flex-row-reverse'}`}
    >
      <motion.div
        variants={cardVariants}
        className="w-full md:w-1/2 flex flex-col justify-center items-center p-3"
      >
        <div className="text-charcoal-black text-[20px] sm:text-[22px] md:text-[24px] lg:text-[28px] font-semibold leading-[1.2] tracking-tight text-center md:text-left">
          <span className="text-deep-orange">{title.split(' ').slice(0, 2).join(' ')}</span><br />
          {title.split(' ').slice(2).join(' ')}
        </div>
      </motion.div>
      <motion.div
        variants={cardVariants}
        className="w-full md:w-1/2 flex items-center justify-center p-3"
      >
        <div className="rounded-[15px] md:rounded-[20px] w-full md:w-[85%] aspect-video flex items-center justify-center relative overflow-hidden">
          <video
            src={videoSrc}
            width={480}
            height={270}
            autoPlay
            loop
            muted
            playsInline
            className="rounded-[12px] md:rounded-[18px] w-full h-full object-cover"
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default FeatureCard;