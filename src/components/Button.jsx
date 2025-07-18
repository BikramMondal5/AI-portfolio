import React from 'react';

const Button = ({ name, isBeam, containerClass, onClick }) => {
  return (
    <div className={`${containerClass}`}>
      <button
        onClick={onClick}
        className={`py-3 px-8 rounded-[30px] outline-none w-full text-white shadow-md shadow-primary 
        ${isBeam 
          ? 'bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600' 
          : 'bg-[#151030] hover:bg-[#1d1945]'} 
        transition-all duration-300 ease-in-out transform hover:scale-105`}
      >
        {name}
      </button>
    </div>
  );
};

export default Button;