import type { Metadata } from "next";
import { Playground } from "./playground";

export const metadata: Metadata = {
  title: "Playground",
  description: "Try K Shell in a browser playground. Explore a sample workspace, write files, recall commands, and choose a terminal theme without installing anything.",
};

export default function PlaygroundPage() {
  return <main id="main-content"><Playground /></main>;
}
