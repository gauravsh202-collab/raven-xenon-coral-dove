import { createFileRoute } from "@tanstack/react-router";
import { GomarchApp } from "@/components/gomarch/app";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return <GomarchApp />;
}
