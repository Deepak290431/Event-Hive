import React from 'react';

const EventHiveLogo = ({ size = 40, className = "" }) => {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 40 40" 
      className={className}
      style={{ display: 'inline-block', verticalAlign: 'middle' }}
    >
      {/* Background circle */}
      <circle cx="20" cy="20" r="18" fill="#667eea" />
      
      {/* Hive pattern - hexagons */}
      <g fill="#ffffff" opacity="0.9">
        {/* Center hexagon */}
        <path d="M20 8 L26 12 L26 20 L20 24 L14 20 L14 12 Z" />
        
        {/* Top hexagon */}
        <path d="M20 4 L24 7 L24 11 L20 14 L16 11 L16 7 Z" />
        
        {/* Bottom left hexagon */}
        <path d="M12 16 L16 19 L16 23 L12 26 L8 23 L8 19 Z" />
        
        {/* Bottom right hexagon */}
        <path d="M28 16 L32 19 L32 23 L28 26 L24 23 L24 19 Z" />
      </g>
      
      {/* Event dots */}
      <g fill="#f59e0b">
        <circle cx="20" cy="16" r="1.5" />
        <circle cx="16" cy="21" r="1" />
        <circle cx="24" cy="21" r="1" />
      </g>
    </svg>
  );
};

export default EventHiveLogo;
