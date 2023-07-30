import { RefObject, useState, useMemo, useEffect } from "react"

export default function useOnScreen(ref: RefObject<HTMLElement>) {

    const [isIntersecting, setIntersecting] = useState(false)
  
    const observer = new IntersectionObserver(
      ([entry]) => setIntersecting(entry.isIntersecting)
    );
    
  
    useEffect(() => {
      ref.current && observer.observe(ref.current)
      return () => observer.disconnect()
    }, [isIntersecting, ref])
  
    return isIntersecting
  }