import React, { useState } from "react";
import { Button, InputGroup, Form, Accordion } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
const { GoogleGenerativeAI } = require("@google/generative-ai");

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env.REACT_APP_API_KEY);

function App() {
  const [aiResponse, setResponse] = useState([]);
  const [search, setSearch] = useState("");
  const [gender, setGender] = useState("");
  const [opened, setOpened] = useState(false);

  async function aiRun() {
    // Using `responseMimeType` requires one of the Gemini 1.5 Pro or 1.5 Flash models
    let model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      // Set the system instruction during model initialization
      systemInstruction:
        "Please recommend an English name that suits the Korean name, gender, and age as much as possible. When you tell me the reason why you recommend the English name, please translate it into Korean and let me know. Please avoid recommending overlapping English names.",
      // Set the `responseMimeType` to output JSON
      generationConfig: { responseMimeType: "application/json" },
    });

    let prompt = `
    The Korean name is ${search}. 
    The gender is male. 
    Please recommend 10 English names that are as similar to the pronunciation of Korean names as possible.
    Please think about why you recommend that English name in as much detail as possible and let me know by translating it into Korean.
    Also tell me the meaning of the English name in korean and the personality of the name in Korean using this JSON schema:
    { "type": "object",
      "properties": {
        "name": { "type": "string" },
        "reason": { "type": "string" },
        "meaning": { "type": "string" },
        "personality": { "type": "string" },
      }
    }`;

    let result = await model.generateContent(prompt);
    // 응답을 텍스트로 변환 후 JSON으로 파싱
    let textResponse = await result.response.text();
    try {
      // JSON 문자열을 배열로 변환
      let jsonResponse;
      // 응답이 배열인지 확인
      if (
        textResponse.trim().startsWith("[") &&
        textResponse.trim().endsWith("]")
      ) {
        jsonResponse = JSON.parse(textResponse);
      } else {
        jsonResponse = JSON.parse(`[${textResponse}]`);
      }
      console.log(jsonResponse);
      setResponse(jsonResponse);
    } catch (error) {
      console.error("JSON parsing error: ", error);
    }
  }

  const handleClick = () => {
    aiRun();
    setOpened(true);
  };

  const handleChangeSearch = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div className="App">
      hello, world!
      <Form>
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
      </Form>
      {console.log(opened)}
      {opened && (
        <Accordion>
          {aiResponse.map((item, i) => (
            <Accordion.Item eventKey={i}>
              <Accordion.Header>{item.name}</Accordion.Header>
              <Accordion.Body>
                <p>{item.reason}</p>
                <p>뜻: {item.meaning}</p>
                <p>성격: {item.personality}</p>
              </Accordion.Body>
            </Accordion.Item>
          ))}
        </Accordion>
      )}
    </div>
  );
}

export default App;
