'use client';

interface CardStylePreviewProps {
  styleId: string;
  gradient: string;
}

export default function CardStylePreview({ styleId, gradient }: CardStylePreviewProps) {
  if (styleId === 'interactive-face') {
    return (
      <div className={`w-full h-full bg-gradient-to-br ${gradient} relative overflow-hidden`}>
        {/* Mini card preview */}
        <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
          {/* Face */}
          <div className="w-20 h-20 bg-white rounded-full shadow-md flex items-center justify-center border-2 border-pink-300 mb-3">
            <div className="text-3xl">😊</div>
          </div>
          
          {/* Question text */}
          <div className="text-center">
            <p className="text-xs font-bold text-pink-700 mb-2">Will you be my</p>
            <p className="text-sm font-bold text-pink-600">Valentine? 💝</p>
          </div>
          
          {/* Mini buttons */}
          <div className="flex gap-2 mt-3">
            <div className="w-12 h-6 bg-pink-500 rounded-full"></div>
            <div className="w-12 h-6 bg-gray-400 rounded-full"></div>
          </div>
          
          {/* Floating hearts */}
          <div className="absolute top-2 left-4 text-pink-300 opacity-40 text-xs">💕</div>
          <div className="absolute bottom-4 right-6 text-pink-300 opacity-40 text-xs">💖</div>
          <div className="absolute top-8 right-4 text-pink-300 opacity-40 text-xs">💕</div>
        </div>
      </div>
    );
  }
  
  return null;
}
