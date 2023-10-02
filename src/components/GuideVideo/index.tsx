import { useEffect, useRef } from "react";

export default function GuideVideo({ src, type = "video/mp4" }: { src: string; type: string }) {
  const videoRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const video = videoRef.current;
          video.src = src;
          observer.disconnect();
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
    <video autoPlay loop muted playsInline ref={videoRef}>
      <source type={type} />
    </video>
  );
}
