import { HERO_ART } from '../data/heroArt'

export function getCoverArt(monthDate, image) {
  const defaultArt = HERO_ART[monthDate.getMonth()]

  if (!image) {
    return defaultArt
  }

  return {
    url: image,
    eyebrow: 'Custom Artwork',
    caption: 'Your uploaded image fits automatically into the calendar layout.',
  }
}

export function getThemeStyle(hue) {
  return {
    '--calendar-hue': hue,
    '--accent': `hsl(${hue} 76% 53%)`,
    '--accent-soft': `hsl(${hue} 88% 95%)`,
    '--accent-deep': `hsl(${hue} 56% 24%)`,
    '--slider-start': `hsl(${hue} 96% 56%)`,
    '--slider-mid': `hsl(${(hue + 26) % 360} 96% 74%)`,
    '--slider-end': `hsl(${(hue + 54) % 360} 92% 94%)`,
    '--slider-glow': `hsl(${(hue + 12) % 360} 100% 66%)`,
  }
}

export function getSheetClass(direction) {
  const animationClass =
    direction > 0 ? 'animate-swing-in-right' : 'animate-swing-in-left'

  return `paper-sheet relative overflow-hidden ${animationClass}`
}

export function getHeroClass(direction) {
  return direction > 0 ? 'animate-swing-hero-right' : 'animate-swing-hero-left'
}
