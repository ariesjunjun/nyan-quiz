"use client";

import { useEffect, useState } from "react";
import SNSShareButtons from "./SNSShareButtons";

export default function SNSShareWrapper({ title }) {
  const [url, setUrl] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setUrl(window.location.href);
    }
  }, []);

  if (!url) return null;

  return <SNSShareButtons url={url} title={title} />;
}
