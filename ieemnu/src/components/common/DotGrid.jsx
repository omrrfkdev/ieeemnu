/**
 * DotGrid Component
 * Interactive dot grid background with mouse proximity effects
 */

import { useEffect, useRef, useState } from 'react';

const DotGrid = ({
  dotSize = 10,
  gap = 15,
  baseColor = '#1e40af', // IEEE blue
  activeColor = '#2563eb', // IEEE blue light
  proximity = 120,
  shockRadius = 250,
  shockStrength = 5,
  resistance = 750,
  returnDuration = 1.5,
}) => {
  const canvasRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const dotsRef = useRef([]);
  const animationRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();

    // Set canvas size
    const setCanvasSize = () => {
      canvas.width = rect.width;
      canvas.height = rect.height;
      createDots();
    };

    // Create dots grid
    const createDots = () => {
      dotsRef.current = [];
      const cols = Math.floor(canvas.width / (dotSize + gap)) + 1;
      const rows = Math.floor(canvas.height / (dotSize + gap)) + 1;

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = i * (dotSize + gap) + gap;
          const y = j * (dotSize + gap) + gap;

          dotsRef.current.push({
            x,
            y,
            originalX: x,
            originalY: y,
            vx: 0,
            vy: 0,
            color: baseColor,
            size: dotSize,
          });
        }
      }
    };

    // Update dots based on mouse position
    const updateDots = () => {
      const mouseX = mousePos.x - rect.left;
      const mouseY = mousePos.y - rect.top;

      dotsRef.current.forEach((dot) => {
        const dx = mouseX - dot.x;
        const dy = mouseY - dot.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // Proximity effect
        if (distance < proximity) {
          const force = (proximity - distance) / proximity;
          const angle = Math.atan2(dy, dx);

          dot.vx += Math.cos(angle) * force * shockStrength;
          dot.vy += Math.sin(angle) * force * shockStrength;

          // Color transition
          const colorRatio = force;
          dot.color = interpolateColor(baseColor, activeColor, colorRatio);
        }

        // Shockwave effect
        if (distance < shockRadius && distance > proximity) {
          const shockForce = ((shockRadius - distance) / shockRadius) * 0.5;
          const angle = Math.atan2(dy, dx);

          dot.vx += Math.cos(angle) * shockForce * shockStrength;
          dot.vy += Math.sin(angle) * shockForce * shockStrength;
        }

        // Apply resistance and return to original position
        const returnForceX = (dot.originalX - dot.x) / resistance;
        const returnForceY = (dot.originalY - dot.y) / resistance;

        dot.vx += returnForceX;
        dot.vy += returnForceY;

        // Apply damping
        dot.vx *= 0.95;
        dot.vy *= 0.95;

        // Update position
        dot.x += dot.vx;
        dot.y += dot.vy;

        // Reset color if not in proximity
        if (distance >= proximity) {
          dot.color = baseColor;
        }
      });
    };

    // Color interpolation helper
    const interpolateColor = (color1, color2, ratio) => {
      const hex1 = color1.replace('#', '');
      const hex2 = color2.replace('#', '');

      const r1 = parseInt(hex1.substr(0, 2), 16);
      const g1 = parseInt(hex1.substr(2, 2), 16);
      const b1 = parseInt(hex1.substr(4, 2), 16);

      const r2 = parseInt(hex2.substr(0, 2), 16);
      const g2 = parseInt(hex2.substr(2, 2), 16);
      const b2 = parseInt(hex2.substr(4, 2), 16);

      const r = Math.round(r1 + (r2 - r1) * ratio);
      const g = Math.round(g1 + (g2 - g1) * ratio);
      const b = Math.round(b1 + (b2 - b1) * ratio);

      return `rgb(${r}, ${g}, ${b})`;
    };

    // Draw dots
    const drawDots = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      dotsRef.current.forEach((dot) => {
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.size / 2, 0, Math.PI * 2);
        ctx.fillStyle = dot.color;
        ctx.fill();
      });
    };

    // Animation loop
    const animate = () => {
      updateDots();
      drawDots();
      animationRef.current = requestAnimationFrame(animate);
    };

    // Mouse move handler
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    // Initialize
    setCanvasSize();
    animate();

    // Event listeners
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', setCanvasSize);

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', setCanvasSize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [dotSize, gap, baseColor, activeColor, proximity, shockRadius, shockStrength, resistance, returnDuration, mousePos]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
      }}
    />
  );
};

export default DotGrid;
