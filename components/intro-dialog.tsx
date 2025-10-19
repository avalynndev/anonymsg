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
import { X } from "lucide-react";

interface BeaconIntroDialogProps {
  open?: boolean; 
  onClose?: () => void;
}

export function BeaconIntroDialog({ open, onClose }: BeaconIntroDialogProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (open === undefined) {
      const hasSeenIntro = localStorage.getItem("hasSeenBeaconIntro");
      if (!hasSeenIntro) setIsOpen(true);
    } else {
      setIsOpen(open);
    }
  }, [open]);

  const handleClose = () => {
    setIsOpen(false);
    localStorage.setItem("hasSeenBeaconIntro", "true");
    onClose?.(); 
  };

  return (
    <Keerthi open={isOpen} onOpenChange={setIsOpen}>
      <KeerthiContent className="sm:max-w-[480px]">
        <KeerthiHeader>
          <KeerthiTitle>Welcome to Beacon in a Bottle 🌊</KeerthiTitle>
          <KeerthiDescription>
            <span>
              <strong>Beacon in a Bottle</strong> takes inspiration from{" "}
              <strong>Signal</strong> — both focus on connection, but here it’s
              between strangers instead of contacts.
            </span>
            <br />
            <br />
            <span>
              Each message you send becomes a bottle drifting through the
              digital ocean, waiting for someone unexpected to find it.
            </span>
            <br />
            <br />
            <span>
              You can discover bottles from others, reply if you want, or just
              let them float away. Every interaction is a quiet signal reaching
              across the world.
            </span>
            <br />
            <br />
            <span>
              📜 <strong>Pages in the Site</strong>
            </span>
          </KeerthiDescription>
          <ul className="list-disc pl-6 mt-1 space-y-1 text-muted-foreground text-sm">
            <li>
              <strong>Home</strong> – Watch bottles drift and catch one to read
              or reply.
            </li>
            <li>
              <strong>Discover</strong> – Explore bottles shared by others
              around the world.
            </li>
            <li>
              <strong>Inbox</strong> – Find bottles you’ve received or replied
              to.
            </li>
            <li>
              <strong>Each Bottle Page</strong> – Read a single bottle’s full
              message.
            </li>
            <li>
              <strong>Profile</strong> – View your activity and personalize your
              space.
            </li>
            <li>
              <strong>Settings</strong> – Control privacy, themes, and
              preferences.
            </li>
            <li>
              <strong>About</strong> – Learn how Beacon connects people through
              digital signals.
            </li>
          </ul>
        </KeerthiHeader>

        <KeerthiFooter className="flex justify-between">
          <KeerthiClose asChild>
            <Button className="flex-1 mr-2" onClick={handleClose}>
              Let’s Begin
            </Button>
          </KeerthiClose>
          <KeerthiClose asChild>
            <Button size="icon" onClick={handleClose}>
              <X />
            </Button>
          </KeerthiClose>
        </KeerthiFooter>
      </KeerthiContent>
    </Keerthi>
  );
}
