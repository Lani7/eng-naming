import React, { useState } from "react";
// import { Button, InputGroup, Form } from "react-bootstrap";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Title from "./components/Title";
import EngNameList from "./components/EngNameList";
import InputForm from "./components/InputForm";

function App() {
  const [opened, setOpened] = useState(false);

  return (
    <div className="App">
      <Title />
      <InputForm setOpened={setOpened} />
      {opened ? <EngNameList /> : null}
    </div>
  );
}

export default App;
