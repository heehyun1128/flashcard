import React from 'react';

const TestPage: React.FC = () => {
  return (
    <div className="border border-purple-600 h-screen flex">
      <div className="bg-[#f5f2ff] w-1/2 flex flex-col justify-center items-center">
        <div className="text-gray-800 text-2xl">
          Tasks, notes <br /> & everything <br /> in between.
        </div>
      </div>
      <div className="bg-purple-600 w-1/2 flex items-center justify-center">
        <div className="bg-yellow-400 rounded-[70px] w-[90%] h-[90%] flex items-center justify-center">
          <div className="text-black text-2xl">
            Video Container
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestPage;