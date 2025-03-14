export const AuthHero = () => {
  return (
    <div className="w-full md:w-1/2 hidden md:block bg-black relative overflow-hidden">
      <img
        src="https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3"
        alt="Festival"
        className="w-full h-full object-cover opacity-85"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/20 flex flex-col justify-end p-8">
        <h1 className="text-4xl font-bold text-white mb-2">GiggleFest</h1>
        <p className="text-white/90 text-lg">
          Your gateway to unforgettable festival experiences!
        </p>
      </div>
    </div>
  );
};
