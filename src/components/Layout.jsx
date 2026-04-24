export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50 flex justify-center">
      
      {/* Main App Container */}
      <div className="w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-3xl">
        {children}
      </div>

    </div>
  );
}