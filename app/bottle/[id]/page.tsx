"use client";
import { useParams } from "next/navigation";
import { PageLayout } from "@/components/layout";
import BottleDetailPage from "@/components/details";

export default function Page() {
  const { id } = useParams();
  return (
    <PageLayout>
      <section className="relative h-[72vh] w-full overflow-hidden p-0 rounded-2xl border-[0.5]">
        <BottleDetailPage id={id} />
      </section>
    </PageLayout>
  );
}
