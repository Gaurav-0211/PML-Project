import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-100 flex flex-col">
      {/* Navbar */}
      <header className="flex justify-between items-center px-10 py-5 bg-white shadow-lg sticky top-0 z-50">
        <h1 className="text-3xl font-extrabold text-purple-700 tracking-wide hover:scale-105 transition">
          My Application
        </h1>
        <div className="space-x-4">
          <Link
            to="/login"
            className="px-5 py-2 border-2 border-purple-600 text-purple-600 rounded-lg font-semibold hover:bg-purple-600 hover:text-white transition duration-300 shadow-sm"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="px-5 py-2 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition duration-300 shadow-sm"
          >
            Register
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-grow flex flex-col md:flex-row items-center justify-center px-10 md:px-20 relative overflow-hidden">
        {/* Background gradient blobs */}
        <div className="absolute top-20 -left-20 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute bottom-20 -right-20 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>

        {/* Left Content */}
        <div className="md:w-1/2 text-center md:text-left mb-12 md:mb-0 z-10">
          <h2 className="text-5xl md:text-6xl font-extrabold text-gray-800 mb-6 leading-tight">
            Secure Your{" "}
            <span className="bg-gradient-to-r from-purple-500 to-blue-500 text-transparent bg-clip-text">
              Identity
            </span>{" "}
            with Us
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-lg mx-auto md:mx-0">
            A modern and secure platform to manage your account effortlessly.
            Sign up today and experience next-level authentication.
          </p>
          <div className="flex justify-center md:justify-start gap-6">
            <Link
              to="/login"
              className="px-6 py-3 border-2 border-purple-600 text-purple-600 font-semibold rounded-xl hover:bg-purple-600 hover:text-white transition duration-300 hover:scale-105 shadow-md"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="px-6 py-3 bg-purple-600 text-white font-semibold rounded-xl hover:bg-purple-700 transition duration-300 hover:scale-105 shadow-md"
            >
              Register
            </Link>
          </div>
        </div>

        {/* Right Image with Glow */}
        <div className="md:w-1/2 flex justify-center z-10 relative">
          <div className="relative">
            {/* Glow effect */}
            <div className="absolute inset-0 w-full h-full rounded-[50%] bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 blur-3xl opacity-60 animate-pulse"></div>
            {/* Image */}
            <img
              src="https://cdn-icons-png.flaticon.com/512/5087/5087579.png"
              alt="Secure Login Illustration"
              className="w-80 md:w-96 drop-shadow-lg"
            />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center py-6 border-t mt-10 bg-white shadow-inner">
        <p className="text-gray-500">
          © {new Date().getFullYear()} Secure App. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

export default Home;
