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
          <h1 className="text-3xl font-bold mb-4">
            Discover Your Perfect Weekend Getaway
          </h1>
          <p className="text-xl mb-6">
            Find your dream weekend getaway at unbeatable prices.
          </p>
        </div>
      </div>
    </div>
  );
}
