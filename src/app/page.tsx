import HomeClient from "./components/HomeClient";

export default function Home() {
  return (
    <div className="w-full relative px-4">
      <div className="w-full max-w-4xl mx-auto text-center pt-2">
        <h1 className="text-4xl md:text-6xl font-semibold italic mb-4 bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 text-transparent bg-clip-text animate-shine drop-shadow-md tracking-tight">
          Welcome to my Site
        </h1>

        <p className="text-sky-200 text-lg md:text-xl font-medium mb-8 tracking-wide drop-shadow-sm">
          Click and drag to rotate the Death Star
        </p>
      </div>

      <HomeClient />
    </div>
  );
}
