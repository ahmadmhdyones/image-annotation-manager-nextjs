import { useState, useEffect, RefObject } from 'react';

import { Size } from '@/types/canvas.types';

// ----------------------------------------------------------------------

export function useElementSize(ref: RefObject<HTMLElement | null>): Size {
  const [size, setSize] = useState<Size>({ height: 0, width: 0 });

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const updateSize = () => {
      const newHeight = element.clientHeight;
      const newWidth = element.clientWidth;

      // Only update if the size actually changed
      if (size.height !== newHeight || size.width !== newWidth) {
        setSize({
          height: newHeight,
          width: newWidth,
        });
      }
    };

    // Initial size
    updateSize();

    const resizeObserver = new ResizeObserver(updateSize);
    resizeObserver.observe(element);

    return () => {
      if (element) {
        resizeObserver.unobserve(element);
      }
    };
  }, [ref, size]);

  return size;
}
