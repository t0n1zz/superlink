import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Seed default skills so directory/search can filter by skill
  const defaultSkills = [
    { name: "Solana", category: "Development" },
    { name: "React", category: "Development" },
    { name: "TypeScript", category: "Development" },
    { name: "Smart Contracts", category: "Development" },
    { name: "UI/UX Design", category: "Design" },
  ];

  for (const skill of defaultSkills) {
    await prisma.skill.upsert({
      where: { name: skill.name },
      create: skill,
      update: { category: skill.category },
    });
  }

  // Seed sample universities (Indonesia)
  const universities = [
    { name: "Universitas Indonesia", city: "Depok", province: "Jawa Barat" },
    { name: "Institut Teknologi Bandung", city: "Bandung", province: "Jawa Barat" },
    { name: "Universitas Gadjah Mada", city: "Yogyakarta", province: "DI Yogyakarta" },
  ];
  for (const u of universities) {
    await prisma.university.upsert({
      where: { name: u.name },
      create: u,
      update: { city: u.city, province: u.province },
    });
  }

  console.log("Seed completed: default skills and universities created.");
}

main()
  .catch((e) => {
    console.error("Seed failed:", e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
