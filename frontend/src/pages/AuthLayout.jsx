export default function AuthLayout({ title, children, footer }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50 px-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center mb-2">{title}</h2>
        <p className="text-center text-gray-500 text-sm mb-6">
          AI-powered agriculture platform
        </p>

        {children}

        {footer && (
          <p className="text-center text-sm text-gray-500 mt-6">
            {footer}
          </p>
        )}
      </div>
    </div>
  );
}
