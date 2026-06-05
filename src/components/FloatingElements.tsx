"use client";

import { useEffect, useRef, useState } from "react";

interface FloatingElementsProps {
  count?: number;
  color?: string;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseVx: number;
  baseVy: number;
  size: number;
  opacity: number;
  isCross: boolean;
  angle: number;
  spinSpeed: number;
}

export default function FloatingElements({ count = 8, color = "#6B0F0F" }: FloatingElementsProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mounted, setMounted] = useState(false);
  const mouseRef = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    let width = 0;
    let height = 0;

    const resize = () => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = width;
      canvas.height = height;
      initParticles();
    };

    const initParticles = () => {
      particles = [];
      for (let i = 0; i < count; i++) {
        const isCross = i % 2 === 0;
        const size = isCross ? 10 + Math.random() * 8 : 4 + Math.random() * 4;
        const baseVx = (Math.random() - 0.5) * 0.4;
        const baseVy = -0.2 - Math.random() * 0.4; // Slowly floating upwards
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: baseVx,
          vy: baseVy,
          baseVx,
          baseVy,
          size,
          opacity: 0.25 + Math.random() * 0.35,
          isCross,
          angle: Math.random() * Math.PI * 2,
          spinSpeed: (Math.random() - 0.5) * 0.02,
        });
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      // Only track if canvas is visible in the viewport
      if (rect.bottom < 0 || rect.top > window.innerHeight) return;
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!canvas || e.touches.length === 0) return;
      const rect = canvas.getBoundingClientRect();
      if (rect.bottom < 0 || rect.top > window.innerHeight) return;
      mouseRef.current = {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top,
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 };
    };

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);

    // Initial resize setup
    resize();

    const drawCross = (context: CanvasRenderingContext2D, x: number, y: number, size: number, angle: number) => {
      context.save();
      context.translate(x, y);
      context.rotate(angle);
      context.beginPath();
      // Horizontal line
      context.moveTo(-size / 2, 0);
      context.lineTo(size / 2, 0);
      // Vertical line
      context.moveTo(0, -size / 2);
      context.lineTo(0, size / 2);
      context.stroke();
      context.restore();
    };

    const drawDot = (context: CanvasRenderingContext2D, x: number, y: number, radius: number) => {
      context.beginPath();
      context.arc(x, y, radius, 0, Math.PI * 2);
      context.fill();
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.strokeStyle = color;
      ctx.fillStyle = color;
      ctx.lineWidth = 1.5;

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const repelRadius = 130;
      const repelStrength = 1.2;

      particles.forEach((p) => {
        // Irregular movement (slight noise additions to base velocity)
        p.vx += (Math.random() - 0.5) * 0.05;
        p.vy += (Math.random() - 0.5) * 0.05;

        // Repel from mouse
        const dx = p.x - mx;
        const dy = p.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < repelRadius && dist > 0) {
          const force = (repelRadius - dist) / repelRadius; // 0 to 1
          const angle = Math.atan2(dy, dx);
          // Apply repulsion acceleration
          p.vx += Math.cos(angle) * force * repelStrength;
          p.vy += Math.sin(angle) * force * repelStrength;
        }

        // Apply friction/damping
        p.vx *= 0.94;
        p.vy *= 0.94;

        // Restore baseline drift slowly
        p.vx += p.baseVx * 0.06;
        p.vy += p.baseVy * 0.06;

        // Update positions
        p.x += p.vx;
        p.y += p.vy;
        p.angle += p.spinSpeed;

        // Wrap boundaries
        if (p.x < -20) p.x = width + 20;
        if (p.x > width + 20) p.x = -20;
        if (p.y < -20) p.y = height + 20;
        if (p.y > height + 20) p.y = -20;

        // Render
        ctx.globalAlpha = p.opacity;
        if (p.isCross) {
          drawCross(ctx, p.x, p.y, p.size, p.angle);
        } else {
          drawDot(ctx, p.x, p.y, p.size / 2);
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [mounted, count, color]);

  if (!mounted) return null;

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-40"
    />
  );
}
