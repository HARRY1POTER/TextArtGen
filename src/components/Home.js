import { useEffect, useState } from "react";
import ImageGenerator from "./Generator";
import Navbar from "./Navbar";
import AOS from "aos";
import "aos/dist/aos.css";

export default function ImageGeneratorPage() {
  const [prompt, setPrompt] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const generateImage = async () => {
    setLoading(true);
    setTimeout(() => {
      setImage("https://placehold.co/600x400?text=Generated+Image");
      setLoading(false);
    }, 2000);
  };

  // useEffect(() => {
  //   AOS.init({
  //     duration: 1000, // Customize as needed
  //     once: true, // Optional: makes animations only run once
  //   });

  //   // Cleanup AOS on component unmount to avoid memory leaks
  //   return () => {
  //     AOS.refresh(); // To reinitialize AOS if needed (not always necessary)
  //   };
  // }, []);
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div className="relative min-h-screen w-full overflow-hidden text-white">
      {/* --- PARALLAX BACKGROUND LAYERS --- */}
      {/* <div className="parallax-layer layer1 bg-gradient-to-br from-[#122642] to-[#5b6ab5] opacity-80"></div>
      <div className="parallax-layer layer2 bg-gradient-to-br from-[#0e1d33] to-[#7b8ac5] opacity-70"></div>  */}

      {/* --- FLOATING PARTICLES --- */}
      {[...Array(20)].map((_, i) => (
        <span
          key={i}
          className="particle"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100 + 200}px`,
            animationDelay: `${i * 0.8}s`,
          }}
        />
      ))}

      {/* --- NAVBAR --- */}
      {/* <nav className="w-full px-8 py-5 bg-black/20 backdrop-blur-xl border-b border-white/10 fixed top-0 z-50">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold tracking-wide">AI ImageGen</h1>
          <div className="space-x-6 text-lg opacity-90">
            <a href="#features" className="hover:opacity-100 transition">
              Features
            </a>
            <a href="#generator" className="hover:opacity-100 transition">
              Generate
            </a>
            <a href="#examples" className="hover:opacity-100 transition">
              Examples
            </a>
          </div>
        </div>
      </nav> */}
      <Navbar />

      <div className="pt-28"></div>

      {/* --- HERO SECTION --- */}
      <section className="max-w-4xl mx-auto text-center py-20 px-6 animate-fadeInUp">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-6 drop-shadow-lg">
          Create Stunning AI Images From Text
        </h1>
        <p className="text-xl opacity-90">
          Describe anything — characters, worlds, art styles — and watch AI
          bring it to life.
        </p>
      </section>

      {/* --- FEATURES SECTION --- */}
      {/* <section
          id="features"
          className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8 px-6 py-16"
        >
          {[
            ["⚡ Fast Results", "Generate high-quality art in seconds."],
            [
              "🎨 Endless Creativity",
              "Realistic, anime, fantasy, 3D — anything you can imagine.",
            ],
            ["🆓 Free & Simple", "No login. Just enter your prompt and create."],
            [
              "📷 High Resolution",
              "Perfect for projects, social posts, and portfolios.",
            ],
          ].map(([title, desc], i) => (
            <div
              key={i}
              style={{ animationDelay: `${i * 0.2}s` }}
              className="bg-white/10 backdrop-blur-xl animate-fadeInUp rounded-2xl p-6 border border-white/20 shadow-2xl"
            >
              <h2 className="text-2xl font-semibold mb-3">{title}</h2>
              <p className="opacity-80">{desc}</p>
            </div>
          ))}
        </section> */}

      <section
        id="features"
        className="scroll-mt-32 max-w-5xl mx-auto grid md:grid-cols-2 gap-8 px-6 py-16"
      >
        {[
          ["⚡ Fast Results", "Generate high-quality art in seconds."],
          [
            "🎨 Endless Creativity",
            "Realistic, anime, fantasy, 3D — anything you can imagine.",
          ],
          ["🆓 Free & Simple", "No login. Just enter your prompt and create."],
          [
            "📷 High Resolution",
            "Perfect for projects, social posts, and portfolios.",
          ],
          [
            "⬇️ Easy Downloads",
            "Save your generated images instantly in high quality.",
          ],
          [
            "📤 Share Anywhere",
            "Share your creations directly to social media or with friends.",
          ],
        ].map(([title, desc], i) => (
          <div
            key={i}
            data-aos="fade-in"
            style={{ animationDelay: `${i * 0.2}s` }}
            className="bg-white/10 backdrop-blur-xl animate-fadeInUp rounded-2xl p-6 border border-white/20 shadow-2xl"
          >
            <h2 className="text-2xl font-semibold mb-3">{title}</h2>
            <p className="opacity-80">{desc}</p>
          </div>
        ))}
      </section>

      {/* --- ABOUT SECTION --- */}
      <section className="max-w-4xl mx-auto px-6 py-16 animate-fadeInUp">
        <h2 className="text-3xl font-semibold mb-4">About This AI Tool</h2>
        <p className="text-lg opacity-90 leading-relaxed">
          This AI image generator transforms your text into vivid,
          high-resolution images. Whether you're designing concept art, creating
          artwork, or exploring new ideas, our next-generation model produces
          beautiful results instantly.
        </p>
      </section>

      {/* --- IMAGE GENERATOR --- */}
      {/* <section
        id="generator"
        className="max-w-4xl mx-auto py-16 px-6 animate-fadeInUp"
      >
        <h2 className="text-4xl font-bold text-center mb-10">
          Generate Your Image
        </h2>

        <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20 shadow-2xl">
          {/* Input Box * /}
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe your image..."
            className="w-full bg-white/20 border border-white/30 p-4 rounded-xl text-white placeholder-white/60 focus:ring-2 ring-white/40"
          />

          {/* Generate Button with Spark Animation * /}
          <button
            onClick={generateImage}
            disabled={loading}
            className="btn-spark w-full mt-4 py-3 bg-white/20 border border-white/30 rounded-xl hover:bg-white/30 transition disabled:opacity-50"
          >
            {loading ? "Generating..." : "Generate Image"}
          </button>

          {/* Result * /}
          {image && (
            <div className="mt-6 animate-fadeIn">
              <img
                src={image}
                className="rounded-xl border border-white/20 shadow-xl mx-auto"
                alt="Generated"
              />
            </div>
          )}
        </div>
      </section> */}
      <span id="generator" className="scroll-mt-32">
        <ImageGenerator />
      </span>

      {/* --- EXAMPLES SECTION --- */}
      <section
        id="examples"
        className="scroll-mt-32 max-w-4xl mx-auto px-6 py-16 animate-fadeInUp"
      >
        <h2 className="text-3xl font-semibold mb-6">Try These Prompts</h2>
        <ul className="space-y-3 text-lg opacity-95">
          <li>• Futuristic cyberpunk city glowing with neon lights</li>
          <li>• Ultra-realistic portrait of a samurai princess</li>
          <li>• Cozy anime-style bedroom interior</li>
          <li>• Majestic dragon flying over mountains</li>
        </ul>
      </section>

      {/* --- SAMPLE IMAGE PREVIEW SECTION --- */}
      <section
        id="example-images"
        className="max-w-5xl mx-auto px-6 pb-20 animate-fadeInUp"
      >
        <h3 className="text-2xl font-semibold mb-6">Example AI Art</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            "https://placehold.co/600x400?text=Cyberpunk+View",
            "https://placehold.co/600x400?text=Samurai+Portrait",
            "https://placehold.co/600x400?text=Anime+Room",
            "https://placehold.co/600x400?text=Dragon+Sky",
            "https://placehold.co/600x400?text=Fantasy+Landscape",
            "https://placehold.co/600x400?text=SciFi+Character",
          ].map((img, i) => (
            <div
              key={i}
              data-aos="fade-in"
              className="bg-white/10 backdrop-blur-xl rounded-2xl p-3 border border-white/20 shadow-xl hover:scale-[1.03] transition-transform duration-300"
            >
              <img
                src={img}
                className="rounded-xl w-full h-auto"
                alt="Example Art"
              />
            </div>
          ))}
        </div>
      </section>

      {/* --- SAMPLE IMAGES SECTION --- */}
      {/* <section
        id="sample-images"
        className="max-w-5xl mx-auto px-6 py-16 animate-fadeInUp"
      >
        <h2 className="text-3xl font-semibold mb-6">Sample Generated Images</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-3 border border-white/20 shadow-xl">
            <img
              src="https://placehold.co/600x400?text=Cyberpunk+City"
              alt="Sample 1"
              className="rounded-xl"
            />
            <p className="mt-3 opacity-90 text-center">
              Futuristic cyberpunk city with neon lights
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-3 border border-white/20 shadow-xl">
            <img
              src="https://placehold.co/600x400?text=Samurai+Princess"
              alt="Sample 2"
              className="rounded-xl"
            />
            <p className="mt-3 opacity-90 text-center">
              Ultra-realistic portrait of a samurai princess
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-3 border border-white/20 shadow-xl">
            <img
              src="https://placehold.co/600x400?text=Anime+Bedroom"
              alt="Sample 3"
              className="rounded-xl"
            />
            <p className="mt-3 opacity-90 text-center">
              Cozy anime-style bedroom interior
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-3 border border-white/20 shadow-xl">
            <img
              src="https://placehold.co/600x400?text=Dragon+Mountains"
              alt="Sample 4"
              className="rounded-xl"
            />
            <p className="mt-3 opacity-90 text-center">
              Majestic dragon flying over mountains
            </p>
          </div>
        </div>
      </section> */}

      {/* --- FAQ SECTION --- */}
      <section className="max-w-4xl mx-auto px-6 py-16 animate-fadeInUp">
        <h2 className="text-3xl font-semibold mb-8 text-center">
          Frequently Asked Questions
        </h2>

        <div className="space-y-6">
          <div className="bg-white/10 backdrop-blur-xl p-6 rounded-2xl border border-white/20">
            <h3 className="text-xl font-bold mb-2">
              Is this tool free to use?
            </h3>
            <p className="opacity-90">
              Yes! You can generate unlimited images at no cost.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-xl p-6 rounded-2xl border border-white/20">
            <h3 className="text-xl font-bold mb-2">
              What kind of prompts work best?
            </h3>
            <p className="opacity-90">
              Detailed descriptions work best — include style, colors, lighting,
              and mood to get the best results.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-xl p-6 rounded-2xl border border-white/20">
            <h3 className="text-xl font-bold mb-2">
              Can I use these images commercially?
            </h3>
            <p className="opacity-90">
              Yes! All generated images are yours to use for personal or
              commercial projects.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-xl p-6 rounded-2xl border border-white/20">
            <h3 className="text-xl font-bold mb-2">
              How long does image generation take?
            </h3>
            <p className="opacity-90">
              Typically just a few seconds. If the server is busy, it may take a
              bit longer.
            </p>
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      {/* <footer className="text-center py-10 opacity-80 animate-fadeIn">
        © 2025 TextArtGen — All Rights Reserved
      </footer> */}

      <footer className="text-center py-10 opacity-80 animate-fadeIn">
        © {new Date().getFullYear()} TextArtGen — All Rights Reserved
      </footer>
    </div>
  );
}
