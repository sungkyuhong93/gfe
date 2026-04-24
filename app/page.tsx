import { TestimonialCard } from "./components/TestimonialCard";

export default function Home() {
  return (
    <main className="w-full min-h-screen px-gutter-mobile tablet:px-gutter-tablet">
      <TestimonialCard
        testimonial={{
          name: "Sarah Dole",
          username: "@sarahdole",
          quote:
            "I’ve been searching for high-quality abstract images for my design projects, and I’m thrilled to have found this platform. The variety and depth of creativity are outstanding!",
          avatarSrc: "/profile-thumbnail.png",
          avatarAlt: "Sarah Dole",
        }}
      />
    </main>
  );
}
