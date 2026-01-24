const HeroSection = () => {
  return (
    <div className="relative flex-shrink-0 w-full h-full bg-black overflow-hidden">
      
      {/* VIDEO (fills container completely) */}
      <video
        src="/lucy.mp4"
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* If you use IMAGE instead, swap above with this */}
      {/*
      <img
        src="/lucy.png"
        alt="Digital Human"
        className="absolute inset-0 w-full h-full object-cover"
      />
      */}

      {/* Optional overlay */}
      <div className="absolute inset-0 bg-black/20" />

      {/* Optional content */}
      <div className="relative z-10 h-full flex items-end p-10 text-white">
        <h1 className="text-4xl md:text-5xl font-light">
          Introducing <span className="italic">Lucy</span>
        </h1>
      </div>
    </div>
  );
};

export default HeroSection;
