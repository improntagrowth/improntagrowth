type CtaLabelProps = {
  children: string;
};

export function CtaLabel({ children }: CtaLabelProps) {
  const label = children.replace(/\s*→$/, "");

  return (
    <>
      <span>{label}</span>
      <span className="shrink-0 text-lg leading-none" aria-hidden="true">
        →
      </span>
    </>
  );
}
