type TechnologyTagsProps = {
  technologies: string[];
  limit?: number;
};

function TechnologyTags({ technologies, limit }: TechnologyTagsProps) {
  const visibleTechnologies =
    limit === undefined ? technologies : technologies.slice(0, limit);

  const remainingCount =
    limit === undefined ? 0 : Math.max(technologies.length - limit, 0);

  return (
    <div className="flex flex-wrap gap-1.5">
      {visibleTechnologies.map((technology) => (
        <span
          key={technology}
          className="
            rounded-md border border-accent/25
            bg-accent/8 px-2 py-1
            text-[10px] font-bold text-ink
            tag-pop
            hover:bg-accent/15
          "
        >
          {technology}
        </span>
      ))}

      {remainingCount > 0 && (
        <span className="flex items-center px-1 py-1 text-[10px] font-bold text-muted">
          +{remainingCount}
        </span>
      )}
    </div>
  );
}

export default TechnologyTags;
