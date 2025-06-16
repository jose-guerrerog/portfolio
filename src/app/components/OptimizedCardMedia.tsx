"use client";
import { useState } from "react";
import Image from "next/image";

const OptimizedCardMedia = ({
  image,
  title,
}: {
  image: string;
  title: string;
}) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div
      className={`relative h-[350px] w-full overflow-hidden ${
        isLoaded ? "" : "bg-black/10"
      }`}
    >
      <Image
        src={image}
        alt={title}
        fill
        style={{
          objectFit: "cover",
          objectPosition: "center",
          opacity: isLoaded ? 1 : 0,
          transition: "opacity 0.3s ease-in-out",
        }}
        onLoadingComplete={() => setIsLoaded(true)}
        priority
      />
    </div>
  );
};

export default OptimizedCardMedia;
