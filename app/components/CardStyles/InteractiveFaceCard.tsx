'use client';

import { useState, useRef, useEffect } from 'react';

interface InteractiveFaceCardProps {
  recipientName?: string;
  requestorName?: string;
  phoneNumber?: string | null;
}

export default function InteractiveFaceCard({ recipientName, requestorName, phoneNumber }: InteractiveFaceCardProps) {
  const [sadnessLevel, setSadnessLevel] = useState(0);
  const [noButtonPosition, setNoButtonPosition] = useState<{ x: number; y: number } | null>(null);
  const [accepted, setAccepted] = useState(false);
  const [smsSent, setSmsSent] = useState(false);
  const noButtonRef = useRef<HTMLButtonElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const moveNoButton = (e?: React.TouchEvent | React.MouseEvent) => {
    if (e) {
      e.preventDefault();
    }
    if (!containerRef.current || !noButtonRef.current) return;
    
    const container = containerRef.current.getBoundingClientRect();
    const button = noButtonRef.current.getBoundingClientRect();
    
    // Calculate random position within viewport bounds
    const padding = 20;
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    
    const maxX = viewportWidth - button.width - padding;
    const maxY = viewportHeight - button.height - padding;
    
    const randomX = Math.max(padding, Math.random() * maxX);
    const randomY = Math.max(padding, Math.random() * maxY);
    
    setNoButtonPosition({ x: randomX, y: randomY });
    setSadnessLevel(prev => Math.min(prev + 1, 5)); // Max sadness level of 5
  };

  const handleYesClick = async () => {
    setAccepted(true);
    
    // Send SMS notification if phone number is provided
    if (phoneNumber && !smsSent) {
      try {
        const response = await fetch('/api/send-sms', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            phoneNumber: phoneNumber,
            requestorName: requestorName || undefined,
            recipientName: recipientName || undefined,
          }),
        });

        if (response.ok) {
          setSmsSent(true);
        } else {
          console.error('Failed to send SMS');
        }
      } catch (error) {
        console.error('Error sending SMS:', error);
      }
    }
  };

  // Face expressions based on sadness level
  const getFaceExpression = () => {
    const expressions = [
      { eyes: '😊', mouth: 'happy' },
      { eyes: '😐', mouth: 'neutral' },
      { eyes: '😔', mouth: 'sad' },
      { eyes: '😢', mouth: 'sadder' },
      { eyes: '😭', mouth: 'saddest' },
      { eyes: '💔', mouth: 'broken' },
    ];
    return expressions[Math.min(sadnessLevel, 5)];
  };

  const expression = getFaceExpression();
  const displayName = recipientName || 'you';

  if (accepted) {
    return (
      <div className="relative flex min-h-screen items-center justify-center bg-gradient-to-br from-pink-100 via-red-100 to-rose-200 overflow-hidden">
        {/* Fireworks */}
        <div className="pointer-events-none absolute inset-0">
          <div className="firework firework-1" />
          <div className="firework firework-2" />
          <div className="firework firework-3" />
          <div className="firework firework-4" />
          <div className="firework firework-5" />
        </div>

        {/* Floating hearts on success */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          {[...Array(25)].map((_, i) => (
            <div
              key={i}
              className="absolute text-pink-400 opacity-60 animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${3 + Math.random() * 2}s`,
              }}
            >
              💖
            </div>
          ))}
        </div>

        <div className="text-center animate-bounce relative z-10">
          <div className="text-8xl mb-4">💕</div>
          <h1 className="text-5xl font-bold text-pink-600 mb-4">Yay! 💖</h1>
          <p className="text-2xl text-pink-700">
            {requestorName ? `${requestorName} will be so happy!` : 'You made me so happy!'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div 
      ref={containerRef}
      className="flex min-h-screen items-center justify-center bg-gradient-to-br from-pink-100 via-red-100 to-rose-200 relative overflow-hidden"
    >
      <div className="text-center z-10 relative">
        {/* Face Avatar */}
        <div className="mb-8">
          <div className="w-48 h-48 mx-auto bg-white rounded-full shadow-2xl flex items-center justify-center border-4 border-pink-300 relative overflow-hidden">
            {/* Face */}
            <div className="text-8xl transition-all duration-300">
              {expression.eyes}
            </div>
          </div>
        </div>

        {/* Question */}
        <h1 className="text-4xl md:text-5xl font-bold text-pink-700 mb-4">
          {requestorName ? `${requestorName} wants to know:` : 'Will you be my Valentine?'} 💝
        </h1>
        
        <h2 className="text-3xl md:text-4xl font-bold text-pink-600 mb-4">
          Will you be my Valentine, {displayName}?
        </h2>
        
        <p className="text-xl text-pink-600 mb-8">
          {sadnessLevel === 0 && "Please say yes! 😊"}
          {sadnessLevel === 1 && "Are you sure? 😐"}
          {sadnessLevel === 2 && "I'm getting sad... 😔"}
          {sadnessLevel === 3 && "Please reconsider... 😢"}
          {sadnessLevel === 4 && "My heart is breaking... 😭"}
          {sadnessLevel >= 5 && "You've broken my heart... 💔"}
        </p>

        {/* Buttons */}
        <div className="flex gap-4 justify-center items-center flex-wrap relative min-h-[60px]">
          <button
            onClick={handleYesClick}
            className="px-8 py-4 bg-pink-500 hover:bg-pink-600 text-white text-xl font-bold rounded-full shadow-lg transform transition-all duration-200 hover:scale-110 active:scale-95 z-10"
          >
            Yes! 💖
          </button>
          
          <button
            ref={noButtonRef}
            onMouseEnter={moveNoButton}
            onTouchStart={moveNoButton}
            style={{
              position: noButtonPosition ? 'fixed' : 'relative',
              left: noButtonPosition ? `${noButtonPosition.x}px` : 'auto',
              top: noButtonPosition ? `${noButtonPosition.y}px` : 'auto',
              transition: 'all 0.2s ease-out',
            }}
            className="px-8 py-4 bg-gray-400 hover:bg-gray-500 text-white text-xl font-bold rounded-full shadow-lg transform transition-all duration-200 hover:scale-110 active:scale-95 z-20"
          >
            No 😢
          </button>
        </div>

        {/* Floating hearts */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute text-pink-300 opacity-30 animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${3 + Math.random() * 2}s`,
              }}
            >
              💕
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
