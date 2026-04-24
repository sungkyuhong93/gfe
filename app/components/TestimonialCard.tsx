import Image from "next/image";

type Testimonial = {
  name: string;
  username: string;
  quote: string;
  avatarSrc: string;
  avatarAlt: string;
};

export function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <article
      className="testimonial-card max-w-[340px] bg-surface mx-auto rounded-[8px] mt-[200px] p-6 ring-1 ring-black/5"
    >
      <figure className="flex flex-col gap-4">
        <figcaption className="flex items-center gap-4">
          <Image
            src={testimonial.avatarSrc}
            alt={testimonial.avatarAlt}
            width={48}
            height={48}
            className="h-12 w-12 rounded-full object-cover"
            priority
          />
          <div className="min-w-0">
            <div className="text-lg font-semibold text-ink-primary truncate [overflow-wrap:anywhere]">
              {testimonial.name}
            </div>
            <div className="text-sm text-ink-secondary truncate [overflow-wrap:anywhere]">
              {testimonial.username}
            </div>
          </div>
        </figcaption>

        <blockquote className="text-base text-ink-secondary text-pretty">
          <p className="break-words [overflow-wrap:anywhere]">"{testimonial.quote}"</p>
        </blockquote>
      </figure>
    </article>
  );
}