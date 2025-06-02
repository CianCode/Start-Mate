import Image from "next/image";

export default function Home() {
  return (
    <div>
      <h1 className="text-3xl font-bold underline">Welcome to Start Mate!</h1>
      <p className="mt-4 text-lg">
        This is a simple Next.js application with Tailwind CSS.
      </p>
      <Image
        src="/Banner.png"
        alt="Start Mate Banner"
        width={180}
        height={37}
        className="mt-6"
      />
    </div>
  );
}
