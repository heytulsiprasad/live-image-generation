import { useState } from "react";
import { Configuration, OpenAIApi } from "openai";

import "./App.css";

const configuration = new Configuration({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

function App() {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(`Generating image for prompt: ${prompt}`);
    generateImage(prompt);
  };

  const generateImage = async (prompt) => {
    const res = await openai.createImage({
      prompt: prompt,
      n: 1, // no of images to return
      size: "512x512",
    });

    setResult(res.data.data[0].url);
  };

  return (
    <div className="App">
      <h1>OPEN AI - DALL-E Image generation</h1>
      {result.length > 0 ? <img src={result} alt="Generated Image" /> : <></>}
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column" }}
      >
        <label style={{ marginBottom: "2rem" }}>
          <h2>Enter your prompt 👇</h2>
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            style={{
              height: "5rem",
              borderRadius: 10,
              border: "none",
              width: "20rem",
            }}
          />
        </label>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <button type="submit">Generate Image</button>
          <button
            type="button"
            onClick={() => {
              setPrompt("");
              setResult("");
            }}
          >
            Clear
          </button>
        </div>
      </form>
    </div>
  );
}

export default App;
