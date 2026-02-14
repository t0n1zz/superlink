import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import ProfileHeader from "@/components/profile/ProfileHeader";
import SkillsList from "@/components/profile/SkillsList";
import PortfolioGrid from "@/components/profile/PortfolioGrid";
import EndorsementsList from "@/components/profile/EndorsementsList";

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

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <ProfileHeader user={user} />
      <SkillsList skills={user.skills} userId={user.id} />
      <PortfolioGrid items={user.portfolioItems} />
      <EndorsementsList endorsements={user.endorsements} />
    </div>
  );
}
