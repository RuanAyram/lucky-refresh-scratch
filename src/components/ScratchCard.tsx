import React, { useEffect, useRef, useState } from 'react';

interface ScratchCardProps {
  prize: string;
}

const ScratchCard: React.FC<ScratchCardProps> = ({ prize }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isScratched, setIsScratched] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Fill canvas with gray scratch-off layer
    ctx.fillStyle = '#808080';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }, []);

  const handleScratch = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = ('touches' in e) ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = ('touches' in e) ? e.touches[0].clientY - rect.top : e.clientY - rect.top;

    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 20, 0, Math.PI * 2);
    ctx.fill();

    // Check if most of the card is scratched
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imageData.data;
    let transparentPixels = 0;
    for (let i = 3; i < pixels.length; i += 4) {
      if (pixels[i] === 0) transparentPixels++;
    }
    
    if (transparentPixels > (pixels.length / 4) * 0.5) {
      setIsScratched(true);
    }
  };

  return (
    <div className="relative w-[300px] h-[150px] rounded-lg overflow-hidden animate-glow">
      <div className="absolute inset-0 bg-gradient-to-br from-scratch-primary to-scratch-secondary flex items-center justify-center text-white text-2xl font-bold">
        {isScratched ? prize : '???'}
      </div>
      <canvas
        ref={canvasRef}
        width={300}
        height={150}
        className={`absolute inset-0 cursor-pointer ${isScratched ? 'opacity-0' : ''} transition-opacity duration-500`}
        onMouseDown={() => setIsDragging(true)}
        onMouseUp={() => setIsDragging(false)}
        onMouseMove={(e) => isDragging && handleScratch(e)}
        onTouchStart={() => setIsDragging(true)}
        onTouchEnd={() => setIsDragging(false)}
        onTouchMove={(e) => isDragging && handleScratch(e)}
      />
    </div>
  );
};

export default ScratchCard;