"use client";

import React, { useEffect, useState } from "react";
import {
  Keerthi,
  KeerthiContent,
  KeerthiHeader,
  KeerthiTitle,
  KeerthiDescription,
  KeerthiFooter,
  KeerthiClose,
} from "@/components/ui/keerthi";
import { Button } from "@/components/ui/button";

export function BeaconIntroDialog() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const hasSeenIntro = localStorage.getItem("hasSeenBeaconIntro");
    if (!hasSeenIntro) setOpen(true);
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Keerthi open={open} onOpenChange={setOpen}>
      <KeerthiContent className="sm:max-w-[480px]">
        <KeerthiHeader>
          <KeerthiTitle>Welcome to Beacon in a Bottle 🌊</KeerthiTitle>
          <KeerthiDescription>
            <p className="mb-3">
              <strong>Beacon in a Bottle</strong> is a digital experiment
              inspired by <strong>Signal</strong> — both focus on privacy and
              authentic connection. While Signal protects conversations between
              people who know each other, Beacon connects strangers anonymously.
            </p>

            <p className="mb-3">
              Every message you send becomes a <em>bottle</em> drifting in the
              digital ocean — waiting to reach someone else, somewhere in the
              world. You can read bottles from others, reply if you wish, or let
              them drift away.
            </p>

            <div className="mt-4 space-y-1">
              <p>
                📜 <strong>Pages Overview</strong>
              </p>
              <ul className="list-disc pl-5 text-sm">
                <li>
                  <strong>Home</strong> – Watch bottles drift and catch one to
                  read or reply.
                </li>
                <li>
                  <strong>Send a Bottle</strong> – Write your message and
                  release it into the sea.
                </li>
                <li>
                  <strong>Inbox</strong> – View bottles that reached you or ones
                  you’ve replied to.
                </li>
                <li>
                  <strong>Profile</strong> – Manage your account, theme, and
                  privacy settings.
                </li>
              </ul>
            </div>
          </KeerthiDescription>
        </KeerthiHeader>

        <KeerthiFooter>
          <KeerthiClose asChild>
            <Button className="w-full" onClick={handleClose}>
              Let’s Begin
            </Button>
          </KeerthiClose>
        </KeerthiFooter>
      </KeerthiContent>
    </Keerthi>
  );
}
