import React, { useState } from "react";
import { Button, InputGroup, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
const { GoogleGenerativeAI } = require("@google/generative-ai");

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env.REACT_APP_API_KEY);

function App() {
  const [aiResponse, setResponse] = useState("");
  const [search, setSearch] = useState("");

  async function aiRun() {
    // The Gemini 1.5 models are versatile and work with both text-only and multimodal prompts
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `The Korean name is ${search}.
                    Please recommend an English name that fits the Korean name.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    console.log(text);
    setResponse(text);
  }

  const handleClick = () => {
    aiRun();
  };

  const handleChangeSearch = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div className="App">
      hello, world!
      <InputGroup className="mb-3">
        <Form.Control
          placeholder="Username"
          aria-label="Username"
          aria-describedby="basic-addon1"
          onChange={(e) => handleChangeSearch(e)}
        />
        <Button variant="link" onClick={() => handleClick()}>
          Link
        </Button>
      </InputGroup>
      {aiResponse}
    </div>
  );
}

export default App;
