import { useEffect, useRef } from "react";

export default function GuideVideo({ src, type = "video/mp4" }: { src: string; type: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const video = videoRef.current;
          if (video) {
            video.src = src;
            observer.disconnect();
          }
        }
      },
      {
        rootMargin: "100px",
      },
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <video className="mx-auto w-full aspect-auto" autoPlay loop muted playsInline ref={videoRef}>
      <source type={type} />
    </video>
  );
}
