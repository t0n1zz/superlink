import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import ProfileHeader from "@/components/profile/ProfileHeader";
import SkillsList from "@/components/profile/SkillsList";
import PortfolioGrid from "@/components/profile/PortfolioGrid";
import EndorsementsSection from "@/components/profile/EndorsementsSection";

export default async function ProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const user = await prisma.user.findUnique({
    where: { id },
    include: {
      skills: { include: { skill: true } },
      portfolioItems: true,
      endorsements: {
        include: { giver: true },
        orderBy: { createdAt: "desc" },
        take: 10,
      },
    },
  });

  if (!user) notFound();

  const university =
    user.university ?
      await prisma.university.findUnique({
        where: { name: user.university },
      })
    : null;

  return (
    <div className="space-y-10">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <ProfileHeader user={user} university={university} />
      </div>
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <SkillsList skills={user.skills} userId={user.id} />
      </div>
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <PortfolioGrid items={user.portfolioItems} />
      </div>
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <EndorsementsSection receiverId={user.id} endorsements={user.endorsements} />
      </div>
    </div>
  );
}
