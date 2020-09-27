import { useEffect, useRef } from "react";

export default function useMountRef() {
  const ref = useRef<boolean>(true);

  useEffect(() => {
    return () => {
      ref.current = false;
    }
  }, [])

  return ref
}
