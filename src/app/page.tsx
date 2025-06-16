import HomeClient from "./components/HomeClient";

export default function Home() {
  return (
    <div className="w-full relative px-4">
      <h1 className="text-center text-3xl md:text-5xl font-bold italic mb-4 text-transparent bg-gradient-to-r from-red-400 via-blue-500 to-red-400 bg-[length:200%_auto] bg-clip-text animate-shine">
        Welcome to my Site
      </h1>

      <p className="text-center text-[#a3e4ff] text-base font-medium mb-6 tracking-wide drop-shadow-md animate-pulse">
        Click and drag to rotate the Death Star
      </p>

      <HomeClient />
    </div>
  );
}
