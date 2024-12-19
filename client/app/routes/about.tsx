import type { Route } from "./+types/about";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "About" },
    { name: "description", content: "About Page" },
  ];
}

export default function About() {
  return <div className="container mx-auto p-4">This is the about page</div>;
}