"use client";
import { useRef, useState, useEffect } from "react";
import { Volume2, VolumeX } from "lucide-react";

export default function AudioControl() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const audio = new Audio("/audio.mp3");
    audio.loop = true;
    audio.volume = 0.4;
    audio.preload = "auto";
    audioRef.current = audio;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const handleToggle = async () => {
    if (!audioRef.current) return;

    try {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        await audioRef.current.play();
        setIsPlaying(true);
      }
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