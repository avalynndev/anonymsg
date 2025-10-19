"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { db } from "@/db";
import { bottle } from "@/schema";
import {
  Keerthi,
  KeerthiContent,
  KeerthiDescription,
  KeerthiFooter,
  KeerthiHeader,
  KeerthiTitle,
} from "./ui/keerthi";
import { Bottle } from "./bottle";
import { InferSelectModel } from "drizzle-orm";
import { BeaconIntroDialog } from "@/components/intro-dialog";

type BottleType = InferSelectModel<typeof bottle>;
type BottleWithMotion = BottleType & {
  topPercent: number;
  duration: number;
  delay: number;
  scale: number;
};

export function Ocean() {
  const [bubbles, setBubbles] = useState<
    Array<{
      id: number;
      left: number;
      delay: number;
      duration: number;
    }>
  >([]);
  const [isIntroOpen, setIsIntroOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [bottles, setBottles] = useState<BottleWithMotion[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [allBottles, setAllBottles] = useState<BottleWithMotion[]>([]);
  const [selectedBottle, setSelectedBottle] = useState<BottleWithMotion | null>(
    null,
  );
  const router = useRouter();

  useEffect(() => {
    const seen = localStorage.getItem("hasSeenBeaconIntro");
    if (!seen) {
      setIsIntroOpen(true);
    }
  }, []);

  const handleIntroClose = () => {
    localStorage.setItem("hasSeenBeaconIntro", "true");
    setIsIntroOpen(false);
  };

  useEffect(() => {
    const fetchBottles = async () => {
      try {
        setIsLoading(true);
        const res = await db.select().from(bottle);
        const allWithMotion = res.map((b) => ({
          ...b,
          topPercent: 65 + Math.random() * 10,
          duration: 20 + Math.random() * 20,
          delay: Math.random() * -10,
          scale: 0.7 + Math.random() * 0.5,
        }));

        setBottles(allWithMotion.slice(0, 10));
        setAllBottles(allWithMotion);
      } catch (error) {
        console.error("Failed to fetch bottles:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchBottles();
  }, []);

  const handleBottleClick = (bottleData: BottleWithMotion) => {
    setSelectedBottle(bottleData);
    setIsDialogOpen(true);
  };

  useEffect(() => {
    const newBubbles = Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 3 + Math.random() * 4,
    }));
    setBubbles(newBubbles);
  }, []);

  useEffect(() => {
    if (!bottles.length || !allBottles.length) return;

    const timers = bottles.map((bottleItem) => {
      return setTimeout(() => {
        setBottles((prev) => {
          const filtered = prev.filter((x) => x.id !== bottleItem.id);

          const remaining = allBottles.filter(
            (x) => !filtered.some((y) => y.id === x.id),
          );
          const randomNew =
            remaining.length > 0
              ? remaining[Math.floor(Math.random() * remaining.length)]
              : null;

          return randomNew ? [...filtered, randomNew] : filtered;
        });
      }, bottleItem.duration * 1000);
    });

    return () => timers.forEach(clearTimeout);
  }, [bottles, allBottles]);

  return (
    <div className="relative h-full w-full overflow-hidden bg-gradient-to-b dark:from-[#0a192f] dark:via-[#0e2433] dark:to-[#001f3f]">
      <div className="absolute inset-0 -z-20 bg-gradient-to-b from-sky-50 via-blue-50 to-cyan-50" />
      <div className="absolute top-6 right-12 w-28 h-28 rounded-full bg-gradient-to-br from-yellow-200 to-orange-300 opacity-50 blur-xl dark:from-blue-400 dark:to-indigo-500 dark:opacity-30 dark:blur-2xl" />
      <div className="absolute top-8 right-14 w-24 h-24 rounded-full bg-yellow-100 opacity-70 dark:bg-indigo-300/30 dark:opacity-40" />
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
      {isLoading && (
        <div className="absolute inset-0 z-40 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="flex flex-col items-center">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-t-transparent border-white/70 mb-3" />
            <p className="text-white/90 text-sm font-medium tracking-wide">
              Setting bottles adrift...
            </p>
          </div>
        </div>
      )}
      {!isIntroOpen && (
        <div
          className={`${
            isDialogOpen ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
        >
          {bottles.map((b) => (
            <Bottle
              key={b.id}
              topPercent={b.topPercent}
              duration={b.duration}
              delay={b.delay}
              scale={b.scale}
              onBottleClick={() => handleBottleClick(b)}
            />
          ))}
        </div>
      )}

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
      <BeaconIntroDialog open={isIntroOpen} onClose={handleIntroClose} />
      <Keerthi open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <KeerthiContent className="sm:max-w-md transition-colors bg-gradient-to-b from-sky-100 via-sky-200 to-cyan-200 dark:bg-background dark:bg-none">
          <KeerthiHeader>
            <KeerthiTitle className="text-2xl">
              Message in a Bottle 🍾
            </KeerthiTitle>
            <KeerthiDescription className="text-base pt-4">
              {selectedBottle?.message || "No message available."}
            </KeerthiDescription>
          </KeerthiHeader>
          <KeerthiFooter className="flex justify-between mt-4">
            <Button variant="secondary" onClick={() => setIsDialogOpen(false)}>
              Close
            </Button>
            <Button
              onClick={() => router.push(`/bottle/${selectedBottle?.id}`)}
            >
              View more
            </Button>
          </KeerthiFooter>
        </KeerthiContent>
      </Keerthi>
    </div>
  );
}
