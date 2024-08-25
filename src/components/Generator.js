import React, { useState } from "react";
import axios from "axios";

const API_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiODlkZjJhMzgtYzM5NS00MTJmLWI3ZTktMDk1YmQyN2E3MTlhIiwidHlwZSI6ImFwaV90b2tlbiJ9.yAVFe-0fZpT62OtX-Lxlr-q4QUAHhC_Z2vE7N4uKLwg";
const API_URL = "https://api.edenai.run/v2/image/generation";

function ImageGenerator() {
  const [text, setText] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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

      console.log("Response:", response.data);

      const providerData = response?.data?.["openai/dall-e-3"];
      const imageUrl = providerData?.items?.[0]?.image_resource_url;

      if (imageUrl) {
        setImageUrl(imageUrl);
      } else {
        throw new Error("Image URL not found in response");
      }
    } catch (error) {
      setError("Error generating image. Please try again.");
      console.error("Error generating image:", error);
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
  };

  return (
    <>
      <div className="">
        <div className="max-w-6xl  mx-auto p-6 bg-[#3883d2] rounded-lg shadow-lg">
          <h1 className="text-4xl font-bold text-center text-black mb-4">
            Text to Image Generator
          </h1>

          <form className="relative items-center">
            <input
              className="w-full rounded-full py-5 px-7 text-xl border-none transition-shadow duration-200 shadow-inner shadow-black focus:shadow-[0_0_10px_1000px_rgba(0,0,0,0.5)] outline-none mb-4"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter your text here..."
            />
            <button
              className={`w-12 h-12 rounded-full text-lg text-white transition-all duration-200 shadow-md shadow-black ${
                loading
                  ? "bg-gray-500 cursor-not-allowed"
                  : "bg-[#2f74c0] hover:bg-[#388ae2] active:scale-75 active:shadow-sm"
              } absolute right-0 m-3`}
              onClick={handleGenerateImage}
              disabled={loading}
            >
              {loading ? "On It..." : "Go"}
            </button>
          </form>

          {error && <p className="text-red-500 text-center mt-2">{error}</p>}
          {imageUrl && (
            <div className="mt-4 text-center">
              <img
                className="w-full h-auto rounded-lg shadow-md"
                src={imageUrl}
                alt="Generated"
              />
              <button
                className="mt-2 px-4 py-2 bg-green-500 text-white rounded"
                onClick={handleDownload}
              >
                Download
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default ImageGenerator;
