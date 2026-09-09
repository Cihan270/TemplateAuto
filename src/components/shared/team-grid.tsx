import Image from "next/image";
import type { TeamMember } from "@/types/review";
import { cn } from "@/lib/cn";
import { Reveal } from "@/components/shared/reveal";

type TeamGridProps = {
  members: TeamMember[];
  className?: string;
};

export function TeamGrid({ members, className }: TeamGridProps) {
  if (members.length === 0) return null;

  return (
    <ul className={cn("grid sm:grid-cols-2 lg:grid-cols-4", className)}>
      {members.map((member, index) => (
        <li key={member.id}>
          <Reveal delay={0.05 * index} className="h-full">
            <article className="group relative flex h-full min-h-[420px] flex-col overflow-hidden md:min-h-[480px]">
              <div className="absolute inset-0 bg-ink/5">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                />
              </div>

              <div
                className="absolute inset-0 bg-[linear-gradient(180deg,rgba(26,20,16,0.05)_0%,rgba(26,20,16,0.3)_50%,rgba(26,20,16,0.92)_100%)]"
                aria-hidden
              />

              <div className="relative z-10 mt-auto flex flex-col px-6 pb-8 pt-24 md:px-7 md:pb-10">
                <p className="text-xs font-medium tracking-[0.16em] text-white/55 uppercase">
                  {member.role}
                </p>
                <h3 className="mt-2 font-display text-[clamp(1.5rem,1.2vw+0.75rem,1.85rem)] leading-tight text-white">
                  {member.name}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-white/75">
                  {member.bio}
                </p>
              </div>
            </article>
          </Reveal>
        </li>
      ))}
    </ul>
  );
}
