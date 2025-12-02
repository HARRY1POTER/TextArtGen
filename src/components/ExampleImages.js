import React from "react";

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
  return (
    <section
      id="example-images"
      className="max-w-5xl mx-auto px-6 pb-20 animate-fadeInUp"
    >
      <h3 className="text-2xl font-semibold mb-6">Example AI Art</h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {images.map((img, i) => (
          <div
            key={i}
            data-aos="flip-down"
            className="bg-white/10 backdrop-blur-xl rounded-2xl p-3 border border-white/20 shadow-xl hover:scale-[1.03] transition-transform duration-300 "
          >
            <img
              src={img}
              alt="Example Art"
              className="w-full rounded-xl object-contain "
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default ExampleImages;
