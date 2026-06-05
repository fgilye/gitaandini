"use client";

import { useEffect, useRef, useState } from "react";

interface TrackPoint {
  x: number;
  y: number;
  angle: number;
  opacity: number;
  width: number;
}

export default function TractorCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const tractorRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Position and movement refs
  const mousePos = useRef({ x: 0, y: 0 });
  const prevMousePos = useRef({ x: 0, y: 0 });
  const tractorPos = useRef({ x: 0, y: 0 });
  const tractorAngle = useRef(0);
  const tractorSpeed = useRef(0);
  const totalDistance = useRef(0);

  useEffect(() => {
    // Disable on mobile/touch screens
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) return;

    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    // Inject style to hide default cursor and add beacon blink keyframe
    const style = document.createElement("style");
    style.innerHTML = `
      body, a, button, select, input, textarea, [role="button"], iframe, .cursor-pointer {
        cursor: none !important;
      }
      @keyframes beacon-blink {
        0%, 100% { opacity: 0.3; fill: #FF4500; filter: drop-shadow(0 0 1px #FF4500); }
        50% { opacity: 1.0; fill: #FFD700; filter: drop-shadow(0 0 5px #FFA500) drop-shadow(0 0 10px #FF8C00); }
      }
      .beacon-light {
        animation: beacon-blink 0.35s infinite alternate ease-in-out;
      }
    `;
    document.head.appendChild(style);

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    let trackHistory: TrackPoint[] = [];
    let animationFrameId: number;

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      if (canvas) {
        canvas.width = width;
        canvas.height = height;
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;
      
      const hoverNode = target.closest(
        'a, button, select, input, textarea, [role="button"], .cursor-pointer, [onclick]'
      );
      setIsHovered(!!hoverNode);
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseover", handleMouseOver);

    // Physics / Interpolation loop
    let lastTime = performance.now();
    const update = (time: number) => {
      const dt = (time - lastTime) / 1000;
      lastTime = time;

      // Smoothly interpolate tractor position towards mouse position (LERP)
      const dx = mousePos.current.x - tractorPos.current.x;
      const dy = mousePos.current.y - tractorPos.current.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      // Tractor speed / movement detection
      tractorSpeed.current = dist;

      if (dist > 0.5) {
        // Linear interpolation for smooth lag behind mouse
        const lerpFactor = 0.12; // smooth delay
        const stepX = dx * lerpFactor;
        const stepY = dy * lerpFactor;

        tractorPos.current.x += stepX;
        tractorPos.current.y += stepY;

        // Calculate rotation angle
        const targetAngle = Math.atan2(stepY, stepX);
        
        // Handle angle wrap-around smoothly
        let angleDiff = targetAngle - tractorAngle.current;
        while (angleDiff < -Math.PI) angleDiff += Math.PI * 2;
        while (angleDiff > Math.PI) angleDiff -= Math.PI * 2;
        
        tractorAngle.current += angleDiff * 0.18; // Smooth rotation

        // Accumulate distance for wheel rotation animation
        const stepDist = Math.sqrt(stepX * stepX + stepY * stepY);
        totalDistance.current += stepDist;

        // Leave tracks if we are moving significantly
        if (stepDist > 2) {
          trackHistory.push({
            x: tractorPos.current.x,
            y: tractorPos.current.y,
            angle: tractorAngle.current,
            opacity: 0.65,
            width: 14, // spacing between tracks
          });
        }
      }

      // Update tractor DOM element position and rotation
      const tractorEl = tractorRef.current;
      if (tractorEl && isVisible) {
        // Wiggle the cabin slightly when moving
        const wiggle = dist > 2 ? Math.sin(time * 0.05) * 1.2 : 0;

        // Convert angle to degrees
        const deg = (tractorAngle.current * 180) / Math.PI;

        // Center offset: tractor cabin is at x=14, y=20. We align that with the cursor tip.
        tractorEl.style.transform = `translate3d(${tractorPos.current.x}px, ${tractorPos.current.y}px, 0) translate(-14px, -20px) rotate(${deg}deg) translate(0, ${wiggle}px)`;
        tractorEl.style.display = "block";

        // Spin wheels based on total distance
        const backWheel = tractorEl.querySelector(".back-wheel") as HTMLElement;
        const frontWheel = tractorEl.querySelector(".front-wheel") as HTMLElement;
        if (backWheel && frontWheel) {
          const spinDeg = (totalDistance.current * 4.5) % 360;
          backWheel.style.transform = `rotate(${spinDeg}deg)`;
          frontWheel.style.transform = `rotate(${spinDeg}deg)`;
        }
      } else if (tractorEl) {
        tractorEl.style.display = "none";
      }

      // Track rendering
      ctx.clearRect(0, 0, width, height);

      // Filter and age tracks
      trackHistory = trackHistory.filter((t) => {
        t.opacity -= 0.006; // Fade speed
        return t.opacity > 0;
      });

      // Draw all active tracks with chevron patterns
      trackHistory.forEach((track) => {
        const perpAngle = track.angle + Math.PI / 2;
        const halfWidth = track.width / 2;

        // Left track center position
        const lx = track.x + Math.cos(perpAngle) * halfWidth;
        const ly = track.y + Math.sin(perpAngle) * halfWidth;

        // Right track center position
        const rx = track.x - Math.cos(perpAngle) * halfWidth;
        const ry = track.y - Math.sin(perpAngle) * halfWidth;

        ctx.strokeStyle = `rgba(107, 15, 15, ${track.opacity})`; // theme matching maroon mud color
        ctx.lineWidth = 2.2;
        ctx.setLineDash([]); // Solid chevron ticks

        const tickLength = 2.2;
        // Left wheel chevron: slanted lines
        const slantL1 = track.angle + Math.PI / 3.5;
        ctx.beginPath();
        ctx.moveTo(lx - Math.cos(slantL1) * tickLength, ly - Math.sin(slantL1) * tickLength);
        ctx.lineTo(lx + Math.cos(slantL1) * tickLength, ly + Math.sin(slantL1) * tickLength);
        ctx.stroke();

        // Right wheel chevron: slanted opposite direction
        const slantR1 = track.angle - Math.PI / 3.5;
        ctx.beginPath();
        ctx.moveTo(rx - Math.cos(slantR1) * tickLength, ry - Math.sin(slantR1) * tickLength);
        ctx.lineTo(rx + Math.cos(slantR1) * tickLength, ry + Math.sin(slantR1) * tickLength);
        ctx.stroke();
      });

      animationFrameId = requestAnimationFrame(update);
    };

    animationFrameId = requestAnimationFrame(update);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseover", handleMouseOver);
      cancelAnimationFrame(animationFrameId);
      style.remove();
    };
  }, [mounted, isVisible, isHovered]);

  if (!mounted) return null;

  return (
    <>
      {/* Background Canvas for tracks */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 w-full h-full pointer-events-none z-[9997]"
      />

      {/* Floating Tractor Cursor Wrapper */}
      <div
        ref={tractorRef}
        className="fixed top-0 left-0 w-[95px] h-[32px] pointer-events-none z-[9998] transition-opacity duration-300"
        style={{
          display: "none",
          opacity: isVisible ? 1 : 0,
          transformOrigin: "14px 20px", // Align rotation around cabin/back-wheel center
        }}
      >
        <svg
          width="95"
          height="32"
          viewBox="0 0 95 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Soft glowing headlight beam gradient */}
            <linearGradient id="headlight-beam" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FFE066" stopOpacity="0.8" />
              <stop offset="30%" stopColor="#FFE885" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#FFF2B2" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Dynamic Headlight Light Cone Beam projecting from the front of the scoop */}
          <path
            d="M48 21L92 8L92 28Z"
            fill="url(#headlight-beam)"
            style={{
              mixBlendMode: "screen",
              opacity: isHovered ? 0 : 1,
              transition: "opacity 0.25s ease-in-out",
            }}
          />

          {/* safety orange beacon base */}
          <rect x="13.5" y="7" width="2" height="2" fill="#0B1D17" />
          {/* pulsing amber safety beacon light */}
          <circle cx="14.5" cy="6" r="2.2" fill="#FF8C00" className="beacon-light" />

          {/* Traffic Stop Cone (appears on hover) */}
          <g
            style={{
              opacity: isHovered ? 1 : 0,
              transform: "translate(58px, 8px)",
              transition: "opacity 0.2s ease-in-out",
            }}
          >
            {/* Cone Base */}
            <ellipse cx="10" cy="19" rx="8" ry="1.8" fill="#1A1A1A" stroke="#0B1D17" strokeWidth="0.8" />
            {/* Orange body */}
            <path d="M 4 19 L 9 3 L 11 3 L 16 19 Z" fill="#FF4500" stroke="#0B1D17" strokeWidth="0.8" />
            {/* White stripe */}
            <path d="M 6.8 11.5 L 8.8 5 L 11.2 5 L 13.2 11.5 Z" fill="#FAF6EE" />
            <path d="M 5.8 15 L 7.8 8.5 L 12.2 8.5 L 14.2 15 Z" fill="#FF4500" />
          </g>

          {/* Tractor Cabin Frame */}
          <path
            d="M6 20L20 20L20 9L9 9L6 20Z"
            fill="#6B0F0F"
            stroke="#0B1D17"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          {/* Engine Compartment */}
          <rect
            x="20"
            y="13"
            width="12"
            height="8"
            fill="#6B0F0F"
            stroke="#0B1D17"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          {/* Window glass */}
          <path
            d="M10 11H18V18H7.5L10 11Z"
            fill="#FAF6EE"
            fillOpacity="0.85"
            stroke="#0B1D17"
            strokeWidth="1"
          />
          {/* Exhaust Chimney */}
          <line
            x1="29"
            y1="13"
            x2="29"
            y2="4"
            stroke="#0B1D17"
            strokeWidth="1.8"
          />
          <path
            d="M28.5 4.5L31 3.5"
            stroke="#0B1D17"
            strokeWidth="1.5"
          />

          {/* Sand scoop lift arm */}
          <path
            d="M22 17L38 17L42 22"
            stroke="#0B1D17"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M22 17L38 17L42 22"
            stroke="#FAF6EE"
            strokeWidth="1"
            strokeLinecap="round"
            fill="none"
          />

          {/* Sand cargo pile sitting in scoop */}
          <path
            d="M42 21C44 17 46 17 47 21L45 25L42 23Z"
            fill="#D2B48C"
            stroke="#8B5A2B"
            strokeWidth="0.5"
          />

          {/* Big Scoop bucket at the front */}
          <path
            d="M40 24L46 26L49 20L46 15L41 20Z"
            fill="#FAF6EE"
            stroke="#0B1D17"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />

          {/* Front headlight bulb / hazard warning light */}
          <circle cx="32.5" cy="17" r="1.5" fill="#FFC000" className="beacon-light" />

          {/* Large Back Wheel */}
          <g className="back-wheel" style={{ transformOrigin: "11px 22px" }}>
            <circle
              cx="11"
              cy="22"
              r="6.5"
              fill="#0B1D17"
              stroke="#6B0F0F"
              strokeWidth="1"
            />
            <circle cx="11" cy="22" r="3" fill="#FAF6EE" />
            <line x1="11" y1="16.5" x2="11" y2="27.5" stroke="#0B1D17" strokeWidth="1" />
            <line x1="5.5" y1="22" x2="16.5" y2="22" stroke="#0B1D17" strokeWidth="1" />
          </g>

          {/* Small Front Wheel */}
          <g className="front-wheel" style={{ transformOrigin: "29px 24px" }}>
            <circle
              cx="29"
              cy="24"
              r="4.5"
              fill="#0B1D17"
              stroke="#6B0F0F"
              strokeWidth="0.8"
            />
            <circle cx="29" cy="24" r="2" fill="#FAF6EE" />
            <line x1="29" y1="20" x2="29" y2="28" stroke="#0B1D17" strokeWidth="0.8" />
            <line x1="25" y1="24" x2="33" y2="24" stroke="#0B1D17" strokeWidth="0.8" />
          </g>
        </svg>
      </div>
    </>
  );
}
