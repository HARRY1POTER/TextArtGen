// import React, { useState } from "react";
// import axios from "axios";
// import ConfettiExplosion from "react-confetti-explosion";
// import defaultImage from "../medium.png";

// function ImageGenerator() {
//   const [text, setText] = useState("");
//   const [imageUrl, setImageUrl] = useState(defaultImage);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [showConfetti, setShowConfetti] = useState(false);
//   // console.log(imageUrl);

//   const API_KEY = process.env.REACT_APP_API_KEY;
//   const API_URL = process.env.REACT_APP_API_URL;

//   // const handleGenerateImage = async () => {
//   //   try {
//   //     setLoading(true);
//   //     setError("");

//   //     const response = await axios.post(
//   //       API_URL,
//   //       {
//   //         providers: "openai/dall-e-3",
//   //         text: text,
//   //         resolution: "1024x1024",
//   //       },
//   //       {
//   //         headers: {
//   //           "Content-Type": "application/json",
//   //           Authorization: `Bearer ${API_KEY}`,
//   //         },
//   //       }
//   //     );

//   //     const providerData = response?.data?.["openai/dall-e-3"];
//   //     const imageUrl = providerData?.items?.[0]?.image_resource_url;

//   //     if (imageUrl) {
//   //       setImageUrl(imageUrl);
//   //     } else {
//   //       throw new Error("Image URL not found in response");
//   //     }
//   //   } catch (error) {
//   //     setError("Error generating image. Please try again.");
//   //   } finally {
//   //     setLoading(false);
//   //   }
//   // };

//   // const handleGenerateImage = async () => {
//   //   try {
//   //     setLoading(true);
//   //     setError("");

//   //     const response = await axios.post(
//   //       API_URL,
//   //       {
//   //         input: {
//   //           text: text,
//   //           negative_prompt: "realistic",
//   //           image_size: { width: 1024, height: 1024 },
//   //           guidance_scale: 5,
//   //           num_images: 4,
//   //           seed: 1234,
//   //           output_format: "png",
//   //         },
//   //       },
//   //       {
//   //         headers: {
//   //           accept: "application/json",
//   //           Authorization: `Bearer ${API_KEY}`,
//   //           "Content-Type": "application/json",
//   //         },
//   //       }
//   //     );

//   //     const outputImages = response?.data?.output || [];
//   //     const imageUrl = outputImages.map((image) => image.url);

//   //     if (imageUrl.length > 0) {
//   //       setImageUrl(imageUrl);
//   //     } else {
//   //       throw new Error("Image URL not found in response");
//   //     }
//   //   } catch (error) {
//   //     setError("Error generating image. Please try again.");
//   //   } finally {
//   //     setLoading(false);
//   //   }
//   // };

//   const handleGenerateImage = async () => {
//     try {
//       setLoading(true);
//       setError("");

//       const form = new FormData();
//       form.append("prompt", text); // user prompt

//       const response = await axios.post(API_URL, form, {
//         headers: {
//           // "Access-Control-Allow-Origin": "*",
//           "x-api-key": API_KEY,
//           "Content-Type": "multipart/form-data",
//         },
//         responseType: "arraybuffer", // important: returns image buffer
//       });

//       // Convert buffer → Base64 image
//       const base64Image = btoa(
//         new Uint8Array(response.data).reduce(
//           (data, byte) => data + String.fromCharCode(byte),
//           ""
//         )
//       );

//       const imageUrl = `data:image/png;base64,${base64Image}`;

//       setImageUrl([imageUrl]); // since you used an array earlier
//     } catch (error) {
//       console.error(error);
//       setError("Error generating image. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDownload = () => {
//     const link = document.createElement("a");
//     link.href = imageUrl;
//     link.download = "generated_image.png";
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);

//     setShowConfetti(true);
//     setTimeout(() => setShowConfetti(false), 3000);
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center  p-6">
//       <div className="max-w-md w-full bg-gradient-to-r from-[#58a9c0] to-[#a8b6f1] rounded-lg shadow-xl p-6 md:p-8 lg:p-10   xl:max-w-3xl xl:px-12 xl:py-8 ">
//         <h1 className="text-2xl md:text-3xl font-bold text-center text-black mb-6">
//           Text to Image Generator
//         </h1>

//         <form className="relative mb-6">
//           <input
//             className="w-full rounded-lg py-3 px-5 text-base md:text-lg border border-[#ddd] focus:border-[#388ae2] transition-shadow duration-200 shadow-md focus:shadow-lg outline-none mb-2 md:mb-4 placeholder:text-gray-500"
//             value={text}
//             onChange={(e) => setText(e.target.value)}
//             placeholder="Enter your text here..."
//             maxLength={200}
//           />
//           <p className="text-gray-800 text-sm text-right mb-2">
//             {text.length}/200
//           </p>
//           <button
//             className={`w-full py-3 rounded-lg text-base md:text-lg text-white transition-all duration-200 ${
//               loading
//                 ? "bg-gray-400 cursor-not-allowed"
//                 : "bg-[#1772d4] hover:bg-[#2f74c0] active:scale-95"
//             } shadow-md`}
//             onClick={(e) => {
//               e.preventDefault();
//               handleGenerateImage();
//             }}
//             disabled={loading}
//           >
//             {loading ? "Generating..." : "Generate"}
//           </button>
//         </form>

//         {error && (
//           <p className="text-red-500  md:text-xl font-bold text-center mb-4">
//             {error}
//           </p>
//         )}
//         {imageUrl && (
//           <div className="text-center relative">
//             <img
//               className="w-full h-auto rounded-lg shadow-md mb-4 transition-transform transform hover:scale-105 cursor-pointer"
//               src={imageUrl}
//               alt="Generated"
//             />
//             {imageUrl !== defaultImage && (
//               <button
//                 className="px-6 py-3 text-base md:text-lg bg-green-700 text-white rounded-lg shadow-md hover:bg-green-800 transition-colors"
//                 onClick={handleDownload}
//               >
//                 Download
//               </button>
//             )}
//             {showConfetti && (
//               <ConfettiExplosion
//                 force={0.8}
//                 duration={3000}
//                 particleCount={100}
//               />
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default ImageGenerator;

// demo

// import React, { useState } from "react";
// import axios from "axios";
// import ConfettiExplosion from "react-confetti-explosion";
// import defaultImage from "../medium.png";

// function ImageGenerator() {
//   const [text, setText] = useState("");
//   const [imageUrl, setImageUrl] = useState(defaultImage);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [showConfetti, setShowConfetti] = useState(false);
//   const [shape, setShape] = useState("rounded");

//   const API_KEY = process.env.REACT_APP_API_KEY;
//   const API_URL = process.env.REACT_APP_API_URL;

//   const SHAPES = {
//     rounded: "rounded-[20px]",
//     circle: "rounded-full",
//     hexagon: "clip-hex",
//     blob: "clip-blob",
//     star: "clip-star",
//   };

//   const handleGenerateImage = async () => {
//     try {
//       setLoading(true);
//       setError("");

//       const form = new FormData();
//       form.append("prompt", text);

//       const response = await axios.post(API_URL, form, {
//         headers: {
//           "x-api-key": API_KEY,
//           "Content-Type": "multipart/form-data",
//         },
//         responseType: "arraybuffer",
//       });

//       const base64Image = btoa(
//         new Uint8Array(response.data).reduce(
//           (data, byte) => data + String.fromCharCode(byte),
//           ""
//         )
//       );
//       const finalUrl = `data:image/png;base64,${base64Image}`;
//       setImageUrl(finalUrl);
//     } catch (error) {
//       setError("Error generating image. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const downloadShapedImage = async () => {
//     const img = document.getElementById("styled-image");
//     const canvas = document.createElement("canvas");
//     const ctx = canvas.getContext("2d");

//     const size = 1024;
//     canvas.width = size;
//     canvas.height = size;

//     ctx.save();

//     // dynamic mask for shapes
//     if (shape === "circle") {
//       ctx.beginPath();
//       ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
//       ctx.clip();
//     }

//     if (shape === "rounded") {
//       const r = 200;
//       ctx.roundRect(0, 0, size, size, r);
//       ctx.clip();
//     }

//     if (shape === "hexagon") {
//       const h = size;
//       const w = size;
//       ctx.beginPath();
//       ctx.moveTo(w * 0.25, 0);
//       ctx.lineTo(w * 0.75, 0);
//       ctx.lineTo(w, h * 0.5);
//       ctx.lineTo(w * 0.75, h);
//       ctx.lineTo(w * 0.25, h);
//       ctx.lineTo(0, h * 0.5);
//       ctx.closePath();
//       ctx.clip();
//     }

//     const imageObject = new Image();
//     imageObject.src = imageUrl;

//     imageObject.onload = () => {
//       ctx.drawImage(imageObject, 0, 0, size, size);

//       const link = document.createElement("a");
//       link.download = `generated_${shape}.png`;
//       link.href = canvas.toDataURL("image/png");
//       link.click();

//       setShowConfetti(true);
//       setTimeout(() => setShowConfetti(false), 2500);
//     };
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-tr from-[#5daaff] to-[#8bb4f8]">
//       <div className="max-w-2xl w-full bg-white/20 backdrop-blur-md rounded-3xl shadow-xl p-8 border border-white/40">
//         <h1 className="text-3xl font-bold text-center text-white mb-6 drop-shadow-lg">
//           Text-to-Image Generator
//         </h1>

//         <input
//           className="w-full rounded-xl py-3 px-4 mb-3 bg-white/70 text-black focus:ring-2 ring-white shadow-md"
//           placeholder="Describe your image..."
//           value={text}
//           onChange={(e) => setText(e.target.value)}
//           maxLength={200}
//         />
//         <p className="text-white text-sm mb-4">{text.length}/200</p>

//         <button
//           onClick={handleGenerateImage}
//           disabled={loading}
//           className={`w-full py-3 rounded-xl text-white font-semibold transition shadow-md ${
//             loading
//               ? "bg-gray-400 cursor-not-allowed"
//               : "bg-blue-700 hover:bg-blue-800 active:scale-95"
//           }`}
//         >
//           {loading ? "Generating..." : "Generate Image"}
//         </button>

//         {error && <p className="text-red-700 mt-4 text-center">{error}</p>}

//         {imageUrl && (
//           <div className="mt-8 text-center">
//             {/* shape selector */}
//             <div className="flex justify-center gap-4 mb-5">
//               {Object.keys(SHAPES).map((key) => (
//                 <button
//                   key={key}
//                   className={`px-3 py-1 rounded-full border shadow text-sm ${
//                     shape === key ? "bg-blue-600 text-white" : "bg-white/70"
//                   }`}
//                   onClick={() => setShape(key)}
//                 >
//                   {key[0].toUpperCase() + key.slice(1)}
//                 </button>
//               ))}
//             </div>

//             {/* Image container */}
//             <div className="flex justify-center">
//               <img
//                 id="styled-image"
//                 src={imageUrl}
//                 alt="Generated"
//                 className={`w-80 h-80 object-cover shadow-xl transition-all ${SHAPES[shape]}`}
//               />
//             </div>

//             {imageUrl !== defaultImage && (
//               <button
//                 className="mt-6 px-6 py-3 rounded-xl bg-green-700 text-white hover:bg-green-800 shadow-md"
//                 onClick={downloadShapedImage}
//               >
//                 Download Image
//               </button>
//             )}

//             {showConfetti && <ConfettiExplosion />}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default ImageGenerator;

import React, { useState } from "react";
import axios from "axios";
import ConfettiExplosion from "react-confetti-explosion";
import defaultImage from "../medium.png";
import { drawMask } from "../utils/shapeMask";

function ImageGenerator() {
  const [text, setText] = useState("");
  const [imageUrl, setImageUrl] = useState(defaultImage);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showConfetti, setShowConfetti] = useState(false);
  const [shape, setShape] = useState("square");

  const API_KEY = process.env.REACT_APP_API_KEY;
  const API_URL = process.env.REACT_APP_API_URL;

  const SHAPES = {
    // rectangle: "clip-rectangle",
    square: "clip-square",
    rounded: "clip-rounded",
    circle: "clip-circle",
    oval: "clip-oval",
    hexagon: "clip-hexagon",
    diamond: "clip-diamond",
    triangle: "clip-triangle",
    star: "clip-star",
    // blob1: "clip-blob1",
    // blob2: "clip-blob2",
    pentagon: "clip-pentagon",
    trapezoid: "clip-trapezoid",
  };

  const handleGenerateImage = async () => {
    try {
      setLoading(true);
      setError("");

      const form = new FormData();
      form.append("prompt", text);

      const response = await axios.post(API_URL, form, {
        headers: {
          "x-api-key": API_KEY,
          "Content-Type": "multipart/form-data",
        },
        responseType: "arraybuffer",
      });

      const base64 = btoa(
        new Uint8Array(response.data).reduce(
          (data, byte) => data + String.fromCharCode(byte),
          ""
        )
      );

      setImageUrl(`data:image/png;base64,${base64}`);
    } catch (err) {
      setError("Could not generate image.");
    } finally {
      setLoading(false);
    }
  };

  const downloadShapedImage = () => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    canvas.width = 1024;
    canvas.height = 1024;

    const img = new Image();
    img.src = imageUrl;

    img.onload = () => {
      // 1️⃣ Start drawing mask
      ctx.save();
      ctx.beginPath();

      drawMask(ctx, shape); // <-- FIX: mask drawn AFTER image loads

      ctx.closePath();
      ctx.clip();

      // 2️⃣ Draw image INSIDE mask
      ctx.drawImage(img, 0, 0, 1024, 1024);

      ctx.restore();

      // 3️⃣ Download
      const link = document.createElement("a");
      link.download = `${shape}_image.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    };
    setTimeout(() => setShowConfetti(false), 3000);
    setShowConfetti(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-10 bg-gradient-to-br from-[#122642] to-[#7b8ac5] ">
      <div className="w-full max- w-5xl bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl p-10 border border-white/20 grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* LEFT SIDE - Preview */}
        <div className="flex flex-col items-center">
          <h2 className="text-white text-xl font-semibold mb-4">Preview</h2>

          <div className=" flex items-center justify-center bg-white/20 rounded-2xl shadow-xl p-4">
            <img
              id="final-image"
              src={imageUrl}
              className={`w-f null h-f ull 2xl:w-[1000px] object-cover transition-all duration-300 ${SHAPES[shape]}`}
              alt="Generated"
            />
          </div>
          {imageUrl !== defaultImage && (
            <button
              onClick={downloadShapedImage}
              className="mx-auto mt-6 px-6 py-3 rounded-xl bg-green-600 hover:bg-green-700 text-white font-semibold shadow-lg block xl:hidden "
            >
              Download Image
            </button>
          )}
          {showConfetti && <ConfettiExplosion />}
        </div>

        {/* RIGHT SIDE - Controls */}
        <div>
          <h2 className="text-white text-xl font-semibold mb-4">
            Generate Image
          </h2>

          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            maxLength={200}
            className="w-full h-32 rounded-xl p-4 text-black bg-white/80 shadow-lg focus:ring-2 ring-blue-300 outline-none"
            placeholder="Describe your image..."
          />

          <p className="text-white text-sm text-right mb-3">
            {text.length}/200
          </p>

          <button
            onClick={handleGenerateImage}
            disabled={loading}
            className={`w-full py-3 rounded-xl text-white font-semibold shadow-lg transition ${
              loading
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "Generating..." : "Generate Image"}
          </button>

          <h3 className="text-white text-lg mt-8 mb-3 font-medium">
            Choose Shape
          </h3>

          {/* SHAPES GRID */}
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 ">
            {Object.keys(SHAPES).map((s) => (
              <button
                key={s}
                onClick={() => setShape(s)}
                className={`p-2 rounded-xl text-sm capitalize shadow-md ${
                  shape === s
                    ? "bg-blue-600 text-white"
                    : "bg-white/80 text-black hover:bg-white "
                }`}
              >
                {s}
              </button>
            ))}
          </div>
          {imageUrl !== defaultImage && (
            <button
              onClick={downloadShapedImage}
              className="mx-auto mt-6 px-6 py-3 rounded-xl bg-green-600 hover:bg-green-700 text-white font-semibold shadow-lg xl:block hidden"
            >
              Download Image
            </button>
          )}
          {showConfetti && <ConfettiExplosion />}
        </div>
      </div>
    </div>
  );
}

export default ImageGenerator;
