import { useEffect, useId } from 'react'
import Granim from 'granim'
import { buildGradientSets } from '../../utils/calendar'

export function AnimatedGradientCanvas({ hue }) {
  const rawId = useId()
  const canvasId = `granim-${rawId.replace(/:/g, '')}`

  useEffect(() => {
    const granimInstance = new Granim({
      element: `#${canvasId}`,
      direction: 'diagonal',
      isPausedWhenNotInView: false,
      opacity: [1, 1],
      states: {
        'default-state': {
          gradients: buildGradientSets(hue),
          transitionSpeed: 3200,
        },
      },
    })

    return () => {
      granimInstance.destroy()
    }
  }, [canvasId, hue])

  return (
    <canvas
      id={canvasId}
      className="absolute inset-0 -z-20 h-full w-full"
      aria-hidden="true"
    />
  )
}
