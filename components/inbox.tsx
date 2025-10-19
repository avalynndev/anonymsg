"use client";

import { useEffect, useState } from "react";
import { db } from "@/db";
import { bottle, bottleReply } from "@/schema";
import { eq, desc } from "drizzle-orm";
import { useSession } from "@/lib/auth-client";
import { ReloadIcon } from "@radix-ui/react-icons";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";

export default function Inbox() {
  const { data: session } = useSession();
  const [bottles, setBottles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!session?.user?.username) return;
    const username = session.user.username;

    const loadInbox = async () => {
      setLoading(true);
      const received = await db
        .select()
        .from(bottle)
        .where(eq(bottle.receiverUsername, username))
        .orderBy(desc(bottle.deliveredAt));

      const replies = await db.select().from(bottleReply);
      const withReplies = received.map((b) => ({
        ...b,
        replies: replies.filter((r) => r.bottleId === b.id),
      }));

      setBottles(withReplies);
      setLoading(false);
    };

    loadInbox();
  }, [session]);

  if (loading)
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <ReloadIcon className="h-8 w-8 animate-spin" />
      </div>
    );

  if (bottles.length === 0)
    return <div className="p-8 text-center text-sky-700">No bottles yet.</div>;

  return (
    <div className="grid grid-cols-1 gap-4 p-6">
      {bottles.map((bottle) => (
        <div
          key={bottle.id}
          className="relative rounded-2xl border border-sky-200/40 bg-gradient-to-br from-sky-50/80 via-sky-100/70 to-blue-200/50 shadow-[0_8px_25px_-5px_rgba(14,165,233,0.3)] p-6"
        >
          <div className="mb-2 flex items-center justify-between">
            <div className="text-sm font-medium text-sky-800">
              From {bottle.senderUsername || "Anonymous"}
            </div>
            <Badge variant="secondary" className="bg-blue-200/50">
              Delivered
            </Badge>
          </div>
          <div className="text-sky-950/80 text-sm whitespace-pre-wrap">
            {bottle.message}
          </div>
          <div className="mt-2 text-xs text-sky-600">
            {formatDate(bottle.deliveredAt)}
          </div>
        </div>
      ))}
    </div>
  );
}
