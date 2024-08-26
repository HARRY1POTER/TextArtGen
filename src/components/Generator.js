import React, { useState } from "react";
import axios from "axios";
import ConfettiExplosion from "react-confetti-explosion";
import defaultImage from "../medium.png";

const API_KEY = process.env.REACT_APP_API_KEY;
const API_URL = process.env.REACT_APP_API_URL;

function ImageGenerator() {
  const [text, setText] = useState("");
  const [imageUrl, setImageUrl] = useState(defaultImage);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showConfetti, setShowConfetti] = useState(false);

  const handleGenerateImage = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await axios.post(
        API_URL,
        {
          providers: "openai/dall-e-3",
          text: text,
          resolution: "1024x1024",
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${API_KEY}`,
          },
        }
      );

      const providerData = response?.data?.["openai/dall-e-3"];
      const imageUrl = providerData?.items?.[0]?.image_resource_url;

      if (imageUrl) {
        setImageUrl(imageUrl);
      } else {
        throw new Error("Image URL not found in response");
      }
    } catch (error) {
      setError("Error generating image. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = imageUrl;
    link.download = "generated_image.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center  p-6">
      <div className="max-w-md w-full bg-gradient-to-r from-[#58a9c0] to-[#a8b6f1] rounded-lg shadow-xl p-6 md:p-8 lg:p-10   xl:max-w-3xl xl:px-12 xl:py-8 ">
        <h1 className="text-2xl md:text-3xl font-bold text-center text-black mb-6">
          Text to Image Generator
        </h1>

        <form className="relative mb-6">
          <input
            className="w-full rounded-lg py-3 px-5 text-base md:text-lg border border-[#ddd] focus:border-[#388ae2] transition-shadow duration-200 shadow-md focus:shadow-lg outline-none mb-2 md:mb-4 placeholder:text-gray-500"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter your text here..."
            maxLength={200}
          />
          <p className="text-gray-800 text-sm text-right mb-2">
            {text.length}/200
          </p>
          <button
            className={`w-full py-3 rounded-lg text-base md:text-lg text-white transition-all duration-200 ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-[#1772d4] hover:bg-[#2f74c0] active:scale-95"
            } shadow-md`}
            onClick={(e) => {
              e.preventDefault();
              handleGenerateImage();
            }}
            disabled={loading}
          >
            {loading ? "Generating..." : "Generate"}
          </button>
        </form>

        {error && (
          <p className="text-red-500  md:text-xl font-bold text-center mb-4">
            {error}
          </p>
        )}
        {imageUrl && (
          <div className="text-center relative">
            <img
              className="w-full h-auto rounded-lg shadow-md mb-4 transition-transform transform hover:scale-105 cursor-pointer"
              src={imageUrl}
              alt="Generated"
            />
            {imageUrl !== defaultImage && (
              <button
                className="px-6 py-3 text-base md:text-lg bg-green-700 text-white rounded-lg shadow-md hover:bg-green-800 transition-colors"
                onClick={handleDownload}
              >
                Download
              </button>
            )}
            {showConfetti && (
              <ConfettiExplosion
                force={0.8}
                duration={3000}
                particleCount={100}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default ImageGenerator;
