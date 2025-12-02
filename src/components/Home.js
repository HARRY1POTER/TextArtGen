import { useEffect, useState } from "react";
import ImageGenerator from "./Generator";
import Navbar from "./Navbar";
import AOS from "aos";
import "aos/dist/aos.css";
import features from "../json/features.json";
import faq from "../json/faq.json";
import ExampleImages from "./ExampleImages";

export default function ImageGeneratorPage() {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const generateImage = async () => {
    setLoading(true);
    setTimeout(() => {
      setImage("https://placehold.co/600x400?text=Generated+Image");
      setLoading(false);
    }, 2000);
  };

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div className="relative min-h-screen w-full overflow-hidden text-white">
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
      <Navbar />

      <div className="pt-28"></div>

      {/* --- HERO SECTION --- */}
      <section className="max-w-4xl mx-auto text-center py-20 px-6 ">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-6 drop-shadow-lg">
          Create Stunning AI Images From Text
        </h1>
        <p className="text-xl opacity-90">
          Describe anything — characters, worlds, art styles — and watch AI
          bring it to life.
        </p>
      </section>

      {/* --- FEATURES SECTION --- */}
      <section
        id="features"
        className="scroll-mt-32 max-w-5xl mx-auto grid md:grid-cols-2 gap-8 px-6 py-16"
      >
        {features.map((item, i) => (
          <div
            key={i}
            data-aos="fade-in"
            className="bg-white/10 backdrop-blur-xl  rounded-2xl p-6 border border-white/20 shadow-2xl"
          >
            <h2 className="text-2xl font-semibold mb-3">{item.title}</h2>
            <p className="opacity-80">{item.desc}</p>
          </div>
        ))}
      </section>

      {/* --- ABOUT SECTION --- */}
      <section className="max-w-4xl mx-auto px-6 py-16 ">
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
        className="max-w-4xl mx-auto py-16 px-6 "
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
        className="scroll-mt-32 max-w-4xl mx-auto px-6 py-16 "
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
      <ExampleImages />

      {/* --- FAQ SECTION --- */}
      <section className="max-w-4xl mx-auto px-6 py-16 ">
        <h2 className="text-3xl font-semibold mb-8 text-center">
          Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          {faq.map((item, i) => (
            <div
              key={i}
              data-aos="fade-up"
              className="bg-white/10 backdrop-blur-xl p-6 rounded-2xl border border-white/20"
            >
              <h3 className="text-xl font-bold mb-2">{item.question}</h3>
              <p className="opacity-90">{item.answer}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="text-center py-10 opacity-80 animate-fadeIn">
        © {new Date().getFullYear()} TextArtGen — All Rights Reserved
      </footer>
    </div>
  );
}
