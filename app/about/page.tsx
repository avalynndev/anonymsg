"use client";

import React from "react";
import PageLayout from "@/components/layout";

export default function AboutPage() {
  return (
    <PageLayout>
      {/** AI GENERATED POEM */}
      <section className="relative w-full px-6 py-24 rounded-2xl border-[0.5] text-center leading-relaxed">
        <div className=" max-w-screen-sm mx-auto">
          <h1 className="text-5xl font-semibold mb-10 tracking-tight bg-gradient-to-r from-sky-400 via-cyan-300 to-teal-400 bg-clip-text text-transparent">
            About Beacon in a Bottle
          </h1>

          <p className="text-lg  mb-10">
            In a world filled with endless static, <br />
            <strong>Beacon in a Bottle</strong> began as a whisper —
            <br />
            a belief that even the faintest signal <br />
            deserves to be heard.
          </p>

          <p className="text-lg  mb-10">
            Like bottles once cast across the sea, <br />
            our messages drift through <br />
            digital tides of emotion. <br />
            Each one a fragment of thought, <br />
            searching for hearts that still listen.
          </p>

          <p className="text-lg mb-10">
            Here, Signal finds its soul — <br />
            not in code, nor in cables, <br />
            but in the quiet act of reaching out. <br />
            Every message a heartbeat, <br />
            every connection a spark in the dark.
          </p>

          <div className="text-2xl font-medium italic">
            <p>Every bottle carries a light.</p>
            <p>Every signal, a soul.</p>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
