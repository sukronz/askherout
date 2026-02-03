import React, { useState, useEffect, useRef } from 'react';
import { Heart } from 'lucide-react';
import { Position } from '../types';

interface ProposalProps {
  onAccept: () => void;
  name: string;
}

const PRANK_TEXTS = [
  "No 😢", 
  "Too slow! 💨", 
  "Nice try! 😜", 
  "Oops! 🙊", 
  "Missed me! 🏃‍♂️", 
  "Catch me! 🏃‍♀️", 
  "Not here! 📍",
  "Seriously? 😂",
  "Try again! 🔄"
];

export const Proposal: React.FC<ProposalProps> = ({ onAccept, name }) => {
  const [noBtnPosition, setNoBtnPosition] = useState<Position>({ top: 'auto', left: 'auto' });
  const [noBtnText, setNoBtnText] = useState(PRANK_TEXTS[0]);
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Function to move the button to a random position
  const moveButton = () => {
    if (!containerRef.current) return;
    
    const container = containerRef.current;
    const containerRect = container.getBoundingClientRect();
    
    // Calculate available area (keeping padding in mind)
    // Increased safety margin for mobile screens to prevent button going off-edge
    const buttonWidth = 160; 
    const buttonHeight = 60;
    const maxX = containerRect.width - buttonWidth; 
    const maxY = containerRect.height - buttonHeight; 

    const randomX = Math.floor(Math.random() * maxX);
    const randomY = Math.floor(Math.random() * maxY);

    setNoBtnPosition({
      top: `${Math.max(10, randomY)}px`, // Keep at least 10px from top
      left: `${Math.max(10, randomX)}px`, // Keep at least 10px from left
    });
    
    // Change text for prank effect
    const randomText = PRANK_TEXTS[Math.floor(Math.random() * PRANK_TEXTS.length)];
    setNoBtnText(randomText);
    
    setIsHovered(true);
  };

  return (
    <div ref={containerRef} className="relative flex flex-col items-center justify-center h-full w-full px-4 text-center overflow-hidden py-10">
      
      {/* Decorative Image/Icon */}
      <div className="mb-6 md:mb-8 animate-bounce">
        <Heart className="w-16 h-16 md:w-24 md:h-24 text-rose-500 fill-rose-500 drop-shadow-lg" />
      </div>

      <h1 className="text-4xl sm:text-5xl md:text-7xl font-hand font-bold text-rose-600 mb-4 drop-shadow-sm px-2">
        {name},
      </h1>
      
      <p className="text-lg sm:text-2xl md:text-3xl text-gray-800 font-medium mb-8 md:mb-12 max-w-lg leading-relaxed px-4">
        Will you make me the happiest person alive and be my Valentine?
      </p>

      {/* Button Container - Fixed height to prevent layout shift when No button moves */}
      <div className="flex flex-col md:flex-row gap-4 md:gap-8 items-center justify-center w-full max-w-md relative h-40 md:h-24">
        
        {/* YES Button */}
        <button
          onClick={onAccept}
          className="z-10 px-8 py-3 md:px-10 md:py-4 bg-rose-500 hover:bg-rose-600 text-white text-lg md:text-2xl font-bold rounded-full shadow-lg transform transition hover:scale-110 active:scale-95 focus:outline-none ring-4 ring-rose-200 w-full md:w-auto max-w-[200px] md:max-w-none"
        >
          Yes! 💖
        </button>

        {/* NO Button - The Runaway */}
        <button
          onMouseEnter={moveButton}
          onTouchStart={moveButton} // For mobile touch
          onClick={moveButton} // Fallback
          style={{
            position: isHovered ? 'absolute' : 'relative',
            top: noBtnPosition.top,
            left: noBtnPosition.left,
            transition: 'all 0.15s ease-out',
          }}
          className="px-8 py-3 md:px-10 md:py-4 bg-gray-300 text-gray-600 text-lg md:text-2xl font-bold rounded-full shadow-inner cursor-pointer hover:bg-gray-400 focus:outline-none whitespace-nowrap z-20 w-full md:w-auto max-w-[200px] md:max-w-none"
        >
          {noBtnText}
        </button>
      </div>

      <p className="mt-12 md:mt-16 text-rose-400 text-xs md:text-sm opacity-60 px-4">
        (Hint: The "No" button is playing hard to get!)
      </p>
    </div>
  );
};