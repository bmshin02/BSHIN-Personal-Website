import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent,
  type RefObject,
} from "react";

type Offset = { x: number; y: number };

type DragStart = {
  pointerX: number;
  pointerY: number;
  offset: Offset;
  /* How far the window may move in each direction and stay inside the bounds. */
  min: Offset;
  max: Offset;
};

/* Gap kept between a window and the edge of the bounds. */
const EDGE = 8;

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

/*
 * Lets a window be dragged by its title bar, staying inside `boundsRef`.
 * Spread `handleProps` on the title bar and `windowProps` on the element
 * that moves. Double-clicking the title bar puts the window back.
 * The position resets when the browser window is resized.
 */
export function useDraggable(boundsRef: RefObject<HTMLElement | null>) {
  const windowRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<DragStart | null>(null);
  const [offset, setOffset] = useState<Offset>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const reset = () => setOffset({ x: 0, y: 0 });
    window.addEventListener("resize", reset);
    return () => window.removeEventListener("resize", reset);
  }, []);

  const onPointerDown = (event: PointerEvent<HTMLElement>) => {
    const target = event.target as HTMLElement;

    /* Left button or touch only, and never when pressing a link or button. */
    if (event.button !== 0 || target.closest("a, button")) {
      return;
    }

    const windowEl = windowRef.current;
    const boundsEl = boundsRef.current;

    if (!windowEl || !boundsEl) {
      return;
    }

    const box = windowEl.getBoundingClientRect();
    const bounds = boundsEl.getBoundingClientRect();

    dragRef.current = {
      pointerX: event.clientX,
      pointerY: event.clientY,
      offset,
      min: {
        x: offset.x - (box.left - bounds.left - EDGE),
        y: offset.y - (box.top - bounds.top - EDGE),
      },
      max: {
        x: offset.x + (bounds.right - box.right - EDGE),
        y: offset.y + (bounds.bottom - box.bottom - EDGE),
      },
    };

    event.currentTarget.setPointerCapture(event.pointerId);
    event.preventDefault();
    setIsDragging(true);
  };

  const onPointerMove = (event: PointerEvent<HTMLElement>) => {
    const drag = dragRef.current;

    if (!drag) {
      return;
    }

    setOffset({
      x: clamp(drag.offset.x + event.clientX - drag.pointerX, drag.min.x, drag.max.x),
      y: clamp(drag.offset.y + event.clientY - drag.pointerY, drag.min.y, drag.max.y),
    });
  };

  const endDrag = () => {
    dragRef.current = null;
    setIsDragging(false);
  };

  const style: CSSProperties = {
    transform: `translate3d(${offset.x}px, ${offset.y}px, 0)`,
  };

  return {
    isDragging,
    windowProps: { ref: windowRef, style },
    handleProps: {
      onPointerDown,
      onPointerMove,
      onPointerUp: endDrag,
      onPointerCancel: endDrag,
      onDoubleClick: () => setOffset({ x: 0, y: 0 }),
      title: "Drag to move, double-click to reset",
      className: `touch-none select-none ${isDragging ? "cursor-grabbing" : "cursor-grab"}`,
    },
  };
}
