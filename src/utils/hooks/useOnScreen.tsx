import { RefObject, useState, useMemo, useEffect } from "react"


export default function useOnScreen(ref: RefObject<Element | HTMLElement>, offset: number = 0) {

    const [isIntersecting, setIntersecting] = useState(false)

    const observer = new IntersectionObserver(
      ([entry]) => setIntersecting(entry.isIntersecting),
      {
        rootMargin: `${offset}% 0px ${offset}% 0px`
      }
    );


    useEffect(() => {
      ref.current && observer.observe(ref.current)
      return () => observer.disconnect()
    }, [isIntersecting, ref])

    return isIntersecting
  }