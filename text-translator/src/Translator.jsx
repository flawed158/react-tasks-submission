import React, { useState } from "react";
import axios from "axios";

const Translator = () => {
  const [inputText, setInputText] = useState("");
  const [targetLang, setTargetLang] = useState("hi"); // Default: Hindi
  const [translatedText, setTranslatedText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleTranslate = async () => {
    if (!inputText.trim()) return alert("Please enter some text.");

    setLoading(true);
    try {
      const response = await axios.post(
        'https://deep-translate1.p.rapidapi.com/language/translate/v2',
        {
          q: inputText,
          source: 'en',
          target: targetLang
        },
        {
          headers: {
            'content-type': 'application/json',
            'X-RapidAPI-Key': 'b911a7577bmsh01e5a32dde077e4p18f7cajsncce664f4fcdb',
            'X-RapidAPI-Host': 'deep-translate1.p.rapidapi.com'
          }
        }
      );

      setTranslatedText(response.data.data.translations.translatedText);
    } catch (error) {
      console.error("Translation error:", error.response?.data || error.message);
      alert("Translation failed. Check your API key or input.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-8">
      <h1 className="text-3xl font-bold mb-6 text-blue-700">🌐 Text Translator</h1>

      <textarea
        className="w-full max-w-xl h-32 p-4 rounded-lg border border-gray-300 mb-4 focus:outline-blue-500"
        placeholder="Enter English text..."
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
      />

      <div className="flex items-center gap-4 mb-4">
        <select
          className="p-2 rounded border"
          value={targetLang}
          onChange={(e) => setTargetLang(e.target.value)}
        >
          <option value="hi">Hindi</option>
          <option value="es">Spanish</option>
          <option value="fr">French</option>
          <option value="de">German</option>
          <option value="bn">Bengali</option>
          <option value="gu">Gujarati</option>
          <option value="ta">Tamil</option>
          <option value="te">Telugu</option>
        </select>

        <button
          onClick={handleTranslate}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
          disabled={loading}
        >
          {loading ? "Translating..." : "Translate"}
        </button>
      </div>

      {translatedText && (
        <div className="mt-6 w-full max-w-xl p-4 bg-white shadow rounded">
          <h2 className="text-lg font-semibold mb-2 text-gray-700">Translated Text:</h2>
          <p className="text-gray-900">{translatedText}</p>
        </div>
      )}
    </div>
  );
};

export default Translator;
