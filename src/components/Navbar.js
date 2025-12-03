import React from "react";

const Navbar = () => {
  return (
    <div>
      <nav className="w-full px-6 py-5 bg-black/20 backdrop-blur-xl border-b border-white/10 fixed top-0 z-50">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold tracking-wide">
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
                window.history.pushState(null, "", "/"); // <-- updates URL
              }}
            >
              AI ImageGen
            </a>
          </h1>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6 text-lg opacity-90">
            <a href="#features" className="hover:opacity-100 transition">
              Features
            </a>
            <a href="#examples" className="hover:opacity-100 transition">
              Examples
            </a>
            <a href="#generator" className="hover:opacity-100 transition">
              Generate
            </a>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden flex flex-col gap-1.5"
            onClick={() =>
              document.getElementById("mobileMenu").classList.toggle("hidden")
            }
          >
            <span className="w-6 h-0.5 bg-white"></span>
            <span className="w-6 h-0.5 bg-white"></span>
            <span className="w-6 h-0.5 bg-white"></span>
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          id="mobileMenu"
          className="hidden md:hidden mt-4 px-4 space-y-4 text-lg opacity-95 bg-black/30 backdrop-blur-xl rounded-xl py-4 border border-white/10"
        >
          <a
            href="#features"
            className="block hover:opacity-100 transition"
            onClick={() =>
              document.getElementById("mobileMenu").classList.add("hidden")
            }
          >
            Features
          </a>
          <a
            href="#examples"
            className="block hover:opacity-100 transition"
            onClick={() =>
              document.getElementById("mobileMenu").classList.add("hidden")
            }
          >
            Examples
          </a>
          <a
            href="#generator"
            className="block hover:opacity-100 transition"
            onClick={() =>
              document.getElementById("mobileMenu").classList.add("hidden")
            }
          >
            Generate
          </a>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
