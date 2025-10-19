import React from "react";
import { PageLayout } from "@/components/layout";
import Inbox from "@/components/inbox";

export const metadata = {
  title: "Beacon in a Bottle",
};

export default function Page() {
  return (
    <PageLayout>
      <section className="relative h-[72vh] w-full overflow-hidden p-0 rounded-2xl border-[0.5]">
        <Inbox />
      </section>
    </PageLayout>
  );
}
