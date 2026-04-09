import { getButtonClassName } from '../../utils/buttonStyles'

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
      className={getButtonClassName(variant, className)}
      {...props}
    >
      <span className="relative z-[1]">{children}</span>
    </button>
  )
}
