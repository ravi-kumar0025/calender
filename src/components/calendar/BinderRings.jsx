export function BinderRings() {
  return (
    <div className="pointer-events-none absolute left-1/2 top-[-0.8rem] flex -translate-x-1/2 gap-4 sm:gap-8">
      {Array.from({ length: 5 }).map((_, index) => (
        <span key={index} className="binder-ring" />
      ))}
    </div>
  )
}
