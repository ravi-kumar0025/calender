import { cn } from './cn'

const buttonClassByVariant = {
  danger: 'control-chip control-chip--danger',
  ghost: 'control-chip control-chip--ghost',
  solid: 'control-chip control-chip--solid',
}

export function getButtonClassName(variant = 'ghost', className) {
  return cn(buttonClassByVariant[variant] ?? buttonClassByVariant.ghost, 'control-chip--motion', className)
}
