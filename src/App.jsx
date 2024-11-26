import React, { useState } from "react";
import { FaSpotify } from "react-icons/fa6";
import axios from "axios";

function App() {
  const [URL, setURL] = useState("");

  const handleURL = (e) => {
    e.preventDefault();
    setURL(e.target.value);
  };

  const downloadSong = async (e) => {
    e.preventDefault();

    const options = {
      method: "GET",
      url: "https://spotify-downloader9.p.rapidapi.com/downloadSong",
      params: { songId: `${URL}` },
      headers: {
        "x-rapidapi-key": import.meta.env.VITE_API_KEY,
        "x-rapidapi-host": "spotify-downloader9.p.rapidapi.com",
        "Content-Type": "application/json",
      },
    };

    try {
      const rspn = await axios.request(options);
      console.log(rspn.data);
      window.location.href = `${rspn.data.data.downloadLink}`;
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-700 via-indigo-500 to-purple-700 px-4 text-white">
      {/* Header */}
      <div className="flex items-center gap-x-3 text-3xl font-extrabold mb-6">
        <FaSpotify size={40} className="text-green-400 animate-bounce" />
        <h1>Spotify Song Downloader</h1>
      </div>

      {/* Form Section */}
      <div className="bg-white text-gray-800 shadow-lg rounded-lg p-6 w-full max-w-md space-y-5">
        <p className="text-lg font-semibold text-center">
          Enter the Spotify Song URL to Download
        </p>
        <input
          type="url"
          placeholder="https://open.spotify.com/track/..."
          className="w-full h-12 px-4 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          onChange={handleURL}
          value={URL}
        />
        <button
          onClick={downloadSong}
          className="w-full bg-gradient-to-r from-green-400 to-green-600 text-white font-bold py-3 rounded-lg hover:from-green-500 hover:to-green-700 transition-all duration-200 shadow-md transform hover:-translate-y-1"
        >
          Download Song
        </button>
      </div>

      {/* Footer Section */}
      <footer className="mt-8 text-sm text-center">
        <p>
          Built with <span className="text-pink-500">❤</span> Kabish Yadav
        </p>
      </footer>
    </div>
  );
}

export default App;
