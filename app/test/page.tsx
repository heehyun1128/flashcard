import React from 'react';

const TestPage: React.FC = () => {
  return (
    <div className="h-screen flex">
      <div className="w-1/2 flex flex-col justify-center items-center">
        <div className="text-charcoal-black text-[54px] sm:text-[64px] md:text-[74px] lg:text-[96px] font-semibold leading-[1.1] tracking-tighter">
          <span className="text-deep-orange">Tasks, notes</span><br />
          & everything<br />
          in between.
        </div>
      </div>
      <div className="w-1/2 flex items-center justify-center">
        <div className="rounded-[50px] w-[70%] h-[70%] flex items-center justify-center relative overflow-hidden">
          <video
            src="/video/main.mp4"
            width={900}
            height={450}
            autoPlay
            loop
            muted
            playsInline
            className="rounded-[40px] w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default TestPage;