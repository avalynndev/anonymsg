"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { db } from "@/db";
import { bottle, bottleReply } from "@/schema";
import { eq } from "drizzle-orm";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { formatDate } from "@/lib/utils";
import { useSession } from "@/lib/auth-client";
import { MegaphoneIcon } from "lucide-react";
import Link from "next/link";
export default function BottleDetailPage() {
  const { id } = useParams();
  const session = useSession();
  const username = session.data?.user?.username ?? undefined;

  const [bottleData, setBottleData] = useState<any | null>(null);
  const [replies, setReplies] = useState<any[]>([]);
  const [newReply, setNewReply] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchBottle = async () => {
    setLoading(true);

    const bottleRes = await db
      .select()
      .from(bottle)
      .where(eq(bottle.id, Number(id)));

    const replyRes = await db
      .select()
      .from(bottleReply)
      .where(eq(bottleReply.bottleId, Number(id)));

    setBottleData(bottleRes[0]);
    setReplies(replyRes);
    setLoading(false);
  };

  const handleReply = async () => {
    if (!newReply.trim()) return;

    await db.insert(bottleReply).values({
      message: newReply,
      bottleId: Number(id),
      senderUsername: username,
    });

    setNewReply("");
    fetchBottle();
  };

  useEffect(() => {
    fetchBottle();
  }, [id]);

  if (loading || !bottleData)
    return (
      <div className="flex min-h-screen items-center justify-center px-4">
        <div className="animate-spin text-muted-foreground">
          <Spinner size="lg" className="bg-black dark:bg-white" />
        </div>
      </div>
    );

  return (
    <div className="max-w-2xl mx-auto p-6 pt-10 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Bottle</h1>

      <div className="rounded-lg border p-4 mb-6">
        <div className="text-sm text-muted-foreground mb-2">
          {formatDate(bottleData.createdAt)} by{" "}
          {bottleData.senderUsername ? (
            <Link
              href={`/profile/${bottleData.senderUsername}`}
              className="underline"
            >
              {bottleData.senderUsername}
            </Link>
          ) : (
            bottleData.senderName || "anonymous"
          )}
        </div>

        <div className="whitespace-pre-wrap break-words">
          {bottleData.message}
        </div>

        <Button asChild className="mt-6" variant="destructive">
          <Link
            href={`mailto:avalynndev@gmail.com?subject=Report%20Bottle%20ID%20${bottleData.id}&body=I%20would%20like%20to%20report%20the%20following%20bottle:%0A%0A${bottleData.message}`}
          >
            Report
            <MegaphoneIcon className="ml-2" />
          </Link>
        </Button>
      </div>

      <h2 className="text-lg font-semibold mb-2">Replies</h2>
      <div className="space-y-4 mb-6">
        {replies.length > 0 ? (
          replies.map((r) => (
            <div key={r.id} className="border rounded-md p-3 text-sm">
              <div className="text-xs text-muted-foreground mb-1">
                {formatDate(r.createdAt)} by {r.senderUsername || "anonymous"}
              </div>
              {r.message}
            </div>
          ))
        ) : (
          <div className="text-sm italic text-muted-foreground">
            No replies yet.
          </div>
        )}
      </div>

      <div>
        <Textarea
          value={newReply}
          onChange={(e) => setNewReply(e.target.value)}
          placeholder="Write your reply..."
          className="mb-2"
        />
        <Button onClick={handleReply}>Submit Reply</Button>
      </div>
    </div>
  );
}
