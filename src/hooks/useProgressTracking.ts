import { useState } from "react";

export function useProgressTracking() {
  const [currentProgress, setCurrentProgress] = useState(0);

  return {
    currentProgress,
    setCurrentProgress
  };
}