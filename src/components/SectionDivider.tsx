export default function SectionDivider() {
  return (
    <div className="relative py-2">
      <div className="h-px w-full bg-soft-grey" />
      <div className="absolute left-1/2 top-1/2 h-0.5 w-10 -translate-x-1/2 -translate-y-1/2 bg-brand" />
    </div>
  );
}
