import React, { useState, useCallback, useEffect } from 'react';

function App() {
  const [randomStr, setRandomStr] = useState('');
  const [length, setLength] = useState(10);
  const [includeSpecial, setIncludeSpecial] = useState(false);
  const [copied, setCopied] = useState(false);

  const generateRandomString = useCallback(() => {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const specials = '!@#$%^&*()_+-=[]{}|;:,.<>?';
    const chars = includeSpecial ? letters + specials : letters;

    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setRandomStr(result);
  }, [length, includeSpecial]);

  useEffect(() => {
    console.log('Generated String:', randomStr);
  }, [randomStr]);

  const handleCopy = () => {
    navigator.clipboard.writeText(randomStr).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleDownload = () => {
    const element = document.createElement('a');
    const file = new Blob([randomStr], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = 'random-string.txt';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-500 to-indigo-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md text-center">
        <h1 className="text-2xl font-bold mb-4 text-gray-800">🎲 Random String Generator</h1>

        <input
          type="number"
          min="1"
          max="50"
          value={length}
          onChange={(e) => setLength(Number(e.target.value))}
          className="w-full px-4 py-2 border rounded-lg mb-4 text-center focus:outline-none focus:ring-2 focus:ring-purple-500"
          placeholder="Enter string length"
        />

        <label className="flex items-center justify-center gap-2 mb-4 text-sm text-gray-700">
          <input
            type="checkbox"
            checked={includeSpecial}
            onChange={(e) => setIncludeSpecial(e.target.checked)}
            className="accent-purple-600"
          />
          Include special characters (!@#$...)
        </label>

        <button
          onClick={generateRandomString}
          className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition duration-300 w-full mb-4"
        >
          Generate String
        </button>

        {randomStr && (
          <div className="mt-4">
            <p className="text-gray-600 font-medium mb-2">Your String:</p>
            <div className="p-4 bg-gray-100 rounded-lg break-words text-purple-700 font-mono text-lg mb-4">
              {randomStr}
            </div>

            <div className="flex justify-center gap-4">
              <button
                onClick={handleCopy}
                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
              >
                {copied ? "Copied!" : "Copy 📋"}
              </button>

              <button
                onClick={handleDownload}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
              >
                Download .txt ⬇️
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
