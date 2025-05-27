"use client";
import { useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

export default function AudioControl() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleToggle = async () => {
    // Create the audio element only on first interaction
    if (!audioRef.current) {
      const audio = new Audio("/audio.mp3");
      audio.loop = true;
      audio.volume = 0.4;
      audioRef.current = audio;
    }

    try {
      if (isPlaying) {
        await audioRef.current?.pause();
      } else {
        await audioRef.current?.play();
      }
      setIsPlaying(!isPlaying);
    } catch (err) {
      console.warn("Audio playback failed:", err);
    }
  };

  return (
    <div
      style={{
        position: "absolute",
        top: 60,
        right: 50,
        zIndex: 100,
        cursor: "pointer",
      }}
      onClick={handleToggle}
      title={isPlaying ? "Mute music" : "Play music"}
    >
      {isPlaying ? (
        <Volume2 size={55} color="#fff" strokeWidth={1.5} />
      ) : (
        <VolumeX size={55} color="#fff" strokeWidth={1.5} />
      )}
    </div>
  );
}