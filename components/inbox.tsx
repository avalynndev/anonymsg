"use client";

import { useEffect, useState } from "react";
import { db } from "@/db";
import { bottle, bottleReply } from "@/schema";
import { eq, desc } from "drizzle-orm";
import { useSession } from "@/lib/auth-client";
import { ReloadIcon } from "@radix-ui/react-icons";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";

export default function Inbox() {
  const { data: session } = useSession();
  const [bottles, setBottles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { resolvedTheme } = useTheme();
  const router = useRouter();
  const isDark = resolvedTheme === "dark";

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
          onClick={() => router.push(`/bottle/${bottle.id}`)}
          className={`cursor-pointer transition-transform hover:-translate-y-0.5 ${
            isDark
              ? "rounded-lg border border-border bg-card p-6 shadow-sm"
              : "relative rounded-2xl border border-sky-200/40 bg-gradient-to-br from-sky-50/80 via-sky-100/70 to-blue-200/50 shadow-[0_8px_25px_-5px_rgba(14,165,233,0.3)] p-6"
          }`}
        >
          <div className="mb-2 flex items-center justify-between">
            <div
              className={`text-sm font-medium ${
                isDark ? "text-foreground" : "text-sky-800"
              }`}
            >
              From {bottle.senderUsername || "Anonymous"}
            </div>
            <Badge
              variant="secondary"
              className={
                isDark
                  ? "bg-muted text-foreground"
                  : "bg-blue-200/50 text-sky-900"
              }
            >
              Delivered
            </Badge>
          </div>
          <div
            className={`text-sm whitespace-pre-wrap ${
              isDark ? "text-muted-foreground" : "text-sky-950/80"
            }`}
          >
            {bottle.message}
          </div>
          <div
            className={`mt-2 text-xs ${
              isDark ? "text-muted-foreground" : "text-sky-600"
            }`}
          >
            {formatDate(bottle.deliveredAt)}
          </div>
        </div>
      ))}
    </div>
  );
}
