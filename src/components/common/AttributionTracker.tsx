"use client";

import { useEffect } from "react";
import { captureFirstTouchAttribution } from "@/lib/utils/attribution";

export default function AttributionTracker() {
  useEffect(() => {
    captureFirstTouchAttribution();
  }, []);

  return null;
}
