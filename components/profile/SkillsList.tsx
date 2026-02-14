import type { UserSkill, Skill } from "@prisma/client";

type UserSkillWithSkill = UserSkill & { skill: Skill };

interface SkillsListProps {
  skills: UserSkillWithSkill[];
  userId?: string;
}

export default function SkillsList({ skills }: SkillsListProps) {
  if (skills.length === 0) return null;

  return (
    <section>
      <h2 className="text-lg font-semibold mb-3">Skills</h2>
      <ul className="flex flex-wrap gap-2">
        {skills.map((us) => (
          <li
            key={us.id}
            className="px-3 py-1 bg-gray-100 rounded-full text-sm"
          >
            {us.skill.name}
            {us.level && (
              <span className="ml-1 text-gray-500">({us.level})</span>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
