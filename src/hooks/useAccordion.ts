import { useState, useRef, useEffect } from "react";

export function useAccordion() {
  const [open, setOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState("0px");

  useEffect(() => {
    setHeight(open ? `${contentRef.current?.scrollHeight}px` : "0px");
  }, [open]);

  const toggle = () => setOpen(!open);

  return { open, toggle, contentRef, height };
}
