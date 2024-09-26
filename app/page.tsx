import TypingAnimation from "@/components/magicui/typing-animation";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="relative w-[100vw] h-[100vh] overflow-hidden">
      <video
        src="/ocean.mp4"
        muted
        autoPlay
        loop
        className="absolute top-0 left-0 w-full h-full object-cover"
      />
      <div className="absolute top-0 left-0 flex items-center justify-center w-full h-full bg-black bg-opacity-50">
        <div className="text-center text-white">
          <TypingAnimation
            className="text-3xl font-bold mb-4"
            text="Discover Your Perfect Weekend Getaway"
            duration={50}
          />
          <p className="text-xl mb-6">
            Find your dream weekend getaway at unbeatable prices.
          </p>
          <Link href="/about-us">
            <Button>Look for Your Favorite Destination</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
