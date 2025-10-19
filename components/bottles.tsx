"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { formatDate } from "@/lib/utils";
import { CornerBottomLeftIcon, ReloadIcon } from "@radix-ui/react-icons";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useTheme } from "next-themes";

import { db } from "@/db";
import { bottle, bottleReply } from "@/schema";
import { desc } from "drizzle-orm";

type BottleReply = {
  id: number;
  bottleId: number;
  message: string;
  senderUsername: string | null;
  createdAt: Date;
};

type Bottle = {
  id: number;
  message: string;
  senderName: string | null;
  senderUsername: string | null;
  receiverUsername: string | null;
  driftTime: number;
  isDelivered: boolean;
  createdAt: Date;
  deliveredAt: Date | null;
  replies?: BottleReply[];
};

export function Bottles() {
  const router = useRouter();
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  const [bottles, setBottles] = useState<Bottle[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchBottles = async () => {
    setLoading(true);
    try {
      const allBottles = await db
        .select()
        .from(bottle)
        .orderBy(desc(bottle.createdAt));

      const allReplies = await db.select().from(bottleReply);

      const bottlesWithReplies = allBottles.map((b) => ({
        ...b,
        replies: allReplies.filter((r) => r.bottleId === b.id),
      }));

      setBottles(bottlesWithReplies);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBottles();
  }, []);

  const visibleBottles = bottles.filter((bottle) =>
    bottle.message.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 gap-2 p-4">
        <Input
          type="search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search bottles..."
          className="mb-4 w-full rounded-md text-sm"
        />
        {loading ? (
          <div className="relative flex h-[40vh] items-center justify-center">
            <ReloadIcon className="h-8 w-8 animate-spin" />
          </div>
        ) : visibleBottles.length === 0 ? (
          <div>No bottles found.</div>
        ) : (
          visibleBottles.map((bottle) => (
            <div
              key={bottle.id}
              onClick={() => router.push(`/bottle/${bottle.id}`)}
              className={`cursor-pointer transition-transform hover:-translate-y-0.5 ${
                isDark
                  ? "rounded-lg border border-border bg-card p-6 shadow-sm"
                  : "relative overflow-hidden rounded-2xl border border-blue-200/40 bg-gradient-to-br from-sky-50/70 via-sky-100/60 to-blue-200/50 shadow-[0_8px_25px_-5px_rgba(14,165,233,0.3)] backdrop-blur-md p-6 md:p-8 hover:shadow-[0_10px_30px_-5px_rgba(14,165,233,0.4)]"
              }`}
            >
              {!isDark && (
                <div className="absolute inset-0 opacity-20 bg-gradient-to-tr from-white/40 to-transparent pointer-events-none" />
              )}

              <div className="mb-3 flex items-center">
                <div>
                  <div
                    className={`font-semibold text-sm ${
                      isDark ? "text-foreground" : "text-sky-900/80"
                    }`}
                  >
                    {bottle.senderName || bottle.senderUsername || "Anonymous"}
                    {bottle.senderUsername && (
                      <span
                        className={`ml-2 text-xs ${
                          isDark ? "text-muted-foreground" : "text-sky-700/60"
                        }`}
                      >
                        @{bottle.senderUsername}
                      </span>
                    )}
                  </div>
                  <div
                    className={`mt-1 text-xs ${
                      isDark ? "text-muted-foreground" : "text-sky-800/40"
                    }`}
                  >
                    {formatDate(bottle.createdAt)}
                  </div>
                </div>

                <div className="ml-auto">
                  {bottle.isDelivered && (
                    <Badge
                      variant="secondary"
                      className={
                        isDark
                          ? "bg-muted text-foreground"
                          : "bg-blue-200/60 text-blue-800/80 border border-blue-300/40"
                      }
                    >
                      Delivered
                    </Badge>
                  )}
                </div>
              </div>

              <div
                className={`text-sm leading-relaxed whitespace-pre-wrap break-words ${
                  isDark ? "text-muted-foreground" : "text-sky-950/80"
                }`}
              >
                {bottle.message}
              </div>

              <div className="mt-4 space-y-2 text-xs">
                {bottle.replies && bottle.replies.length > 0 ? (
                  bottle.replies.map((r, index) => (
                    <div
                      key={r.id}
                      className={`flex items-start ${
                        isDark ? "text-muted-foreground" : "text-sky-700/70"
                      } ${index === 0 ? "" : "pl-5"}`}
                    >
                      {index === 0 && (
                        <CornerBottomLeftIcon className="mr-1 mt-0.5 h-4 w-4 opacity-70" />
                      )}
                      <span className="font-medium">
                        {r.senderUsername || "Anonymous"}:
                      </span>
                      <span className="ml-1">{r.message}</span>
                    </div>
                  ))
                ) : (
                  <div
                    className={`italic ${
                      isDark ? "text-muted-foreground/70" : "text-sky-700/50"
                    }`}
                  >
                    No replies yet.
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
