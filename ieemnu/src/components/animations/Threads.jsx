/**
 * Threads Component
 * Animated flowing threads/waves background with mouse interaction
 */

import { useEffect, useRef } from 'react';

/**
 * Threads component
 * Creates animated flowing threads that respond to mouse movement
 *
 * @param {Object} props - Component props
 * @param {number} props.amplitude - Wave amplitude
 * @param {number} props.distance - Distance between threads
 * @param {boolean} props.enableMouseInteraction - Enable mouse interaction
 * @returns {JSX.Element} Threads canvas
 */
const Threads = ({
  amplitude = 1,
  distance = 0,
  enableMouseInteraction = true,
}) => {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const animationFrameRef = useRef(null);
  const timeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;

    // Set canvas size
    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
    };

    // Handle mouse move
    const handleMouseMove = (e) => {
      if (!enableMouseInteraction) return;
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    // Handle mouse leave
    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 };
    };

    // Draw flowing threads
    const drawThreads = () => {
      const rect = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);

      const numThreads = 15;
      const spacing = distance || rect.height / (numThreads + 1);

      for (let i = 0; i < numThreads; i++) {
        const baseY = (i + 1) * spacing;
        // Use white/light blue colors with varying opacity for elegant look
        const opacity = 0.2 + (i / numThreads) * 0.4;
        const lightness = 85 + (i / numThreads) * 10; // Very light colors

        ctx.beginPath();
        ctx.strokeStyle = `hsla(200, 30%, ${lightness}%, ${opacity})`;
        ctx.lineWidth = 1.5 + (i * 0.2);

        for (let x = 0; x <= rect.width; x += 5) {
          // Base wave motion
          const wave1 = Math.sin((x * 0.005) + (timeRef.current * 0.001) + (i * 0.5)) * 30 * amplitude;
          const wave2 = Math.cos((x * 0.003) + (timeRef.current * 0.0015) - (i * 0.3)) * 20 * amplitude;
          
          let y = baseY + wave1 + wave2;

          // Mouse interaction
          if (enableMouseInteraction) {
            const dx = x - mouseRef.current.x;
            const dy = y - mouseRef.current.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const maxDistance = 200;

            if (distance < maxDistance) {
              const force = (1 - distance / maxDistance) * 50;
              const angle = Math.atan2(dy, dx);
              y += Math.sin(angle) * force;
            }
          }

          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }

        ctx.stroke();

        // Add subtle glow effect for some threads
        if (i % 4 === 0) {
          ctx.shadowBlur = 10;
          ctx.shadowColor = `rgba(255, 255, 255, 0.3)`;
          ctx.stroke();
          ctx.shadowBlur = 0;
        }
      }

      timeRef.current += 16;
      animationFrameRef.current = requestAnimationFrame(drawThreads);
    };

    // Initialize
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);
    drawThreads();

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [amplitude, distance, enableMouseInteraction]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: enableMouseInteraction ? 'auto' : 'none',
      }}
    />
  );
};

export default Threads;
