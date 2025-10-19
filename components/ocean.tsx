"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export function Bottle({
  topPercent,
  duration,
  delay,
  scale = 1,
  onBottleClick,
}: {
  topPercent: number;
  duration: number;
  delay: number;
  scale?: number;
  onBottleClick: () => void;
}) {
  const style: React.CSSProperties = {
    position: "absolute",
    top: `${topPercent}%`,
    transform: `scale(${scale})`,
    animation: `drift-left ${duration}s linear ${delay}s infinite`,
    zIndex: 100,
    willChange: "transform",
    cursor: "pointer",
    transition: "filter 0.2s ease",
  };
  return (
    <button
      style={style}
      className="select-none focus:outline-none rounded-lg"
      onClick={onBottleClick}
      aria-label="Click to open message in a bottle"
    >
      <svg
        width={120}
        height={72}
        viewBox="0 0 120 72"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ filter: "drop-shadow(0 6px 20px rgba(59, 130, 246, 0.4))" }}
      >
        <path d="M8 28c-3 0-6 3-6 8s3 8 6 8h32V28H8z" fill="#CD853F" />
        <path d="M8 28c-2.5 0-5 3-5 8s2.5 8 5 8h15V28H8z" fill="#CD853F" />
        <defs>
          <linearGradient
            id={`neckGrad${delay.toFixed(3)}`}
            x1="0"
            y1="0"
            x2="0"
            y2="1"
          >
            <stop offset="0%" stopColor="#E0F2FE" stopOpacity="0.95" />
            <stop offset="50%" stopColor="#BAE6FD" stopOpacity="0.88" />
            <stop offset="100%" stopColor="#7DD3FC" stopOpacity="0.92" />
          </linearGradient>
          <linearGradient
            id={`bottleGrad${delay.toFixed(3)}`}
            x1="0"
            y1="0"
            x2="1"
            y2="1"
          >
            <stop offset="0%" stopColor="#E0F2FE" stopOpacity="0.92" />
            <stop offset="25%" stopColor="#BAE6FD" stopOpacity="0.85" />
            <stop offset="50%" stopColor="#7DD3FC" stopOpacity="0.80" />
            <stop offset="75%" stopColor="#38BDF8" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#0EA5E9" stopOpacity="0.70" />
          </linearGradient>
          <radialGradient
            id={`glassShine${delay.toFixed(3)}`}
            cx="0.3"
            cy="0.3"
          >
            <stop offset="0%" stopColor="white" stopOpacity="0.9" />
            <stop offset="50%" stopColor="white" stopOpacity="0.4" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </radialGradient>
          <filter id={`innerShadow${delay.toFixed(3)}`}>
            <feGaussianBlur in="SourceAlpha" stdDeviation="3" />
            <feOffset dx="2" dy="2" result="offsetblur" />
            <feComponentTransfer>
              <feFuncA type="linear" slope="0.6" />
            </feComponentTransfer>
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id={`glassBlur${delay.toFixed(3)}`}>
            <feGaussianBlur in="SourceGraphic" stdDeviation="0.5" />
          </filter>
        </defs>
        <path
          d="M36 28v16h8V28z"
          fill={`url(#neckGrad${delay.toFixed(3)})`}
          stroke="#93C5FD"
          strokeWidth="1"
        />
        <rect
          x="44"
          y="18"
          width="70"
          height="36"
          rx="12"
          fill={`url(#bottleGrad${delay.toFixed(3)})`}
          stroke="#60A5FA"
          strokeWidth="2"
        />
        <ellipse cx="54" cy="24" rx="8" ry="4" fill="white" opacity="0.7" />
        <ellipse cx="60" cy="28" rx="14" ry="7" fill="white" opacity="0.5" />
        <g>
          <rect
            x="78"
            y="24"
            width="24"
            height="24"
            rx="2"
            fill="#FEF3C7"
            opacity="0.95"
          />
          <rect
            x="79"
            y="25"
            width="22"
            height="22"
            rx="2"
            fill="#FEF9E7"
            opacity="0.9"
          />
          <line
            x1="83"
            y1="30"
            x2="97"
            y2="30"
            stroke="#92400E"
            strokeWidth="1.2"
            opacity="0.6"
          />
          <line
            x1="83"
            y1="35"
            x2="97"
            y2="35"
            stroke="#92400E"
            strokeWidth="1.2"
            opacity="0.6"
          />
          <line
            x1="83"
            y1="40"
            x2="94"
            y2="40"
            stroke="#92400E"
            strokeWidth="1.2"
            opacity="0.6"
          />
        </g>
      </svg>
    </button>
  );
}

export default function Ocean() {
  const [bottles, setBottles] = useState<
    Array<{
      id: number;
      topPercent: number;
      duration: number;
      delay: number;
      scale: number;
    }>
  >([]);

  const [bubbles, setBubbles] = useState<
    Array<{
      id: number;
      left: number;
      delay: number;
      duration: number;
    }>
  >([]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState("");

  const messages = [
    "Hello from across the digital sea! 🌊",
    "May this message find you well, traveler.",
    "The ocean connects us all, even through screens.",
    "A beacon of hope floats eternally...",
    "Someone, somewhere, is thinking of you.",
    "The waves carry stories untold.",
    "In the vast ocean, you found me.",
    "Let kindness flow like water.",
    "Every bottle has a story to tell.",
    "May your journey be filled with wonder.",
  ];

  const handleBottleClick = () => {
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    setSelectedMessage(randomMessage);
    setIsDialogOpen(true);
  };

  useEffect(() => {
    const newBottles = Array.from({ length: 10 }).map((_, i) => {
      const row = Math.floor(Math.random() * 3);
      const topPercent = 68 + row * 5 + Math.random() * 4;
      const duration = 20 + Math.random() * 25;
      const delay = Math.random() * -duration;
      const scale = 0.65 + Math.random() * 0.7;
      return { id: i, topPercent, duration, delay, scale };
    });
    setBottles(newBottles);

    const newBubbles = Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 3 + Math.random() * 4,
    }));
    setBubbles(newBubbles);
  }, []);

  return (
    <div className="relative h-full w-full overflow-hidden bg-gradient-to-b dark:from-[#0a192f] dark:via-[#0e2433] dark:to-[#001f3f]">
      <div className="absolute inset-0 -z-20 bg-gradient-to-b from-sky-50 via-blue-50 to-cyan-50" />
      <div
        className="absolute top-6 right-12 w-28 h-28 rounded-full bg-gradient-to-br from-yellow-200 to-orange-300 opacity-50 blur-xl dark:from-blue-400 dark:to-indigo-500 dark:opacity-30 dark:blur-2xl"
      />
      <div
        className="absolute top-8 right-14 w-24 h-24 rounded-full bg-yellow-100 opacity-70 dark:bg-indigo-300/30 dark:opacity-40"
      />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-4/5 opacity-40 overflow-hidden">
        <svg
          viewBox="0 0 3200 400"
          className="w-full h-full animate-wave-distant"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <linearGradient id="distantWave" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#E0F2FE" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#BAE6FD" stopOpacity="0.5" />
            </linearGradient>
          </defs>
          <path
            fill="url(#distantWave)"
            d="M-100,120L-50,140C0,160,100,200,200,200C300,200,400,160,500,140C600,120,700,120,800,140C900,160,1000,200,1100,200C1200,200,1300,160,1400,140C1450,130,1500,130,1550,140L1600,150L1650,140C1700,130,1750,130,1800,140C1900,160,2000,200,2100,200C2200,200,2300,160,2400,140C2500,120,2600,120,2700,140C2800,160,2900,200,3000,200C3100,200,3200,160,3300,140L3350,130L3400,140L3400,400L-100,400Z"
          />
        </svg>
      </div>
      <div className="absolute inset-x-0 bottom-0 -z-5 h-3/5 opacity-60 overflow-hidden">
        <svg
          viewBox="0 0 3200 400"
          className="w-full h-full animate-wave-mid"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <linearGradient id="midWave" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#BAE6FD" stopOpacity="0.55" />
              <stop offset="100%" stopColor="#7DD3FC" stopOpacity="0.65" />
            </linearGradient>
          </defs>
          <path
            fill="url(#midWave)"
            d="M-100,160L-50,180C0,200,100,240,200,240C300,240,400,200,500,180C600,160,700,160,800,180C900,200,1000,240,1100,240C1200,240,1300,200,1400,180C1450,170,1500,170,1550,180L1600,190L1650,180C1700,170,1750,170,1800,180C1900,200,2000,240,2100,240C2200,240,2300,200,2400,180C2500,160,2600,160,2700,180C2800,200,2900,240,3000,240C3100,240,3200,200,3300,180L3350,170L3400,180L3400,400L-100,400Z"
          />
        </svg>
      </div>
      {bottles.map((b) => (
        <Bottle
          key={b.id}
          topPercent={b.topPercent}
          duration={b.duration}
          delay={b.delay}
          scale={b.scale}
          onBottleClick={handleBottleClick}
        />
      ))}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-full">
        <svg
          viewBox="0 0 3200 400"
          className="w-full absolute bottom-0"
          style={{ height: "70%", opacity: 1, zIndex: 5 }}
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <linearGradient id="wave1Grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#E0F2FE" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#BAE6FD" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#7DD3FC" stopOpacity="0.9" />
            </linearGradient>
          </defs>
          <path
            className="wave-1"
            fill="url(#wave1Grad)"
            d="M-100,200L-50,220C0,240,100,280,200,280C300,280,400,240,500,220C600,200,700,200,800,220C900,240,1000,280,1100,280C1200,280,1300,240,1400,220C1450,210,1500,210,1550,220L1600,230L1650,220C1700,210,1750,210,1800,220C1900,240,2000,280,2100,280C2200,280,2300,240,2400,220C2500,200,2600,200,2700,220C2800,240,2900,280,3000,280C3100,280,3200,240,3300,220L3350,210L3400,220L3400,400L-100,400Z"
          />
        </svg>

        <svg
          viewBox="0 0 3200 400"
          className="w-full absolute bottom-0"
          style={{ height: "65%", opacity: 0.78, zIndex: 6 }}
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <linearGradient id="wave2Grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#BAE6FD" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#38BDF8" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#0EA5E9" stopOpacity="0.9" />
            </linearGradient>
          </defs>
          <path
            className="wave-2"
            fill="url(#wave2Grad)"
            d="M-100,240L-50,230C0,220,100,200,200,210C300,220,400,260,500,270C600,280,700,260,800,250C900,240,1000,240,1100,260C1200,280,1300,260,1400,240C1450,230,1500,230,1550,240L1600,250L1650,240C1700,230,1750,230,1800,240C1900,260,2000,280,2100,270C2200,260,2300,220,2400,210C2500,200,2600,220,2700,230C2800,240,2900,240,3000,260C3100,280,3200,260,3300,240L3350,230L3400,240L3400,400L-100,400Z"
          />
        </svg>

        <svg
          viewBox="0 0 3200 400"
          className="w-full absolute bottom-0"
          style={{ height: "60%", opacity: 0.85, zIndex: 7 }}
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <linearGradient id="wave3Grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#7DD3FC" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#0EA5E9" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#0284C7" stopOpacity="0.92" />
            </linearGradient>
          </defs>
          <path
            className="wave-3"
            fill="url(#wave3Grad)"
            d="M-100,280L-50,270C0,260,100,240,200,250C300,260,400,300,500,310C600,320,700,290,800,280C900,270,1000,270,1100,290C1200,310,1300,300,1400,280C1450,270,1500,270,1550,280L1600,290L1650,280C1700,270,1750,270,1800,280C1900,300,2000,320,2100,310C2200,300,2300,260,2400,250C2500,240,2600,260,2700,270C2800,280,2900,280,3000,290C3100,310,3200,300,3300,280L3350,270L3400,280L3400,400L-100,400Z"
          />
        </svg>
      </div>
      <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-sky-600/60 via-sky-400/30 to-transparent z-30 pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 z-20 h-16 pointer-events-none">
        {bubbles.map((bubble) => (
          <div
            key={bubble.id}
            className="bubble"
            style={{
              left: `${bubble.left}%`,
              animationDelay: `${bubble.delay}s`,
              animationDuration: `${bubble.duration}s`,
            }}
          />
        ))}
      </div>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md transition-colors bg-gradient-to-b from-sky-100 via-sky-200 to-cyan-200 dark:bg-background dark:bg-none">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">
              Message in a Bottle 🍾
            </DialogTitle>
            <DialogDescription className="text-base pt-4">
              {selectedMessage}
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end mt-4">
            <Button onClick={() => setIsDialogOpen(false)}>Close</Button>
          </div>
        </DialogContent>
      </Dialog>
      <div className="wave-1 animate-wave-mid" />
      <div className="bubble" />
    </div>
  );
}
