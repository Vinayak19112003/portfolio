"use client";
import React from 'react';

const GridBackground = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full -z-10 overflow-hidden">
      <div 
        className="absolute inset-0 bg-background"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(29, 78, 216, 0.15) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(29, 78, 216, 0.15) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
      />
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(circle at 10% 20%, rgba(124, 58, 237, 0.2), transparent 40%),
            radial-gradient(circle at 90% 80%, rgba(29, 78, 216, 0.2), transparent 40%)
          `,
          animation: 'pulse 10s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        }}
      />
    </div>
  );
};

export default GridBackground;
