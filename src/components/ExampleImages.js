import React, { useState } from "react";

const images = [
  "/example-images/generated_imag.png",
  "/example-images/generated_image.png",
  "/example-images/generated_pentagon.png",
  "/example-images/generated_images.png",
  "/example-images/generated_img.png",
  "/example-images/generated.png",
  "/example-images/square_image.png",
  "/example-images/hexagon_image.png",
  "/example-images/rounded_image.png",
];

const ExampleImages = () => {
  // Track loading for each image
  const [loaded, setLoaded] = useState(Array(images.length).fill(false));

  const handleLoad = (index) => {
    setLoaded((prev) => {
      const updated = [...prev];
      updated[index] = true;
      return updated;
    });
  };

  return (
    <section
      id="example-images"
      className="max-w-5xl mx-auto px-6 pb-20 animate-fadeInUp"
    >
      <h3 className="text-2xl font-semibold mb-6">Example AI Art</h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {images.map((src, i) => (
          <div
            key={i}
            data-aos="flip-down"
            className="bg-white/10 backdrop-blur-xl rounded-2xl p-3 border border-white/20 
            shadow-xl hover:scale-[1.03] transition-transform duration-300"
          >
            {/* Skeleton Loader */}
            {!loaded[i] && (
              <div
                role="status"
                className="animate-pulse w-full h-48 bg-neutral-quaternary rounded-xl flex items-center justify-center"
              >
                <svg
                  className="w-11 h-11 text-fg-disabled"
                  aria-hidden="true"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m3 16 5-7 6 6.5m6.5 2.5L16 13l-4.286 6M14 10h.01M4 19h16a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Z"
                  />
                </svg>
              </div>
            )}

            {/* Image */}
            <img
              src={src}
              alt="Example Art"
              className={`w-full rounded-xl object-contain transition-opacity duration-300 ${
                loaded[i] ? "opacity-100" : "opacity-0 absolute"
              }`}
              onLoad={() => handleLoad(i)}
              onError={() => handleLoad(i)}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default ExampleImages;
