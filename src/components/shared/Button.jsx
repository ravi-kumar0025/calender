import { cn } from '../../utils/cn'

const variants = {
  danger: 'control-chip control-chip--danger',
  ghost: 'control-chip control-chip--ghost',
  solid: 'control-chip control-chip--solid',
}

export function Button({
  children,
  className,
  type = 'button',
  variant = 'ghost',
  ...props
}) {
  return (
    <button
      type={type}
      className={cn(variants[variant], 'control-chip--motion', className)}
      {...props}
    >
      <span className="relative z-[1]">{children}</span>
    </button>
  )
}
