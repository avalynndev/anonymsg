import React from "react";
import { PageLayout } from "@/components/layout";
import { db } from "@/db";
import { bottle } from "@/schema";
import { eq } from "drizzle-orm";

interface BottleLayoutProps {
  children: React.ReactNode;
  params: { id: string };
}

export async function generateMetadata({ params }: { params: { id: string } }) {
  const { id } = params;

  const [bottleData] = await db
    .select()
    .from(bottle)
    .where(eq(bottle.id, Number(id)));

  if (!bottleData) {
    return {
      title: "Bottle Not Found – Beacon in a Bottle",
      description: "This bottle does not exist or has been lost at sea.",
    };
  }

  const snippet =
    bottleData.message.length > 100
      ? bottleData.message.slice(0, 100) + "…"
      : bottleData.message;

  return {
    title: `Message from ${bottleData.senderUsername} – Beacon in a Bottle`,
    description: snippet,
    keywords: [
      "Beacon in a Bottle",
      "digital bottle",
      "message",
      bottleData.senderUsername,
    ],
  };
}

export default function BottleDetailLayout({ children, params }: BottleLayoutProps) {
  return <PageLayout>{children}</PageLayout>;
}
