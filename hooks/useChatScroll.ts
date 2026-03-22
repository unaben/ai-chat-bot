import React, { useEffect, useRef } from "react";

function useChatScroll<T>(
  messages: T,
  loading: boolean
): React.RefObject<HTMLDivElement | null> {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);
  return bottomRef;
}

export default useChatScroll;
