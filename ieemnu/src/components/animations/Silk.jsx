import React, { useRef, useEffect } from 'react';

const Silk = ({
  speed = 5,
  scale = 1,
  color = '#3B82F6',
  noiseIntensity = 1.5,
  rotation = 0,
  className = '',
  ...props
}) => {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let time = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);
    resize();

    // Parse color
    let r = 59, g = 130, b = 246;
    if (color.startsWith('#') && color.length === 7) {
      r = parseInt(color.slice(1, 3), 16);
      g = parseInt(color.slice(3, 5), 16);
      b = parseInt(color.slice(5, 7), 16);
    }

    const draw = () => {
      time += speed * 0.003;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();
      
      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.rotate(rotation * Math.PI / 180);
      ctx.scale(scale, scale);
      ctx.translate(-canvas.width / 2, -canvas.height / 2);

      const lines = 18;
      for (let i = 0; i < lines; i++) {
        ctx.beginPath();
        const alpha = 0.05 + (i / lines) * 0.15;
        ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
        ctx.lineWidth = 1 + (i % 2);
        
        const yOffset = (i - lines/2) * 35;
        
        for (let x = -200; x <= canvas.width + 200; x += 20) {
          const wave1 = Math.sin(x * 0.0015 * noiseIntensity + time + i * 0.15) * 60;
          const wave2 = Math.cos(x * 0.003 + time * 0.6 + i * 0.08) * 90;
          const y = canvas.height / 2 + yOffset + wave1 + wave2;
          
          if (x === -200) {
            ctx.moveTo(x, y);
          } else {
            // Smooth curves
            ctx.bezierCurveTo(x - 10, y, x - 5, y, x, y);
          }
        }
        ctx.stroke();
      }
      
      ctx.restore();
      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [speed, scale, color, noiseIntensity, rotation]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
      {...props}
    />
  );
};

export default Silk;
