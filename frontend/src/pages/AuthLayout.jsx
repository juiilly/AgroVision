export default function AuthLayout({ title, children, footer }) {
  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center px-4"
      style={{
        backgroundImage:
          "linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=1950&q=80')",
      }}
    >
      <div className="bg-white/95 backdrop-blur-md p-8 rounded-2xl shadow-xl w-full max-w-md">
        
        <h2 className="text-3xl font-bold text-center text-green-700 mb-6">
          {title}
        </h2>

        {children}

        {footer && (
          <p className="text-sm text-center text-gray-600 mt-6">
            {footer}
          </p>
        )}
      </div>
    </div>
  );
}
