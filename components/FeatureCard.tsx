import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface FeatureCardProps {
  title: string;
  videoSrc: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, videoSrc }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={cardVariants}
      className="min-h-[50vh] flex flex-col md:flex-row"
    >
      <motion.div
        variants={cardVariants}
        className="w-full md:w-1/2 flex flex-col justify-center items-center p-4"
      >
        <div className="text-charcoal-black text-[24px] sm:text-[28px] md:text-[32px] lg:text-[40px] font-semibold leading-[1.1] tracking-tighter text-center md:text-left">
          <span className="text-deep-orange">{title.split(' ').slice(0, 2).join(' ')}</span><br />
          {title.split(' ').slice(2).join(' ')}
        </div>
      </motion.div>
      <motion.div
        variants={cardVariants}
        className="w-full md:w-1/2 flex items-center justify-center p-4"
      >
        <div className="rounded-[20px] md:rounded-[30px] w-full md:w-[90%] aspect-video flex items-center justify-center relative overflow-hidden">
          <video
            src={videoSrc}
            width={640}
            height={360}
            autoPlay
            loop
            muted
            playsInline
            className="rounded-[15px] md:rounded-[25px] w-full h-full object-cover"
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default FeatureCard;