type WinnerBadgeProps = {
  compact?: boolean;
};

function WinnerBadge({ compact = false }: WinnerBadgeProps) {
  return (
    <span
      className={`
        border font-bold uppercase tracking-wide
        border-yellow-950 bg-yellow-300 text-yellow-950
        ${compact ? "px-2 py-0.5 text-[9px]" : "px-2 py-1 text-[10px]"}
      `}
    >
      ★ Winner
    </span>
  );
}

export default WinnerBadge;
